<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    protected $fillable = ['user_id','name','type','commission_rate'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function promoCodes()
    {
        return $this->hasMany(PromoCode::class);
    }
}
