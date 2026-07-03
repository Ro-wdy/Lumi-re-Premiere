<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    public function index(): JsonResponse
    {
        $films = Film::orderBy('release_date', 'asc')->get();
        return response()->json($films);
    }

    public function featured(): JsonResponse
    {
        $film = Film::where('featured', true)->first();
        if (!$film) {
            $film = Film::first();
        }
        return response()->json($film);
    }

    public function show(string $slugOrId): JsonResponse
    {
        $film = Film::where('slug', $slugOrId)
                    ->orWhere('id', $slugOrId)
                    ->first();

        if (!$film) {
            return response()->json(['message' => 'Film not found'], 404);
        }

        return response()->json($film);
    }
}
