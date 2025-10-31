<?php

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PromoCode;
use App\Models\PromoCodeUsage;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $partner = $user->partner; // relation on User model (add below)

        if (!$partner) {
            abort(403, 'No partner profile.');
        }

        $month = $request->query('month'); // optional YYYY-MM
        $start = $month ? Carbon::parse($month.'-01')->startOfMonth() : Carbon::now()->startOfMonth();
        $end   = (clone $start)->endOfMonth();

        // their promo codes
        $promoIds = PromoCode::where('partner_id', $partner->id)->pluck('id');

        // usages this month
        $usages = PromoCodeUsage::with(['promoCode:id,code,partner_id','booking'])
            ->whereIn('promo_code_id', $promoIds)
            ->whereBetween('created_at', [$start, $end])
            ->orderByDesc('id')
            ->get(['id','promo_code_id','booking_id','discount_amount','commission_amount','created_at']);

        $stats = [
            'range'            => [$start->toDateString(), $end->toDateString()],
            'usage_count'      => $usages->count(),
            'total_discount'   => (float) $usages->sum('discount_amount'),
            'total_commission' => (float) $usages->sum('commission_amount'),
        ];

        return Inertia::render('Partner/Dashboard/Index', [
            'partner' => [
                'id'   => $partner->id,
                'name' => $partner->name,
            ],
            'stats' => $stats,
            'usages' => $usages,
        ]);
    }
}
