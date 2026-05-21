<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FilmsController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\SeatController;
use App\Http\Controllers\ScreeningController;
use App\Http\Controllers\SnackController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/film', [FilmsController::class, 'film']);
Route::get('/film', [FilmsController::class, 'index']);
Route::delete('/film/{id}', [FilmsController::class, 'delete']);
Route::post('/salles', [SalleController::class, 'store']);
Route::post('/seats/bulk-update', [SeatController::class, 'updateBulk']);
Route::get('/salles', [SalleController::class, 'index']);

Route::get('/screenings', [ScreeningController::class, 'index']);
Route::post('/screenings', [ScreeningController::class, 'store']);
Route::get('/films/{film_id}/screenings', [ScreeningController::class, 'getByFilm']);
Route::get('/screenings/{screeningId}/seats', [ScreeningController::class, 'getSeats']);

Route::get('/snacks', [SnackController::class, 'index']);
Route::post('/snacks', [SnackController::class, 'store']);
Route::delete('/snacks/{id}', [SnackController::class, 'destroy']);

Route::post('/reservations', [ReservationController::class, 'store']);
Route::get('/reservations/seats/{screening_id}', [ReservationController::class, 'getReservedSeats']);
Route::get('/users/{user_id}/reservations', [ReservationController::class, 'getUserReservations']);

Route::get('/users', [UserController::class, 'index']);
Route::put('/users/{id}/role', [UserController::class, 'updateRole']);

Route::get('/movies/featured', [FilmsController::class, 'getFeaturedMovie']);
Route::put('/movies/{id}/featured', [FilmsController::class, 'setFeaturedMovie']);
// Route::post('/salles', [SallesController::class, 'salles']);
// Route::get('/salles', [SallesController::class, 'index']);
// Route::delete('/salles/{id}', [SallesController::class, 'delete']);

// Route::get('/salles/{id}', [SallesController::class, 'show']);