<?php

use Illuminate\Support\Facades\Route;

// Serve the static marketing site + admin (everything else in public/ — css,
// js, images, *.html — is served directly by the web server / artisan serve).
Route::get('/', fn () => response()->file(public_path('index.html')));
// Redirect /admin -> /admin/ so the admin page's relative asset paths
// (admin.css, admin.js, ../css/style.css) resolve correctly. Without the
// trailing slash the browser resolves them against the site root and 404s,
// leaving the page unstyled and the login script unloaded.
Route::get('/admin', fn () => redirect('/admin/'));
Route::get('/admin/', fn () => response()->file(public_path('admin/index.html')));
