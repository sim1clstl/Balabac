@extends('layouts.app')
@section('title','Packages')
@section('content')
<h1>Tour Packages</h1>
<ul>
@foreach($packages as $pkg)
    <li>
        <h3>{{ $pkg['title'] }} — {{ $pkg['price'] }}</h3>
        <p>{{ $pkg['desc'] }}</p>
        <form method="get" action="{{ route('contact') }}">
            <input type="hidden" name="package" value="{{ $pkg['title'] }}">
            <button type="submit">Enquire / Book</button>
        </form>
    </li>
@endforeach
</ul>
@endsection
