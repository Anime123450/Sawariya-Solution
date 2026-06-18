<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Entry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CollectionController extends Controller
{
    /** list collections the CMS is allowed to manage */
    public const COLLECTIONS = [
        'banner', 'services', 'products', 'projects', 'testimonials',
        'blogs', 'jobs', 'milestones', 'social', 'clients', 'partners',
    ];

    private function guard(string $collection): void
    {
        abort_unless(in_array($collection, self::COLLECTIONS, true), 404, 'Unknown collection');
    }

    /** item payload with its id merged in (admin needs the id) */
    private function present(Entry $e): array
    {
        return array_merge(['id' => $e->id], (array) $e->data);
    }

    public function index(string $collection): JsonResponse
    {
        $this->guard($collection);

        $items = Entry::where('collection', $collection)
            ->orderBy('position')->orderBy('id')->get()
            ->map(fn (Entry $e) => $this->present($e));

        return response()->json($items);
    }

    public function store(Request $request, string $collection): JsonResponse
    {
        $this->guard($collection);

        $data = $request->except(['id']);
        $position = (int) Entry::where('collection', $collection)->max('position') + 1;

        $entry = Entry::create([
            'collection' => $collection,
            'data' => $data,
            'position' => $position,
        ]);

        return response()->json($this->present($entry), 201);
    }

    public function update(Request $request, string $collection, Entry $entry): JsonResponse
    {
        $this->guard($collection);
        abort_unless($entry->collection === $collection, 404);

        $entry->update(['data' => $request->except(['id'])]);

        return response()->json($this->present($entry));
    }

    public function destroy(string $collection, Entry $entry): JsonResponse
    {
        $this->guard($collection);
        abort_unless($entry->collection === $collection, 404);

        $entry->delete();

        return response()->json(['deleted' => true]);
    }

    public function reorder(Request $request, string $collection): JsonResponse
    {
        $this->guard($collection);
        $ids = (array) $request->input('ids', []);

        foreach (array_values($ids) as $i => $id) {
            Entry::where('collection', $collection)->where('id', $id)->update(['position' => $i]);
        }

        return response()->json(['ok' => true]);
    }
}
