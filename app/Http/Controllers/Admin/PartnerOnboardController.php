<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Partner;
use App\Models\PromoCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class PartnerOnboardController extends Controller
{
    public function create()
    {
        // Must match the Inertia page path below
        return Inertia::render('Admin/Partners/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            // user
            'name'            => ['required','string','max:255'],
            'email'           => ['required','email','max:255','unique:users,email'],
            'password'        => ['required', Password::min(8)],

            // partner
            'commission_rate' => ['required','numeric','min:0','max:100'],

            // promo
            'promo_code'      => ['required','string','max:32','unique:promo_codes,code'],
            'percent_off'     => ['required','numeric','min:1','max:100'],
            'is_active'       => ['boolean'],
            'starts_at'       => ['nullable','date'],
            'ends_at'         => ['nullable','date','after_or_equal:starts_at'],
        ]);

        $data['promo_code'] = strtoupper(trim($data['promo_code']));
        $data['is_active']  = (bool)($data['is_active'] ?? true);

        return DB::transaction(function () use ($data) {
            // Create user
            $user = User::create([
                'name'              => $data['name'],
                'email'             => $data['email'],
                'password'          => Hash::make($data['password']),
                'role'              => 'partner',
                'email_verified_at' => now(), // optional: auto-verify partners
            ]);

            // Create partner
            $partner = Partner::create([
                'user_id'         => $user->id,
                'name'            => $data['name'],
                'type'            => 'partner',
                'commission_rate' => (float)$data['commission_rate'],
            ]);

            // Create promo
            PromoCode::create([
                'code'        => $data['promo_code'],
                'partner_id'  => $partner->id,
                'percent_off' => (float)$data['percent_off'],
                'is_active'   => $data['is_active'],
                'starts_at'   => !empty($data['starts_at']) ? Carbon::parse($data['starts_at']) : null,
                'ends_at'     => !empty($data['ends_at'])   ? Carbon::parse($data['ends_at'])   : null,
                'uses_count'  => 0,
            ]);

            return redirect()->route('admin.reports.partners')
                ->with('success', 'Partner, user, and promo created.');
        });
    }
}
