<?php

namespace App\Http\Controllers;

use App\Models\Screening;
use App\Models\Seat;
use Illuminate\Http\Request;

class ScreeningController extends Controller
{
    public function index()
    {
        $screenings = Screening::with(['film', 'salle'])->get();
        return response()->json($screenings);
    }

    public function store(Request $request)
    {
        $request->validate([
            'film_id' => 'required|exists:films,id',
            'salle_id' => 'required|exists:salles,id',
            'date' => 'required|date',
            'time' => 'required',
        ]);

        $screening = Screening::create([
            'film_id' => $request->film_id,
            'salle_id' => $request->salle_id,
            'date' => $request->date,
            'time' => $request->time,
        ]);

        $screeningWithRelations = Screening::with(['film', 'salle'])->find($screening->id);

        return response()->json([
            'message' => 'show added succ',
            'screening' => $screeningWithRelations
        ], 201);
    }
    public function getByFilm($film_id)
    {
        $screenings = Screening::with('salle')->where('film_id', $film_id)->get();
        return response()->json($screenings);
    }
    public function getSeats($screening_id)
{
    $screening = Screening::with(['film', 'salle'])->findOrFail($screening_id);

    $seats = Seat::where('salle_id', $screening->salle_id)
                 ->orderBy('row_index')
                 ->orderBy('column_index')
                 ->get();

    return response()->json([
        'screening' => $screening,
        'seats'     => $seats
    ], 200);
}
}