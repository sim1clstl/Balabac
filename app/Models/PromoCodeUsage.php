<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PromoCodeUsage extends Model
{
    protected $table = 'promo_code_usages';

    protected $fillable = [
        'promo_code_id',
        'booking_id',
        'discount_amount',
        'commission_amount',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function promoCode()
    {
        return $this->belongsTo(PromoCode::class);
    }
}
