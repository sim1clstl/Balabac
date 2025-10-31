<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        Review::factory()->createMany([
            ['name'=>'Samantha Cruz','place'=>'El Nido','rating'=>5,'content'=>'Absolutely stunning experience!','status'=>'approved'],
            ['name'=>'James Tan','place'=>'Coron','rating'=>4,'content'=>'Beautiful scenery!','status'=>'approved'],
            ['name'=>'Ella Montoya','place'=>'Balabac','rating'=>5,'content'=>'Paradise on earth!','status'=>'approved'],
        ]);
    }
}
