<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    protected $fillable = [
        'package_id',       // ✅ add this line
        'booking_date',
        'customer_name',
        'customer_email',
        'customer_phone',
        'num_people',
        'amount',
        'status',
        'payment_reference',
    ];

    protected $casts = [
        'booking_date' => 'date',
        'amount' => 'decimal:2',
    ];

    public function package(): BelongsTo {
        return $this->belongsTo(Package::class);
    }
}
