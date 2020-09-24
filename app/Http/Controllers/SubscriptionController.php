<?php

namespace App\Http\Controllers;
use App\Subscription;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SubscriptionController extends Controller
{
    //
    public function index(){
        $products = Subscription::whereDate('endDate','>=', Carbon::now('Europe/Rome'))->get()->sortBy('ombrellone_col')->groupBy('ombrellone_row');
        return response()->json($products->toArray(), 200);
    }

    public function show($id){
        $product = Subscription::findOrFail($id);
        return response()->json($product, 200);
    }

    public function store(Request $request){
        $product = new Subscription;
        $product->ombrellone_row = $request->ombrellone_row;
        $product->ombrellone_col = $request->ombrellone_col;
        $product->startDate = $request->startDate;
        $product->endDate = $request->endDate;
        $product->password = Hash::make(Str::random(5));
        if($product->save()){
            return response()->json('inserito',200);
        }
    }

    public function update($id, Request $request){
        $product = Subscription::findOrFail($id);
        $product->ombrellone_row = $request->ombrellone_row;
        $product->ombrellone_col = $request->ombrellone_col;
        $product->startDate = $request->startDate;
        $product->endDate = $request->endDate;
        $product->password = $request->password;
    }

    public function destroy($id){
        Subscription::where('id', $id)->delete();
    }
}
