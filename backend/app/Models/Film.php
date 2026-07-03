<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'genre',
        'release_date',
        'countdown_date',
        'logline',
        'synopsis',
        'director',
        'cast',
        'runtime',
        'trailer_url',
        'poster_img',
        'backdrop_img',
        'gallery',
        'featured',
    ];

    protected $casts = [
        'cast' => 'array',
        'gallery' => 'array',
        'release_date' => 'date',
        'countdown_date' => 'datetime',
        'featured' => 'boolean',
    ];
}
