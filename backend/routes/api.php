<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ApplicationController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);

// Protected Routes
Route::middleware('auth:api')->group(function () {
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('auth/me', [AuthController::class, 'me']);
});

Route::get('jobs', [JobController::class,'index']);
Route::get('jobs/{id}', [JobController::class,'show']);

// Protected Routes
Route::middleware('auth:api')->group(function(){
    Route::post('jobs', [JobController::class,'store']);
    Route::put('jobs/{id}', [JobController::class,'update']);
    Route::delete('jobs/{id}', [JobController::class,'destroy']);

    Route::post('applications', [ApplicationController::class,'store']);
    Route::get('applications/{job_id}', [ApplicationController::class,'forJob']);
    Route::get('my-applications', [ApplicationController::class,'myApplications']);
});


