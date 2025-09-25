@extends('layouts.app')
@section('title','Contact Us')
@section('content')
<h1>Contact Us</h1>
<form method="POST" action="{{ route('contact.submit') }}">
    @csrf
    <label>Name:<br><input type="text" name="name" required></label><br>
    <label>Email:<br><input type="email" name="email" required></label><br>
    <label>Package (optional):<br><input type="text" name="package" value="{{ request('package') }}"></label><br>
    <label>Message:<br><textarea name="message" required></textarea></label><br>
    <button type="submit">Send</button>
</form>
@endsection
