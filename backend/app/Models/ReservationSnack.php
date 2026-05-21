<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class ReservationSnack extends Model
{
    protected $fillable = ['reservation_id', 'snack_id', 'quantity'];
}