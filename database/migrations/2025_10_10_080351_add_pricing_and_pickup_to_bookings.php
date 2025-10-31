<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // pickup_address
        if (!Schema::hasColumn('bookings', 'pickup_address')) {
            Schema::table('bookings', function (Blueprint $table) {
                $table->string('pickup_address')->nullable()->after('customer_phone');
            });
        }

        // subtotal
        if (!Schema::hasColumn('bookings', 'subtotal')) {
            Schema::table('bookings', function (Blueprint $table) {
                $table->decimal('subtotal', 10, 2)->default(0)->after('num_people');
            });
        }

        // discount_amount
        if (!Schema::hasColumn('bookings', 'discount_amount')) {
            Schema::table('bookings', function (Blueprint $table) {
                $table->decimal('discount_amount', 10, 2)->default(0)->after('subtotal');
            });
        }

        // total_amount
        if (!Schema::hasColumn('bookings', 'total_amount')) {
            Schema::table('bookings', function (Blueprint $table) {
                $table->decimal('total_amount', 10, 2)->default(0)->after('discount_amount');
            });
        }

        // promo_code_id (no FK yet)
        if (!Schema::hasColumn('bookings', 'promo_code_id')) {
            Schema::table('bookings', function (Blueprint $table) {
                $table->unsignedBigInteger('promo_code_id')->nullable()->after('total_amount');
            });
        }
    }

    public function down(): void
    {
        // Drop only if present (safe)
        if (Schema::hasColumn('bookings', 'promo_code_id')) {
            Schema::table('bookings', function (Blueprint $table) {
                $table->dropColumn('promo_code_id');
            });
        }

        if (Schema::hasColumn('bookings', 'total_amount')) {
            Schema::table('bookings', function (Blueprint $table) {
                $table->dropColumn('total_amount');
            });
        }

        if (Schema::hasColumn('bookings', 'discount_amount')) {
            Schema::table('bookings', function (Blueprint $table) {
                $table->dropColumn('discount_amount');
            });
        }

        if (Schema::hasColumn('bookings', 'subtotal')) {
            Schema::table('bookings', function (Blueprint $table) {
                $table->dropColumn('subtotal');
            });
        }

        if (Schema::hasColumn('bookings', 'pickup_address')) {
            Schema::table('bookings', function (Blueprint $table) {
                $table->dropColumn('pickup_address');
            });
        }
    }
};
