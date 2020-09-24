<?php

namespace App\Http\Controllers;
use App\Category;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //
    public function index(){
        $categories = Category::withCount(['products'])->get();
        return response()->json($categories, 200);
    }

    public function show($id){
        $category = Category::findOrFail($id);
        return response()->json($category, 200);
    }

    public function store(Request $request){
        $category = new Category;
        $category->name = $request->name;
        $category->description = $request->description;
        if($category->save()) return response()->json('ok', 200);
    }

    public function update($id, Request $request){
        $category = Category::findOrFail($id);
        $category->name = $request->name;
        $category->description = $request->description;
        if($category->save()) return response()->json('ok', 200);
    }

    public function destroy($id){
        Category::where('id', $id)->delete();
        return response()->json('deleted', 200);
    }
}
