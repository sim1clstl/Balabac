@extends('layouts.app')
@section('title','Welcome')
@section('content')
<h1>Account Created</h1>
<p>Thank you, {{ $name }}. This is a placeholder signup flow — integrate real auth to create users.</p>
<p><a href="{{ route('login') }}">Go to login</a></p>
@endsection
