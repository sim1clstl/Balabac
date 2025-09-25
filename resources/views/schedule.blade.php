@extends('layouts.app')
@section('title','Tour Schedule')
@section('content')
<h1>Tour Schedule</h1>
<table border="1" cellpadding="6" cellspacing="0">
    <thead><tr><th>Date</th><th>Tour</th><th>Available Seats</th></tr></thead>
    <tbody>
    @foreach($schedule as $s)
        <tr>
            <td>{{ $s['date'] }}</td>
            <td>{{ $s['tour'] }}</td>
            <td>{{ $s['seats'] }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
@endsection
