<?php

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use App\Models\PromoCode;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class PartnerAuthController extends Controller
{
    public function create()
    {
        return Inertia::render('Partner/Register');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'         => ['required','string','max:255'],
            'email'        => ['required','email','max:255','unique:users,email'],
            'password'     => ['required','string','min:8','confirmed'],
            'partner_name' => ['required','string','max:255'],
            'partner_type' => ['required', Rule::in(['hotel','influencer'])],
            'promo_code'   => ['required','alpha_num','max:30','unique:promo_codes,code'],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email'=> $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'partner',
        ]);

        $partner = Partner::create([
            'user_id' => $user->id,
            'name'    => $data['partner_name'],
            'type'    => $data['partner_type'],
            'commission_rate' => 10.00,
        ]);

        PromoCode::create([
            'code'        => strtoupper($data['promo_code']),
            'partner_id'  => $partner->id,
            'percent_off' => 10.00,
            'is_active'   => true,
        ]);

        return redirect()->route('partner.dashboard');
    }
}
