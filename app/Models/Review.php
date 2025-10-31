<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'booking_id','name','email','phone','place','rating','content','photos','status','approved_at',
    ];

    protected $casts = [
        'photos' => 'array',
        'approved_at' => 'datetime',
    ];

    // Scope to only approved (public)
    public function scopeApproved($q) { return $q->where('status', 'approved'); }
}
