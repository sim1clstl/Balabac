<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class PromoCode extends Model
{
    protected $fillable = [
        'code','partner_id','percent_off','is_active','starts_at','ends_at','uses_count'
    ];

    protected $casts = [
        'is_active'   => 'bool',
        'starts_at'   => 'date',
        'ends_at'     => 'date',
        'percent_off' => 'decimal:2',
        'uses_count'  => 'integer',
    ];

    public function partner()
    {
        return $this->belongsTo(Partner::class);
    }

    public function usages()
    {
        return $this->hasMany(PromoCodeUsage::class);
    }

    public function isCurrentlyActive(): bool
    {
        if (!$this->is_active) return false;
        $today = Carbon::today();
        if ($this->starts_at && $today->lt($this->starts_at)) return false;
        if ($this->ends_at && $today->gt($this->ends_at)) return false;
        return true;
    }
}
