<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Login
Route::post('login', 'AuthController@login');

//Middleware Autenticazione
Route::group(['middleware' => 'auth:api'], function(){
    
    //Operazione CRUD
    Route::resource('product','ProductController');
    Route::resource('category','CategoryController');
    Route::resource('order','OrderController');
    Route::resource('subscription','SubscriptionController');

    // Ordini da evadere
    Route::get('pending', 'OrderController@pending');
    // Ordini evasi
    Route::get('done', 'OrderController@done');
    // Action evasione ordine
    Route::get('evadi-ordine/{id}', 'OrderController@evadi');
    // Statistiche
    Route::get('order-count', 'OrderController@stat_count');
    Route::get('product-count', 'OrderController@stat_product');
    Route::get('money-count', 'OrderController@money_count');
    // Operazioni Utenti
    Route::get('getusers', 'AuthController@getUsers');
    Route::get('deleteuser/{id}', 'AuthController@getUsers');
    Route::post('register', 'AuthController@register');

});