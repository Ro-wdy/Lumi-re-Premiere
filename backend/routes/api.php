<?php

use App\Http\Controllers\FilmController;
use App\Http\Controllers\FormController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/films', [FilmController::class, 'index']);
Route::get('/films/featured', [FilmController::class, 'featured']);
Route::get('/films/{slugOrId}', [FilmController::class, 'show']);

Route::post('/contact', [FormController::class, 'submitContact']);
Route::post('/newsletter', [FormController::class, 'subscribeNewsletter']);
