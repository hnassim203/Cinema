<?php

namespace App\Http\Controllers;

use App\Models\Seat;
// use App\Models\Salle;
use Illuminate\Http\Request;

class SeatController extends Controller
{
    public function updateBulk(Request $request)
    {
        $validated = $request->validate([
            'seat_ids'   => 'required|array',        
            'seat_ids.*' => 'exists:seats,id',      
            'type'       => 'required|in:regular,vip,space,disabled',
        ]);

        Seat::whereIn('id', $validated['seat_ids'])->update([
            'type' => $validated['type']
        ]);

        return response()->json([
            'message' => 'updated'
        ], 200);
    }

}