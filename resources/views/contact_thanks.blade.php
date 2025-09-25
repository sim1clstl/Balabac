@extends('layouts.app')
@section('title','Thank you')
@section('content')
<h1>Thanks for contacting us!</h1>
<p>We received your message:</p>
<ul>
    <li>Name: {{ $data['name'] ?? '' }}</li>
    <li>Email: {{ $data['email'] ?? '' }}</li>
    <li>Package: {{ $data['package'] ?? 'N/A' }}</li>
    <li>Message: {{ $data['message'] ?? '' }}</li>
</ul>
<p>We will get back to you shortly.</p>
@endsection
