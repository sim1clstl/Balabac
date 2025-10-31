<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        if (Schema::hasColumn('bookings', 'promo_code_id')) {
            Schema::table('bookings', function (Blueprint $table) {
                // guard: only add if not existing
                // (Laravel doesn't have hasForeignKey helper; if it errors, just comment next 3 lines)
                $table->foreign('promo_code_id')->references('id')->on('promo_codes')->nullOnDelete();
            });
        }
    }

    public function down(): void {
        Schema::table('bookings', function (Blueprint $table) {
            // If this errors during rollback, it's safe to ignore or comment out.
            $table->dropForeign(['promo_code_id']);
        });
    }
};
