<?php

namespace App\Http\Controllers;
use App\Order;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Product;

class OrderController extends Controller
{
    //
    public function index(){
        $orders = Order::all();
        return response()->json($orders, 200);
    }

    public function show($id){
        $order = Order::findOrFail($id);
        return response()->json($order, 200);
    }

    public function store(Request $request){
        $totale = 0;
        $order = new Order;
        $order->ombrellone = $request->ombrellone;
        $order->status = 'pending';
        $order->products = json_encode($request->products);
        foreach($request->products as $product){
            $prodotto = Product::find($product['id']);
            $prodotto->stock -= $product['quantita'];
            $totale += ($product['quantita'] * $prodotto->price);
            $prodotto->save();
        }
        $order->total = $totale;
        if($order->save()) return response()->json('ok', 200);
    }

    public function update($id, Request $request){
        $order = Order::findOrFail($id);
        $order->ombrellone = $request->ombrellone;
        $order->orders = $request->orders;
        $order->products = json_encode($request->products);
        $order->total = $request->total;
        if($product->save()) return response()->json('ok', 200);
    }

    public function destroy($id){
        if(Order::where('id', $id)->delete()){
            return response()->json('deleted', 200);
        }
    }

    public function pending(){
        $orders = Order::where('status','pending')->orderBy('created_at','desc')->get();
        return response()->json($orders, 200);
    }

    public function done(){
        $orders = Order::where('status','done')->orderBy('updated_at','desc')->get();
        return response()->json($orders, 200);
    }

    public function evadi($id){
        $order = Order::findOrFail($id);
        $order->status = 'done';
        $order->save();
        return response()->json('evaso', 200);
    }

    public function stat_count(){
        $orders_today = Order::whereDate('created_at', Carbon::today())->get();
        $orders_today_count = count($orders_today);
        $date = Carbon::now()->subDays(7);
        $orders_week = Order::where('created_at','>=', $date)->get();
        $orders_week_count = count($orders_week);
        $result = ['today' => $orders_today_count, 'week' => $orders_week_count];
        return response()->json($result, 200);
    }

    public function stat_product(){
        $quantity_today = 0;
        $orders = $orders_today = Order::whereDate('created_at', Carbon::today())->get();
        foreach($orders as $order){
            foreach(json_decode($order->products) as $product){
                $quantity_today += $product->quantita;
            }
        }

        $quantity_week = 0;
        $date = Carbon::now()->subDays(7);
        $orders = $orders_today = Order::whereDate('created_at','>=', $date)->get();
        foreach($orders as $order){
            foreach(json_decode($order->products) as $product){
                $quantity_week += $product->quantita;
            }
        }

        $result = ['today' => $quantity_today, 'week' => $quantity_week];
        return response()->json($result, 200);
    }

    public function money_count(){
        $quantity_today = 0;
        $orders = $orders_today = Order::whereDate('created_at', Carbon::today())->get();
        foreach($orders as $order){
                $quantity_today += $order->total;
            }

        $quantity_week = 0;
        $date = Carbon::now()->subDays(7);
        $orders = $orders_today = Order::whereDate('created_at','>=', $date)->get();
        foreach($orders as $order){
                $quantity_week += $order->total;
            }

        $result = ['today' => $quantity_today, 'week' => $quantity_week];
        return response()->json($result, 200);
    }
}
