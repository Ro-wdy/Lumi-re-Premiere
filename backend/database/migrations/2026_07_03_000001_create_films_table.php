<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('films', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('genre');
            $table->date('release_date');
            $table->dateTime('countdown_date');
            $table->string('logline');
            $table->text('synopsis');
            $table->string('director');
            $table->json('cast');
            $table->integer('runtime'); // in minutes
            $table->string('trailer_url');
            $table->string('poster_img');
            $table->string('backdrop_img');
            $table->json('gallery');
            $table->boolean('featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('films');
    }
};
