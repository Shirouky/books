<?php

use Illuminate\Http\Request;
use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/book/add', [BookController::class, 'add']);

Route::get('/book/all', [BookController::class, 'all']);

Route::get('/book/delete/{id}', [BookController::class, 'delete']);

Route::get('/book/change_availability/{id}', [BookController::class, 'change_availability']);

Route::post('/token', function (Request $request) {
    $user = User::where('email', $request->email)->first();
    return $user->createToken($request->device_name)->plainTextToken;
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/login', function () {
    return view('login');
})->name('login');
