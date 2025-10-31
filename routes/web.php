<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\EmailSendController;
use App\Http\Controllers\ReviewController;

// Controllers
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\Admin\PackageController;
use App\Http\Controllers\Admin\AvailabilityController;
use App\Http\Controllers\Admin\BookingAdminController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PromoAdminController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\Partner\PartnerDashboardController;
use App\Http\Controllers\Admin\PartnerOnboardController;
use App\Http\Controllers\Admin\PartnerReportController;

/*
|--------------------------------------------------------------------------
| Web Routes (public access for demo)
|--------------------------------------------------------------------------
*/

// Public welcome page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

// Public pages
Route::get('/homepage', fn () => Inertia::render('Homepage'))->name('homepage');
Route::get('/bookingpage', fn () => Inertia::render('BookingPage'))->name('bookingpage');
Route::get('/gallery', fn () => Inertia::render('Gallery'))->name('gallery');

// Promo code validator
Route::get('/promo/validate', [PromoController::class, 'validateCode'])->name('promo.validate');
// TEMP: Recalculate commissions for existing promo usages
Route::get('/admin/tools/recalc-commissions', function () {
    $updated = 0;

    $usages = \App\Models\PromoCodeUsage::query()->get();
    foreach ($usages as $u) {
        $promo = \App\Models\PromoCode::with('partner')->find($u->promo_code_id);
        $booking = \App\Models\Booking::find($u->booking_id);
        if (!$promo || !$promo->partner || !$booking) continue;

        $rate = (float) $promo->partner->commission_rate;
        $base = (float) ($booking->total_amount ?? $booking->amount ?? 0);
        $newCommission = round($base * ($rate / 100), 2);

        if ((float)$u->commission_amount !== $newCommission) {
            $u->commission_amount = $newCommission;
            $u->save();
            $updated++;
        }
    }

    return "Recalculated commissions for {$updated} usage rows.";
});
// Dashboard (no auth)
Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

// Booking flow
Route::get('/booking',                    [BookingController::class, 'index'])->name('booking.index');
Route::post('/booking',                   [BookingController::class, 'store'])->name('booking.store');
Route::post('/booking/{booking}/confirm', [BookingController::class, 'confirm'])->name('booking.confirm');

// Admin (no auth)
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/',            [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/bookings',    [BookingAdminController::class, 'index'])->name('bookings.index');

    // Partner onboarding (user + partner + promo)
    Route::get('/partners/create', [PartnerOnboardController::class, 'create'])->name('partners.create');
    Route::post('/partners',       [PartnerOnboardController::class, 'store'])->name('partners.store');

    // Reports
    Route::get('/reports/partners', [PartnerReportController::class, 'index'])->name('reports.partners');

    // Packages
    Route::get('/packages',               [PackageController::class, 'index'])->name('packages.index');
    Route::post('/packages',              [PackageController::class, 'store'])->name('packages.store');
    Route::patch('/packages/{package}',   [PackageController::class, 'update'])->name('packages.update');
    Route::delete('/packages/{package}',  [PackageController::class, 'destroy'])->name('packages.destroy');
    Route::post('/packages/upload-image', [PackageController::class, 'uploadImage'])->name('packages.upload');

    // Availability
    Route::get('/availability',                   [AvailabilityController::class, 'index'])->name('availability.index');
    Route::post('/availability',                  [AvailabilityController::class, 'store'])->name('availability.store');
    Route::delete('/availability/{availability}', [AvailabilityController::class, 'destroy'])->name('availability.destroy');

    // Promo codes
    Route::get('/promos',                  [PromoAdminController::class, 'index'])->name('promos.index');
    Route::post('/promos',                 [PromoAdminController::class, 'store'])->name('promos.store');
    Route::patch('/promos/{promo}',        [PromoAdminController::class, 'update'])->name('promos.update');
    Route::delete('/promos/{promo}',       [PromoAdminController::class, 'destroy'])->name('promos.destroy');
    Route::patch('/promos/{promo}/toggle', [PromoAdminController::class, 'toggle'])->name('promos.toggle');
});
Route::get('/admin/demo-dashboard', fn () => Inertia::render('Admin/DashboardDemo'))
    ->name('admin.demo-dashboard');
// Partner (no auth)
Route::prefix('partner')->name('partner.')->group(function () {
    Route::get('/', [PartnerDashboardController::class, 'index'])->name('dashboard');
});

// Profile routes (still public for now)
Route::get('/profile',  [ProfileController::class, 'edit'])->name('profile.edit');
Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// routes/web.php
Route::get('/admin/calendar', fn () =>
    Inertia::render('Admin/BookingCalendarPage')
)->name('admin.calendar');
Route::get('/admin/partners/partnerdashboard', fn () =>
    Inertia::render('Admin/Partners/PartnerDashboard')
)->name('partner.dashboard');
Route::middleware(['auth']) // adjust to your guard/role gate
    
    ->prefix('admin/email')
    ->group(function () {
        Route::get('/create', [EmailSendController::class, 'create'])->name('admin.email.create');
        Route::post('/send',   [EmailSendController::class, 'send'])->name('admin.email.send');
    });


// Public
Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews.index');
Route::get('/reviews/new', [ReviewController::class, 'create'])->name('reviews.create');
Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');

// Admin (wrap with auth middleware as appropriate)
Route::middleware([])->group(function () {
    Route::get('/admin/reviews', [ReviewController::class, 'adminIndex'])->name('admin.reviews.index');
    Route::post('/admin/reviews/{review}/approve', [ReviewController::class, 'approve'])->name('admin.reviews.approve');
    Route::post('/admin/reviews/{review}/reject', [ReviewController::class, 'reject'])->name('admin.reviews.reject');
    Route::delete('/admin/reviews/{review}/photo', [ReviewController::class, 'deletePhoto'])->name('admin.reviews.photo.delete');
});

// Auth scaffolding
require __DIR__ . '/auth.php';
