<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CollectionController;
use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\SingletonController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Support\Facades\Route;

// ---- Public ----
Route::get('/content', [ContentController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);

// ---- Admin (token auth) ----
Route::middleware('auth:sanctum')->group(function (): void {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/collections/{collection}', [CollectionController::class, 'index']);
    Route::post('/collections/{collection}', [CollectionController::class, 'store']);
    Route::post('/collections/{collection}/reorder', [CollectionController::class, 'reorder']);
    Route::put('/collections/{collection}/{entry}', [CollectionController::class, 'update']);
    Route::delete('/collections/{collection}/{entry}', [CollectionController::class, 'destroy']);

    Route::get('/singletons/{key}', [SingletonController::class, 'show']);
    Route::put('/singletons/{key}', [SingletonController::class, 'update']);

    Route::post('/uploads', [UploadController::class, 'store']);
});
