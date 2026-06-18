<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // One row per single record (settings, contact, footer).
        Schema::create('singletons', function (Blueprint $table): void {
            $table->id();
            $table->string('key', 64)->unique();
            $table->json('data');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('singletons');
    }
};
