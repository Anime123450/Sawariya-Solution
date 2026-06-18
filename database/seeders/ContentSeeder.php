<?php

namespace Database\Seeders;

use App\Models\Entry;
use App\Models\Singleton;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    /** list collection => dot-path inside content.json */
    private const LISTS = [
        'banner' => 'banner.slides',
        'services' => 'services',
        'products' => 'products',
        'projects' => 'projects',
        'testimonials' => 'testimonials',
        'blogs' => 'blogs',
        'jobs' => 'jobs',
        'milestones' => 'milestones',
        'social' => 'socials',
        'clients' => 'clients',
        'partners' => 'partners',
    ];

    public function run(): void
    {
        $path = database_path('seeders/data/content.json');
        if (! is_file($path)) {
            $this->command?->warn('content.json missing — run: node scripts/dump-content.mjs');
            return;
        }
        $json = json_decode(file_get_contents($path), true);

        Entry::query()->delete();
        Singleton::query()->delete();

        foreach (self::LISTS as $collection => $dotPath) {
            $items = array_values((array) data_get($json, $dotPath, []));
            foreach ($items as $i => $item) {
                Entry::create([
                    'collection' => $collection,
                    'data' => $item,
                    'position' => $i,
                ]);
            }
        }

        $site = $json['site'] ?? [];

        Singleton::create(['key' => 'contact', 'data' => $json['contact'] ?? []]);

        Singleton::create(['key' => 'settings', 'data' => [
            'siteName' => $site['name'] ?? 'Sawariya Solution',
            'tagline' => $site['tagline'] ?? '',
            'short' => $site['short'] ?? '',
            'sub' => $site['sub'] ?? '',
            'seoTitle' => 'Sawariya Solution — Top-notch IT, all under one roof',
            'seoDescription' => $site['description'] ?? '',
            'keywords' => 'IT company Vadodara, web development, software, ERP, CRM, mobile apps',
        ]]);

        Singleton::create(['key' => 'footer', 'data' => [
            'description' => $site['description'] ?? '',
            'copyright' => '© '.date('Y').' Sawariya Solution. All rights reserved.',
            'legal' => 'Privacy Policy, Terms & Conditions, Refund Policy',
        ]]);

        $this->command?->info('Seeded '.Entry::count().' entries and '.Singleton::count().' singletons.');
    }
}
