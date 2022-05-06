<?php

use Illuminate\Http\Request;
use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/book/add', [BookController::class, 'add']);

Route::get('/book/all', [BookController::class, 'all']);

Route::delete('/book/delete/{id}', [BookController::class, 'delete']);

Route::patch('/book/change_availability/{id}', [BookController::class, 'change_availability']);

Route::post('/token', function (Request $request) {
    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response([
            'message' => ['These credentials do not match our records.']
        ], 404);
    }

    $admin = $user->name == "Admin";
    $token = $user->createToken($request->device_name)->plainTextToken;

    $response = [
        'user' => $user,
        'token' => $token,
        'is_admin' => $admin,
    ];

    // return response($response, 201);
    // if ($user) {
    //     // if ($user->password == Hash::make($request->password)) 
    //     if ($user->name == "Admin") $abilities = ["server:all"];
    //     else $abilities = ["server:view"];
    //     return $user->createToken($request->device_name, $abilities)->plainTextToken;
    // }
    return $response;
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/login', function () {
    return view('login');
})->name('login');
