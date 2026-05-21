<?php

namespace App\Http\Controllers;

use App\Models\Films;
use Illuminate\Http\Request;

class FilmsController extends Controller
{
    public function film(Request $request){
        $request->validate([
            'title'=>'required',
            'hours'=>'required',
            'min'=>'required',
            'release_date'=>'required',
            'category'=>'required',
            'image'=>'required',
            'description'=>'required'
        ]);



        $imagePath = $request->file('image')->store('films', 'public');

        $film = Films::create([
           'title'=>$request->title,
            'hours'=>$request->hours,
            'min'=>$request->min,
            'release_date'=>$request->release_date,
            'category'=>$request->category,
            'image'=>$imagePath,
            'description'=>$request->description,
        ]);
        return response()->json([
            'film'=> $film, 
        ]);
    }
    public function index(){
        $film = Films::all();
        return response()->json($film);
    }
    public function delete($id)
{
    $film = Films::findOrFail($id);


    $film->delete();

    return response()->json([
        'message' => 'Film deleted successfully'
    ]);
}
public function getFeaturedMovie()
{
    $featured = Films::where('is_featured', true)->first();
    
    if (!$featured) {
        $featured = Films::latest()->first();
    }
    
    return response()->json($featured);
}

public function setFeaturedMovie($id)
{
    Films::where('is_featured', true)->update(['is_featured' => false]);

    $film = Films::findOrFail($id);
    
    $film->is_featured = true;
    $film->save(); 

    return response()->json([
        'message' => 'film as a banner',
        'film' => $film
    ]);
}
}
