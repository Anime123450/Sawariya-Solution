<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'file' => ['required', 'image', 'max:5120'], // 5 MB
        ]);

        $file = $request->file('file');
        $base = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $slug = Str::slug($base) ?: 'image';
        $name = $slug.'-'.Str::random(6).'.'.strtolower($file->getClientOriginalExtension() ?: 'jpg');

        $dir = public_path('images/uploads');
        if (! is_dir($dir)) {
            mkdir($dir, 0775, true);
        }
        $file->move($dir, $name);

        // root-relative path, matching how every other image is referenced
        return response()->json(['path' => 'images/uploads/'.$name]);
    }
}
