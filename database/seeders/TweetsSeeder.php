<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tweet;

class TweetsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Tweet::factory()->count(10)->create();

        // DB::table('tweet')->insert([
        //     'content' => Str::random(100),
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);
    }
}
