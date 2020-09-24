<?php

namespace App\Http\Controllers;
use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    public function index(){
        $products = Product::with('category')->get();
        return response()->json($products, 200);
    }

    public function show($id){
        $product = Product::with('category')->where('id', $id)->get();
        return response()->json($product, 200);
    }

    public function store(Request $request){
        $product = new Product;
        $product->name = $request->name;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->image = $request->image;
        $product->description = $request->description;
        $product->category_id = $request->category_id;
        if($product->save()) return response()->json('ok', 200);
    }

    public function update($id, Request $request){
        $product = Product::findOrFail($id);
        $product->name = $request->name;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->image = $request->image;
        $product->description = $request->description;
        $product->category_id = $request->category_id;
        if($product->save()) return response()->json('ok', 200);
    }

    public function destroy($id){
        Product::where('id', $id)->delete();
        return response()->json('deleted', 200);
    }
}
