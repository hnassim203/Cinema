<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class ReservationSeat extends Model
{
    protected $fillable = ['reservation_id', 'seat_id'];
}