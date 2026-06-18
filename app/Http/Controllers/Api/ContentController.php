<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Entry;
use App\Models\Singleton;
use Illuminate\Http\JsonResponse;

class ContentController extends Controller
{
    /**
     * Public content for the site. Returns the same shape the admin store /
     * SS_DATA overlay expects: list collections as arrays, singles as objects.
     */
    public function index(): JsonResponse
    {
        $lists = Entry::query()->orderBy('position')->orderBy('id')->get()
            ->groupBy('collection')
            ->map(fn ($group) => $group->map(fn (Entry $e) => $e->data)->values());

        $singles = Singleton::all()->keyBy('key')->map(fn (Singleton $s) => $s->data);

        $payload = [];
        foreach (CollectionController::COLLECTIONS as $collection) {
            $payload[$collection] = $lists->get($collection, collect())->all();
        }
        foreach (SingletonController::KEYS as $key) {
            $payload[$key] = $singles->get($key, (object) []);
        }

        return response()->json($payload);
    }
}
