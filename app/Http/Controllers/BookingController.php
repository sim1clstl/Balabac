<?php

namespace App\Http\Controllers;

use App\Models\BlackoutDate;
use App\Models\Booking;
use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $packages = Package::query()->where('is_active', true)->orderBy('price')->get(['id','name','description','duration_minutes','price']);
        $blackoutDates = BlackoutDate::query()->orderBy('date')->pluck('date')->map(fn($d) => $d->format('Y-m-d'));

        return Inertia::render('Booking/Index', [
            'packages' => $packages,
            'blackoutDates' => $blackoutDates,
            // allow pre-selecting step/booking via query
            'step' => (int) $request->integer('step', 1),
            'bookingId' => $request->query('booking_id'),
            'status' => $request->query('status'),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'package_id' => ['required', Rule::exists('packages','id')->where('is_active', true)],
            'booking_date' => ['required','date','after_or_equal:today'],
            'customer_name' => ['required','string','max:255'],
            'customer_email' => ['required','email'],
            'customer_phone' => ['nullable','string','max:50'],
            'num_people' => ['required','integer','min:1','max:100'],
        ]);

        // block blackout dates
        $date = Carbon::parse($data['booking_date'])->toDateString();
        if (BlackoutDate::query()->whereDate('date', $date)->exists()) {
            return back()->withErrors(['booking_date' => 'Selected date is unavailable. Please choose another date.']);
        }

        $package = Package::findOrFail($data['package_id']);

        // price per person (you can switch to flat price if needed)
        $amount = $package->price * $data['num_people'];

        $booking = Booking::create([
            ...$data,
            'amount' => $amount,
            'status' => 'pending',
        ]);

        // Redirect back to step 3 with the new booking id
        return redirect()->route('booking.index', ['step' => 3, 'booking_id' => $booking->id]);
    }

    public function confirm(Request $request, Booking $booking)
    {
        abort_unless($booking->status === 'pending', 403, 'Cannot confirm this booking.');

        // Mock payment success
        $booking->status = 'paid';
        $booking->payment_reference = 'MOCK-' . strtoupper(uniqid());
        $booking->save();

        return redirect()->route('booking.index', [
            'step' => 3,
            'booking_id' => $booking->id,
            'status' => 'paid',
        ]);
    }
}
