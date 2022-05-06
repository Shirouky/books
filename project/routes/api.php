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

Route::post('/register', function (Request $request) {
    $data = $request->validate([
        'name' => 'required',
        'email' => 'required|email',
        'password' => 'required'
    ]);
    $user = new User;
    $user->name = $request->name;
    $user->email = $request->email;
    $user->password = Hash::make($request->password);
    $user->save();
});

Route::get('/book/all', [BookController::class, 'all']);

Route::delete('/book/delete/{id}', [BookController::class, 'delete']);

Route::patch('/book/change_availability/{id}', [BookController::class, 'change_availability']);
//admin@test.com
Route::post('/token', function (Request $request) {
    $data = $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response([
            'message' => ['These credentials do not match our records.']
        ], 404);
    }

    $admin = $user->name == "Admin";
    $token = $user->createToken($request->device_name, [$admin ? 'edit' : 'view'])->plainTextToken;

    $response = [
        'user' => $user,
        'token' => $token,
        'is_admin' => $admin,
    ];
    return $response;
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/check-user', function () {
    return true;
});

Route::middleware(['auth:sanctum', 'ability:edit'])->get('/check-admin', function () {
    return true;
});
