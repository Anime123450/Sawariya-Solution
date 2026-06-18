<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin login for the CMS — demo credentials: admin / admin
        User::updateOrCreate(
            ['email' => 'admin@sawariyasolution.com'],
            ['name' => 'admin', 'password' => 'admin'] // 'password' cast hashes this
        );

        $this->call(ContentSeeder::class);
    }
}
