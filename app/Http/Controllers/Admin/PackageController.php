<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Packages/Index', [
            'packages' => Package::orderByDesc('created_at')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required','string','max:255'],
            'description' => ['nullable','string'],
            'duration_minutes' => ['required','integer','min:1','max:1440'],
            'price' => ['required','numeric','min:0'],
            'is_active' => ['required','boolean'],
        ]);
        Package::create($data);
        return back();
    }

    public function update(Request $request, Package $package)
    {
        $data = $request->validate([
            'name' => ['required','string','max:255'],
            'description' => ['nullable','string'],
            'duration_minutes' => ['required','integer','min:1','max:1440'],
            'price' => ['required','numeric','min:0'],
            'is_active' => ['required','boolean'],
        ]);
        $package->update($data);
        return back();
    }

    public function destroy(Package $package)
    {
        $package->delete();
        return back();
    }
}
