<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // One row per item of a list collection (services, products, banner slides, …).
        // `data` holds the item exactly as the frontend/admin consume it.
        Schema::create('entries', function (Blueprint $table): void {
            $table->id();
            $table->string('collection', 64)->index();
            $table->json('data');
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('entries');
    }
};
