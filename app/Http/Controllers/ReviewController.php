<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ReviewController extends Controller
{
    // Public listing (ALL reviews page) – only approved are visible
    public function index(Request $request)
    {
        $place = $request->string('place')->toString();
        $rating = $request->integer('rating');
        $recent = $request->string('recent','desc')->toString();

        $reviews = Review::approved()
            ->when($place, fn($q) => $q->where('place', $place))
            ->when($rating, fn($q) => $q->where('rating', $rating))
            ->orderBy('created_at', $recent === 'asc' ? 'asc' : 'desc')
            ->get();

        return Inertia::render('Public/Reviews/AllReviews', [
            'reviews' => $reviews,
            'filters' => [
                'place' => $place ?: null,
                'rating' => $rating ?: null,
                'recent' => $recent,
            ],
        ]);
    }

    // Public write-review page
    public function create()
    {
        return Inertia::render('Public/Reviews/ReviewForm');
    }

    // Store new review (pending by default)
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'   => ['required','string','max:120'],
            'email'  => ['nullable','email','max:190'],
            'phone'  => ['nullable','string','max:60'],
            'place'  => ['required','string','in:El Nido,Coron,Balabac'],
            'rating' => ['required','integer','min:1','max:5'],
            'content'=> ['required','string','max:2000'],
            'photos.*' => ['nullable','image','mimes:jpg,jpeg,png,webp','max:4096'],
        ]);

        $paths = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $file) {
                $paths[] = $file->store('reviews', 'public'); // storage/app/public/reviews/*
            }
        }

        $review = Review::create([
            ...$data,
            'photos' => $paths,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Thanks! Your review was submitted and is awaiting approval.');
    }

    // Admin: moderation page
    public function adminIndex(Request $request)
    {
        // TODO: protect with auth/middleware as needed
        $status = $request->string('status','pending')->toString();
        $place  = $request->string('place')->toString();

        $reviews = Review::when($status, fn($q) => $q->where('status', $status))
            ->when($place, fn($q) => $q->where('place', $place))
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Reviews/ReviewModeration', [
            'reviews' => $reviews,
            'status' => $status,
            'place' => $place ?: null,
        ]);
    }

    public function approve(Review $review)
    {
        $review->update([
            'status' => 'approved',
            'approved_at' => now(),
        ]);

        return back()->with('success', 'Review approved.');
    }

    public function reject(Review $review)
    {
        $review->update(['status' => 'rejected']);
        return back()->with('success', 'Review rejected.');
    }

    // Optional: delete uploaded photo (admin)
    public function deletePhoto(Review $review, Request $request)
    {
        $path = $request->string('path')->toString();
        $photos = collect($review->photos ?? [])->filter(fn($p) => $p !== $path)->values()->all();
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
        $review->update(['photos' => $photos]);
        return back()->with('success', 'Photo removed.');
    }
}
