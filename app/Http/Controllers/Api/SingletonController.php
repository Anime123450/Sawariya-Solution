<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Singleton;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SingletonController extends Controller
{
    public const KEYS = ['contact', 'settings', 'footer'];

    private function guard(string $key): void
    {
        abort_unless(in_array($key, self::KEYS, true), 404, 'Unknown record');
    }

    public function show(string $key): JsonResponse
    {
        $this->guard($key);
        $record = Singleton::where('key', $key)->first();

        return response()->json($record?->data ?? (object) []);
    }

    public function update(Request $request, string $key): JsonResponse
    {
        $this->guard($key);
        $record = Singleton::updateOrCreate(['key' => $key], ['data' => $request->all()]);

        return response()->json($record->data);
    }
}
