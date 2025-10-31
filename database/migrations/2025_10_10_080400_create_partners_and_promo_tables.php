<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        // users.role
        if (!Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('role')->default('customer')->after('email'); // admin | partner | customer
            });
        }

        // partners
        if (!Schema::hasTable('partners')) {
            Schema::create('partners', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
                $table->string('name');
                $table->string('type')->default('partner'); // hotel | influencer | partner
                $table->decimal('commission_rate', 5, 2)->default(10.00); // %
                $table->timestamps();
            });
        }

        // promo_codes
        if (!Schema::hasTable('promo_codes')) {
            Schema::create('promo_codes', function (Blueprint $table) {
                $table->id();
                $table->string('code')->unique();
                $table->foreignId('partner_id')->constrained('partners')->cascadeOnDelete();
                $table->decimal('percent_off', 5, 2)->default(10.00); // %
                $table->boolean('is_active')->default(true);
                $table->date('starts_at')->nullable();
                $table->date('ends_at')->nullable();
                $table->unsignedInteger('uses_count')->default(0);
                $table->timestamps();
            });
        }

        // promo_code_usages
        if (!Schema::hasTable('promo_code_usages')) {
            Schema::create('promo_code_usages', function (Blueprint $table) {
                $table->id();
                $table->foreignId('promo_code_id')->constrained('promo_codes')->cascadeOnDelete();
                $table->foreignId('booking_id')->constrained('bookings')->cascadeOnDelete();
                $table->decimal('discount_amount', 10, 2)->default(0);
                $table->decimal('commission_amount', 10, 2)->default(0);
                $table->timestamps();
            });
        }
    }

    public function down(): void {
        Schema::dropIfExists('promo_code_usages');
        Schema::dropIfExists('promo_codes');
        Schema::dropIfExists('partners');

        if (Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('role');
            });
        }
    }
};
