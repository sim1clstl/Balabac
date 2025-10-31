<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Partner;
use App\Models\PromoCodeUsage;
use Carbon\Carbon;
use Inertia\Inertia;

class PartnerReportController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->query('month'); // YYYY-MM
        $start = $month ? Carbon::parse($month.'-01')->startOfMonth() : Carbon::now()->startOfMonth();
        $end   = (clone $start)->endOfMonth();

        // Pull partners + promo codes
        $partners = Partner::with(['promoCodes:id,partner_id'])
            ->orderBy('name')
            ->get(['id','name','commission_rate']);

        $rows = $partners->map(function ($p) use ($start, $end) {
            $promoIds = $p->promoCodes->pluck('id');

            // Get usages in period + their bookings
            $usages = PromoCodeUsage::with('booking:id,total_amount,created_at')
                ->whereIn('promo_code_id', $promoIds)
                ->whereBetween('created_at', [$start, $end])
                ->get(['id','promo_code_id','booking_id','discount_amount','created_at']);

            $usageCount    = $usages->count();
            $totalDiscount = (float) $usages->sum('discount_amount');

            // 🔑 Compute commission live from booking total_amount × partner rate
            $rate = (float) $p->commission_rate;
            $totalCommission = $usages->sum(function ($u) use ($rate) {
                $base = (float) ($u->booking->total_amount ?? 0);
                return round($base * ($rate / 100), 2);
            });

            return [
                'id'               => $p->id,
                'name'             => $p->name,
                'commission_rate'  => $rate,
                'usage_count'      => $usageCount,
                'total_discount'   => $totalDiscount,
                'total_commission' => (float) $totalCommission,
            ];
        });

        return Inertia::render('Admin/Reports/Partners', [
            'period' => [$start->toDateString(), $end->toDateString()],
            'rows'   => $rows,
        ]);
    }
}
