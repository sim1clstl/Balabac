<?php
namespace App\Http\Controllers;

class HomeController extends Controller
{
    public function landing() { return view('landing'); }
    public function faqs() { return view('faqs'); }
    public function about() { return view('about'); }
    public function contact() { return view('contact'); }
}
