<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\ReservationSeat;
use App\Models\ReservationSnack;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'nullable|integer', 
            'screening_id' => 'required|integer',
            'seats' => 'required|array',
            'snacks' => 'array',
            'total_price' => 'required|numeric',
        ]);

        DB::beginTransaction();

        try {
            $reservation = Reservation::create([
                'user_id' => $request->user_id ?? 1, 
                'screening_id' => $request->screening_id,
                'total_price' => $request->total_price,
                'status' => 'completed',
            ]);

            foreach ($request->seats as $seatId) {
                ReservationSeat::create([
                    'reservation_id' => $reservation->id,
                    'seat_id' => $seatId,
                ]);
            }

            if ($request->has('snacks') && is_array($request->snacks)) {
                foreach ($request->snacks as $snack) {
                    ReservationSnack::create([
                        'reservation_id' => $reservation->id,
                        'snack_id' => $snack['id'],
                        'quantity' => $snack['quantity'],
                    ]);
                }
            }

            DB::commit(); 

            return response()->json([
                'status' => 'success',
                'message' => 'confirm  succ',
                'reservation_id' => $reservation->id
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack(); 
            return response()->json([
                'status' => 'error',
                'message' => 'error during exuc',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function getReservedSeats($screening_id)
    {
        $reservedSeats = DB::table('reservation_seats')
            ->join('reservations', 'reservation_seats.reservation_id', '=', 'reservations.id')
            ->where('reservations.screening_id', $screening_id)
            ->pluck('reservation_seats.seat_id');

        return response()->json($reservedSeats);
    }
    public function getUserReservations($user_id)
    {
        $reservations = Reservation::with([
            'screening.film',
            'screening.salle', 
            'seats',
            'snacks' 
        ])
        ->where('user_id', $user_id)
        ->orderBy('created_at', 'desc') 
        ->get();

        return response()->json($reservations);
    }
}