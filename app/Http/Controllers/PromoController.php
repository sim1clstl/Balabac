<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PromoCode;
use Illuminate\Support\Carbon;

class PromoController extends Controller
{
    public function validateCode(Request $request)
    {
        $code = strtoupper(trim($request->query('code', $request->input('code', ''))));
        if ($code === '') {
            return response()->json(['valid' => false, 'message' => 'No code provided.']);
        }

        $today = Carbon::today();
        $promo = PromoCode::query()
            ->whereRaw('UPPER(code) = ?', [$code])
            ->where('is_active', true)
            ->where(function ($q) use ($today) {
                $q->whereNull('starts_at')->orWhere('starts_at', '<=', $today);
            })
            ->where(function ($q) use ($today) {
                $q->whereNull('ends_at')->orWhere('ends_at', '>=', $today);
            })
            ->first();

        if (!$promo) {
            return response()->json(['valid' => false, 'message' => 'Invalid or inactive code.']);
        }

        return response()->json([
            'valid'         => true,
            'percent_off'   => (float) $promo->percent_off,
            'promo_code_id' => $promo->id,
        ]);
    }
}
