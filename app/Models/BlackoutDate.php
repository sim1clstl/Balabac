<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlackoutDate extends Model
{
    protected $fillable = ['date','reason'];
    protected $casts = ['date' => 'date'];
}
