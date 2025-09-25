<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function landing() {
        $featured = [
            ['title'=>'Island Escape', 'price'=>'PHP 8,500', 'slug'=>'island-escape'],
            ['title'=>'Mountain Trek', 'price'=>'PHP 4,200', 'slug'=>'mountain-trek'],
        ];
        return view('landing', compact('featured'));
    }

    public function about() { return view('about'); }
    public function faqs() { return view('faqs'); }
    public function packages() {
        $packages = [
            ['title'=>'Island Escape','price'=>'PHP 8,500','desc'=>'3-day island hopping package'],
            ['title'=>'Heritage Tour','price'=>'PHP 3,200','desc'=>'Half-day city heritage walk'],
            ['title'=>'Mountain Trek','price'=>'PHP 4,200','desc'=>'2-day guided trek'],
        ];
        return view('packages', compact('packages'));
    }
    public function schedule() {
        // simple schedule entries
        $schedule = [
            ['date'=>'2025-10-01','tour'=>'Island Escape','seats'=>12],
            ['date'=>'2025-10-05','tour'=>'Mountain Trek','seats'=>8],
            ['date'=>'2025-10-12','tour'=>'Heritage Tour','seats'=>20],
        ];
        return view('schedule', compact('schedule'));
    }

    public function contactForm() { return view('contact'); }
    public function submitContact(Request $r) {
        // placeholder: just pass submitted data to a thank you view
        $data = $r->only(['name','email','message','package']);
        return view('contact_thanks', compact('data'));
    }

    public function dashboard() { return view('dashboard'); }
    public function login() { return view('auth.login'); }
    public function signup() { return view('auth.signup'); }
    public function signupSubmit(Request $r) {
        // placeholder: in real app create user. Here we redirect to dashboard.
        $name = $r->input('name');
        return view('signup_thanks', compact('name'));
    }
    public function loginSubmit(Request $r) {
        // placeholder auth: accept any credentials and redirect to dashboard
        return redirect()->route('dashboard');
    }
}
