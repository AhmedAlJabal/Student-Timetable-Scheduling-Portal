<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;


    const WEEK_DAYS = [
        'U' => 'Sunday',
        'M' => 'Monday',
        'T' => 'Tuesday',
        'W' => 'Wednesday',
        'R' => 'Thursday',      
    ];


}
