<?php

use Illuminate\Support\Facades\Route;
use OpenAI\Laravel\Facades\OpenAI;
use Illuminate\Support\Facades\Http;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $search = "make a json array for list to questions categories for interview questtion";
    $data = Http::withHeaders([
        'Content-Type' => 'application/json',
        'Authorization' => 'Bearer '.env('OPENAI_API_KEY'),
    ])
    ->post('https://api.openai.com/v1/chat/completions',[
         'model' => 'gpt-3.5-turbo',
            'messages' => [
               [ 
                    "role" => 'user',
                    'content' => $search
                ]
            ],
            'temperature' => 0.5,
            'max_tokens' => 200,
            'top_p' => 1.0,
            'frequency_penalty' => 0.52,
            'presence_penalty' => 0.5,
            'stop' =>["11."],
        ]);
    print_r($data['choices'][0]['message']);
});