@extends('layouts.app')
@section('title','Dashboard')
@section('content')<h1>Dashboard</h1><p>Welcome, {{ auth()->user()->name ?? 'User' }}!</p>@endsection
