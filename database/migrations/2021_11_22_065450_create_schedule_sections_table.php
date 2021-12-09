<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScheduleSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedule_sections', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('scheduleid')->unsigned();
            $table->foreign('scheduleid')->references('id')->on('schedules')->onDelete('cascade');
            $table->string('crn');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedule_sections');
    }
}
