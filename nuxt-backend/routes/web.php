<?php

use App\Models\Question;
use Illuminate\Support\Facades\Route;
use OpenAI\Laravel\Facades\OpenAI;
use Illuminate\Support\Facades\Http;

Route::get('/', function () {
    $data = json_decode(MakeQuestion());
    dump($data);
    foreach ($data->questions as  $question) {
        Question::create(['question'=>$question]);
        dump($question);
    }
    
    return 'success';
});

function MakeQuestion()
{
    try {
        $data = Http::timeout(60)->withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer '.env('OPENAI_API_KEY'),
        ])
        ->post('https://api.openai.com/v1/chat/completions',[
                'model' => 'gpt-3.5-turbo-1106',
                'messages' => [
                    [ 
                        "role" => 'system',
                        'content' => 'Generate JSON response'
                    ],
                    [
                        'role' => 'user',
                        'content' => 'make 50 unique questions for interview warm up it support category in json format no numbering'
                    ],
                    [
                        'role' => 'user',
                        'content' => 'make array key name as questions'
                    ]
                    
                ],
                'response_format'=> [ "type"=> "json_object" ],
            ]);
        return $data['choices'][0]['message']['content'];
    } catch (\Throwable $th) {
        throw $th;
    }
}