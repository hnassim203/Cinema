<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salle extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'rows_count', 'columns_count'];

    public function seats()
    {
        return $this->hasMany(Seat::class);
    }
}