<?php

namespace App\Http\Controllers;

use App\Models\AvailableDate;
use App\Models\Booking;
use App\Models\Package;
use App\Models\PromoCode;
use App\Models\PromoCodeUsage;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        // Active packages
        $packages = Package::query()
            ->where('is_active', true)
            ->orderByRaw('COALESCE(price_per_head, price) ASC')
            ->get();

        // Available dates (YYYY-MM-DD)
        $availableDates = AvailableDate::query()
            ->orderBy('date')
            ->get(['date'])
            ->pluck('date')
            ->map(fn ($d) => ($d instanceof \Carbon\Carbon ? $d->format('Y-m-d') : (string) $d));

        return Inertia::render('Booking/Index', [
            'packages'       => $packages,
            'availableDates' => $availableDates,
            'step'           => (int) $request->integer('step', 1),
            'bookingId'      => $request->query('booking_id'),
            'status'         => $request->query('status'),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'package_id'      => ['required', Rule::exists('packages', 'id')->where('is_active', true)],
            'booking_date'    => ['required', 'date', 'after_or_equal:today'],
            'customer_name'   => ['required', 'string', 'max:255'],
            'customer_email'  => ['required', 'email'],
            'customer_phone'  => ['nullable', 'string', 'max:50'],
            'pickup_address'  => ['nullable', 'string', 'max:500'],
            'num_people'      => ['required', 'integer', 'min:1', 'max:100'],
            // support BOTH id and raw code (frontend sends id; form/manual can send code)
            'promo_code_id'   => ['nullable', 'exists:promo_codes,id'],
            'promo_code'      => ['nullable', 'string', 'max:50'],
        ]);

        // Only allow available dates
        $date = Carbon::parse($data['booking_date'])->toDateString();
        if (!AvailableDate::where('date', $date)->exists()) {
            return back()->withErrors(['booking_date' => 'Selected date is not available.']);
        }

        $package   = Package::findOrFail($data['package_id']);
        $unitPrice = (float) ($package->price_per_head ?? $package->price ?? 0);
        $pax       = (int) $data['num_people'];
        $subtotal  = $unitPrice * $pax;

        // Find an applicable promo (prefer id; fallback to code)
        $promo = null;
        if (!empty($data['promo_code_id'])) {
            $promo = PromoCode::with('partner')->find($data['promo_code_id']);
        } elseif (!empty($data['promo_code'])) {
            $code = strtoupper(trim($data['promo_code']));
            $promo = PromoCode::with('partner')->whereRaw('UPPER(code) = ?', [$code])->first();
        }

        // Validate promo window + active
        $discount = 0.0;
        if ($promo) {
            $today = Carbon::today();
            $active =
                $promo->is_active &&
                (!$promo->starts_at || $promo->starts_at->lte($today)) &&
                (!$promo->ends_at   || $promo->ends_at->gte($today));

            if ($active) {
                // round to whole peso to match UI; change to 2 decimals if you prefer
                $discount = round($subtotal * ((float) $promo->percent_off / 100), 0);
            } else {
                $promo = null; // ignore invalid/inactive
            }
        }

        $total = max(0, $subtotal - $discount);

        // Create booking with discounted total
        $booking = Booking::create([
            'package_id'      => $data['package_id'],
            'booking_date'    => $data['booking_date'],
            'customer_name'   => $data['customer_name'],
            'customer_email'  => $data['customer_email'],
            'customer_phone'  => $data['customer_phone'] ?? null,
            'pickup_address'  => $data['pickup_address'] ?? null,
            'num_people'      => $pax,
            'status'          => 'pending',
            // breakdown
            'subtotal'        => $subtotal,
            'discount_amount' => $discount,
            'total_amount'    => $total,
            // keep an old 'amount' if your views still read it
            'amount'          => $total,
            'promo_code_id'   => $promo?->id,
        ]);

        // Log promo usage now (commission is filled on confirm)
        if ($promo && $discount > 0) {
            $promo->increment('uses_count');
            PromoCodeUsage::create([
                'promo_code_id'     => $promo->id,
                'booking_id'        => $booking->id,
                'discount_amount'   => $discount,
                'commission_amount' => 0,
            ]);
        }

        // Go to payment step
        return redirect()->route('booking.index', [
            'step'       => 3,
            'booking_id' => $booking->id,
        ]);
    }

    public function confirm(Request $request, Booking $booking)
{
    // ensure only pending bookings are updated
    if ($booking->status !== 'paid') {
        $booking->status = 'paid';
        $booking->payment_reference = 'MOCK-' . strtoupper(uniqid());
        $booking->save();
    }

    // ---- Commission logic ----
    if ($booking->promo_code_id) {
        $promo = \App\Models\PromoCode::with('partner')->find($booking->promo_code_id);

        if ($promo && $promo->partner) {
            $partnerRate = (float)$promo->partner->commission_rate; // %
            $base = (float)($booking->total_amount ?? $booking->amount ?? 0);
            $commission = round($base * ($partnerRate / 100), 2);

            // Ensure usage record exists
            $usage = \App\Models\PromoCodeUsage::firstOrCreate(
                [
                    'promo_code_id' => $promo->id,
                    'booking_id'    => $booking->id,
                ],
                [
                    'discount_amount' => $booking->discount_amount ?? 0,
                    'commission_amount' => 0,
                ]
            );

            // Update commission
            $usage->commission_amount = $commission;
            $usage->save();
        }
    }

    return redirect()->route('booking.index', [
        'step' => 3,
        'booking_id' => $booking->id,
        'status' => 'paid',
    ]);
}

}
