<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>@yield('title', 'App')</title>
</head>
<body>
    <nav>
        <a href="{{ route('landing') }}">Home</a> |
        <a href="{{ route('faqs') }}">FAQs</a> |
        <a href="{{ route('about') }}">About</a> |
        <a href="{{ route('contact') }}">Contact</a> |
        @auth
            <a href="{{ route('dashboard') }}">Dashboard</a> |
            <a href="{{ route('calendar') }}">Calendar</a> |
            <form action="{{ route('logout') }}" method="POST" style="display:inline;">
                @csrf
                <button type="submit">Logout</button>
            </form>
        @else
            <a href="{{ route('login') }}">Login</a> |
            <a href="{{ route('signup') }}">Signup</a>
        @endauth
    </nav>
    <hr>
    <div>
        @yield('content')
    </div>
</body>
</html>
