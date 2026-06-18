<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    protected $fillable = ['collection', 'data', 'position'];

    protected $casts = [
        'data' => 'array',
    ];
}
