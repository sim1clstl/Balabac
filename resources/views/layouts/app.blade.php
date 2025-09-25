<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>@yield('title','Tourism Agency')</title>
</head>
<body>
    <header>
        <nav>
            <a href="{{ route('landing') }}">Home</a> |
            <a href="{{ route('packages') }}">Packages</a> |
            <a href="{{ route('schedule') }}">Tour Schedule</a> |
            <a href="{{ route('faqs') }}">FAQs</a> |
            <a href="{{ route('about') }}">About</a> |
            <a href="{{ route('contact') }}">Contact</a> |
            <a href="{{ route('login') }}">Login</a> |
            <a href="{{ route('signup') }}">Signup</a>
        </nav>
    </header>
    <hr>
    <main>
        @yield('content')
    </main>
    <hr>
    <footer>
        <p>&copy; {{ date('Y') }} Tourism Agency</p>
    </footer>
</body>
</html>
