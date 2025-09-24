@extends('layouts.app')
@section('title','Signup')
@section('content')
<h1>Signup</h1>
<form method="POST" action="{{ route('signup') }}">
    @csrf
    <label>Name: <input type="text" name="name" required></label><br>
    <label>Email: <input type="email" name="email" required></label><br>
    <label>Password: <input type="password" name="password" required></label><br>
    <label>Confirm Password: <input type="password" name="password_confirmation" required></label><br>
    <button type="submit">Signup</button>
</form>
@endsection
