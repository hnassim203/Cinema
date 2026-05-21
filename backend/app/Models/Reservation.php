<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = ['user_id', 'screening_id', 'total_price', 'status'];

    public function user() {
        return $this->belongsTo(User::class);
    }
public function screening() {
        return $this->belongsTo(Screening::class);
    }
    public function seats() {
        return $this->hasMany(ReservationSeat::class);
    }
    public function snacks() {
        return $this->hasMany(ReservationSnack::class);
    }
}