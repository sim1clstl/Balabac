<?php

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\PromoCode;
use App\Models\PromoCodeUsage;

class PartnerDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user    = $request->user();
        $partner = $user?->partner;

        $promos = $partner
            ? PromoCode::where('partner_id', $partner->id)->get(['id','code','percent_off','uses_count'])
            : collect();

        $promoIds = $promos->pluck('id');

        // Pull usages with their bookings to compute commission live
        $usages = PromoCodeUsage::with('booking:id,total_amount,created_at')
            ->whereIn('promo_code_id', $promoIds)
            ->get(['id','promo_code_id','booking_id','discount_amount']);

        $stats = [
            'total_usages'      => $usages->count(),
            'total_discount'    => (float) $usages->sum('discount_amount'),
            'total_commission'  => $usages->sum(function ($u) use ($partner) {
                $rate = (float) ($partner->commission_rate ?? 0);
                $base = (float) ($u->booking->total_amount ?? 0);
                return round($base * ($rate / 100), 2);
            }),
        ];

        return Inertia::render('Partner/Dashboard/Index', [
            'partnerName' => $partner?->name ?? $user->name,
            'promos'      => $promos,
            'stats'       => $stats,
        ]);
    }
}
