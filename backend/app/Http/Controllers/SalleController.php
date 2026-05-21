<?php

namespace App\Http\Controllers;

use App\Models\Salle;
use App\Models\Seat;
use Illuminate\Http\Request;

class SalleController extends Controller
{
        public function index()
    {
        $salles = Salle::with('seats')->get();
        
        return response()->json($salles, 200);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'rows_count' => 'required|integer|min:1|max:50', 
            'columns_count' => 'required|integer|min:1|max:50',
        ]);

        $salle = Salle::create([
            'name' => $validated['name'],
            'rows_count' => $validated['rows_count'],
            'columns_count' => $validated['columns_count'],
        ]);

        $seats = [];
        $alphabet = range('A', 'Z'); 

        for ($row = 0; $row < $validated['rows_count']; $row++) {
            $rowIndex = $alphabet[$row] ?? (string)($row + 1);

            for ($col = 1; $col <= $validated['columns_count']; $col++) {
                $seats[] = [
                    'salle_id' => $salle->id,
                    'row_index' => $rowIndex,
                    'column_index' => $col,
                    'type' => 'regular', 
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        Seat::insert($seats);

        return response()->json([
            'message' => 'salle and its seat added succ',
            'salle' => $salle->load('seats') 
        ], 201);
    }
}