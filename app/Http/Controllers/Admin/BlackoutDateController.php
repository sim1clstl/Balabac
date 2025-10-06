<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlackoutDate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlackoutDateController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Availability/Index', [
            'dates' => BlackoutDate::orderBy('date')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'date' => ['required','date','after_or_equal:today','unique:blackout_dates,date'],
            'reason' => ['nullable','string','max:255'],
        ]);
        BlackoutDate::create($data);
        return back();
    }

    public function destroy(BlackoutDate $availability)
    {
        $availability->delete();
        return back();
    }
}
