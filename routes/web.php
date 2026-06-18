<?php

use Illuminate\Support\Facades\Route;

// Serve the static marketing site + admin (everything else in public/ — css,
// js, images, *.html — is served directly by the web server / artisan serve).
Route::get('/', fn () => response()->file(public_path('index.html')));
Route::get('/admin', fn () => response()->file(public_path('admin/index.html')));
Route::get('/admin/', fn () => response()->file(public_path('admin/index.html')));
