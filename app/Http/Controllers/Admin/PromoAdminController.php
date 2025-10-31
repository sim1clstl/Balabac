<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PromoCode;
use App\Models\Partner;
use Inertia\Inertia;

class PromoAdminController extends Controller
{
    public function index()
    {
        $promos = PromoCode::with('partner:id,name')
            ->orderByDesc('id')
            ->get(['id','code','percent_off','is_active','starts_at','ends_at','partner_id','created_at']);

        $partners = Partner::orderBy('name')->get(['id','name']);

        return Inertia::render('Admin/Promos/Index', [
            'promos'   => $promos,
            'partners' => $partners,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'code'        => ['required','string','max:32'],
            'partner_id'  => ['required','exists:partners,id'],
            'percent_off' => ['required','numeric','min:1','max:100'],
            'is_active'   => ['boolean'],
            'starts_at'   => ['nullable','date'],
            'ends_at'     => ['nullable','date','after_or_equal:starts_at'],
        ]);

        $data['code'] = strtoupper($data['code']);
        $data['is_active'] = (bool)($data['is_active'] ?? true);

        PromoCode::create($data);

        return back()->with('success', 'Promo code created.');
    }

    public function update(Request $request, PromoCode $promo)
    {
        $data = $request->validate([
            'code'        => ['sometimes','string','max:32'],
            'partner_id'  => ['sometimes','exists:partners,id'],
            'percent_off' => ['sometimes','numeric','min:1','max:100'],
            'is_active'   => ['sometimes','boolean'],
            'starts_at'   => ['nullable','date'],
            'ends_at'     => ['nullable','date','after_or_equal:starts_at'],
        ]);

        if (isset($data['code'])) $data['code'] = strtoupper($data['code']);

        $promo->update($data);

        return back()->with('success', 'Promo updated.');
    }

    public function destroy(PromoCode $promo)
    {
        $promo->delete();
        return back()->with('success', 'Promo deleted.');
    }

    public function toggle(PromoCode $promo)
    {
        $promo->is_active = ! $promo->is_active;
        $promo->save();
        return back()->with('success', 'Promo status updated.');
    }
}
