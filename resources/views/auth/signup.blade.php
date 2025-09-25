@extends('layouts.app')
@section('title','Signup')
@section('content')
<h1>Signup</h1>
<form method="POST" action="{{ route('signup.submit') }}">
    @csrf
    <label>Name:<br><input type="text" name="name" required></label><br>
    <label>Email:<br><input type="email" name="email" required></label><br>
    <label>Password:<br><input type="password" name="password" required></label><br>
    <button type="submit">Create Account</button>
</form>
@endsection
