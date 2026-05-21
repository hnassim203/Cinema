<?php

namespace App\Http\Controllers;

use App\Models\Snack;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SnackController extends Controller
{
    public function index()
    {
        return response()->json(Snack::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'category' => 'required|string',
            'image' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048' 
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('snacks', 'public');
        }

        $snack = Snack::create($data);

        return response()->json([
            'message' => 'product added ',
            'snack' => $snack
        ], 201);
    }

    public function destroy($id)
    {
        $snack = Snack::findOrFail($id);
        if ($snack->image) {
            Storage::disk('public')->delete($snack->image);
        }
        $snack->delete();
        return response()->json(['message' => 'succ delete']);
    }
}