<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PromoCode;
use Carbon\Carbon;

class PromoCodeController extends Controller
{
    public function validateCode(Request $request)
    {
        $code = strtoupper(trim($request->query('code', '')));
        if ($code === '') {
            return response()->json(['valid' => false, 'message' => 'No code provided.']);
        }

        $now = Carbon::now();

        $promo = PromoCode::query()
            ->where('code', $code)
            ->where('is_active', true)
            ->where(function ($q) use ($now) {
                $q->whereNull('starts_at')->orWhere('starts_at', '<=', $now);
            })
            ->where(function ($q) use ($now) {
                $q->whereNull('ends_at')->orWhere('ends_at', '>=', $now);
            })
            ->first();

        if (!$promo) {
            return response()->json(['valid' => false, 'message' => 'Invalid or inactive code.']);
        }

        return response()->json([
            'valid'        => true,
            'percent_off'  => (float)$promo->percent_off,  // e.g., 10 (means 10%)
            'promo_code_id'=> $promo->id,
        ]);
    }
}
