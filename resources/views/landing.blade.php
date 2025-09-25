@extends('layouts.app')
@section('title','Welcome')
@section('content')
<h1>Welcome to Our Tourism Agency</h1>
<p>Explore our featured packages:</p>
<ul>
@foreach($featured as $p)
    <li><strong>{{ $p['title'] }}</strong> — {{ $p['price'] }}</li>
@endforeach
</ul>
@endsection
