<?php

namespace Database\Seeders;

use App\Models\Film;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Film::create([
            'title' => 'Chronicles of the Dust',
            'slug' => 'chronicles-of-the-dust',
            'genre' => 'Sci-Fi / Space Opera',
            'release_date' => '2026-11-15',
            'countdown_date' => '2026-11-15 19:30:00',
            'logline' => 'In a dying universe, a lone explorer uncovers a celestial stardust key that could rewrite the history of space and time.',
            'synopsis' => 'Set in the far reaches of a crumbling galaxy, Chronicles of the Dust follows Caleb, a veteran space scout, who discovers an ancient alien relic. This relic contains a substance known as Aetheris—a stardust that holds the imprint of the first ever universe. As rival intergalactic factions chase Caleb across barren sand planets and cosmic nebulae, he must decipher the artifact\'s true purpose before the stars go cold forever.',
            'director' => 'Denis Villeneuve',
            'cast' => ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Oscar Isaac'],
            'runtime' => 156,
            'trailer_url' => 'https://www.youtube.com/embed/8Qn_spdM5Zg',
            'poster_img' => '/images/aetheris_poster.png',
            'backdrop_img' => '/images/hero_backdrop.png',
            'gallery' => ['/images/hero_backdrop.png', '/images/aetheris_poster.png'],
            'featured' => true,
        ]);

        Film::create([
            'title' => 'Eclipse of the Mind',
            'slug' => 'eclipse-of-the-mind',
            'genre' => 'Psychological Thriller',
            'release_date' => '2026-09-08',
            'countdown_date' => '2026-09-08 20:00:00',
            'logline' => 'Reality bends and time shatters when a detective tries to solve a murder that hasn\'t happened yet.',
            'synopsis' => 'Detective Sarah Vance specializes in cold cases, but her latest investigation is freezing. A shattered pocket watch found at a high-profile crime scene starts ticking backwards, dragging Sarah into a pocket dimension where the cities bend like paper and memories are sold on the black market. As she tracks down the elusive architect of the dreamscape, she realizes her own mind is the crime scene.',
            'director' => 'Christopher Nolan',
            'cast' => ['Liam Neeson', 'Ana de Armas', 'Ethan Hawke', 'Carynne Mackintosh'],
            'runtime' => 142,
            'trailer_url' => 'https://www.youtube.com/embed/8Qn_spdM5Zg',
            'poster_img' => '/images/chrono_poster.png',
            'backdrop_img' => '/images/hero_backdrop.png',
            'gallery' => ['/images/hero_backdrop.png', '/images/chrono_poster.png'],
            'featured' => false,
        ]);

        Film::create([
            'title' => 'L\'Amour Éternel',
            'slug' => 'lamour-eternel',
            'genre' => 'Romantic Drama',
            'release_date' => '2026-10-02',
            'countdown_date' => '2026-10-02 18:00:00',
            'logline' => 'Two strangers cross paths at the Paris Film Festival, spark a timeless romance, and must choose between their dreams and each other.',
            'synopsis' => 'Set against the backdrop of the luminous Paris Film Festival, L\'Amour Éternel tells the story of Sophie, an aspiring French actress, and Arthur, a disillusioned American writer. Over the course of seven days and nights along the Seine, they engage in deep conversations about art, love, and destiny. But as the festival draws to a close, a life-altering opportunity threatens to tear them apart forever.',
            'director' => 'François Dubois',
            'cast' => ['Léa Seydoux', 'Timothée Chalamet', 'Marion Cotillard'],
            'runtime' => 118,
            'trailer_url' => 'https://www.youtube.com/embed/8Qn_spdM5Zg',
            'poster_img' => '/images/etoile_poster.png',
            'backdrop_img' => '/images/hero_backdrop.png',
            'gallery' => ['/images/hero_backdrop.png', '/images/etoile_poster.png'],
            'featured' => false,
        ]);

        Film::create([
            'title' => 'Shadows in the Mist',
            'slug' => 'shadows-in-the-mist',
            'genre' => 'Mystery / Horror',
            'release_date' => '2026-08-14',
            'countdown_date' => '2026-08-14 21:00:00',
            'logline' => 'A glowing golden doorway appears in the heart of a foggy Pacific Northwest forest, drawing locals into an ancient, terrifying mystery.',
            'synopsis' => 'Deep within the misty woods of Blackwood, Oregon, a mysterious golden doorway appears without explanation. Those who peer into it report seeing their deepest, most forgotten memories. When local sheriff Noah Thorne goes missing after investigating the doorway, his daughter Alice must venture into the foggy abyss to retrieve him, unlocking a dark supernatural history that dates back centuries.',
            'director' => 'Elias Reed',
            'cast' => ['Alice Thorne', 'Florence Pugh', 'Willem Dafoe'],
            'runtime' => 105,
            'trailer_url' => 'https://www.youtube.com/embed/8Qn_spdM5Zg',
            'poster_img' => '/images/shadows_poster.png',
            'backdrop_img' => '/images/hero_backdrop.png',
            'gallery' => ['/images/hero_backdrop.png', '/images/shadows_poster.png'],
            'featured' => false,
        ]);
    }
}
