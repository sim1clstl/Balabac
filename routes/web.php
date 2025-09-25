<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;

Route::get('/', [PageController::class, 'landing'])->name('landing');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/faqs', [PageController::class, 'faqs'])->name('faqs');
Route::get('/packages', [PageController::class, 'packages'])->name('packages');
Route::get('/schedule', [PageController::class, 'schedule'])->name('schedule');

// Contact form
Route::get('/contact', [PageController::class, 'contactForm'])->name('contact');
Route::post('/contact', [PageController::class, 'submitContact'])->name('contact.submit');

// Dashboard and auth placeholders
Route::get('/dashboard', [PageController::class, 'dashboard'])->name('dashboard');
Route::get('/login', [PageController::class, 'login'])->name('login');
Route::get('/signup', [PageController::class, 'signup'])->name('signup');
Route::post('/signup', [PageController::class, 'signupSubmit'])->name('signup.submit');
Route::post('/login', [PageController::class, 'loginSubmit'])->name('login.submit');
