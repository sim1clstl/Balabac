<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    public function run(): void
    {
        Package::updateOrCreate(['name' => 'Standard Escape'], [
            'description' => '90-minute experience, basic inclusions.',
            'duration_minutes' => 90,
            'price' => 1500, // price per person
            'is_active' => true,
        ]);

        Package::updateOrCreate(['name' => 'Premium Adventure'], [
            'description' => '120-minute premium experience with add-ons.',
            'duration_minutes' => 120,
            'price' => 2500,
            'is_active' => true,
        ]);
    }
}
