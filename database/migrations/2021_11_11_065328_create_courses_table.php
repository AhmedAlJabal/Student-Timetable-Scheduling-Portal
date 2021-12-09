<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->string('SEC_TERM_CODE')->nullable();
            $table->string('SEC_COLLEGE')->nullable();
            $table->string('SEC_COURSE')->nullable();
            $table->string('SEC_SHORT_TITLE')->nullable();
            $table->string('SEC_LONG_TITLE')->nullable();
            $table->string('SEC_CRN')->nullable();
            $table->string('SEC_SECTION')->nullable();
            $table->string('SEC_LINK_IDENTIFIER')->nullable();
            $table->string('SEC_STATUS')->nullable();
            $table->integer('SEC_BILLING_HRS')->nullable();
            $table->integer('SEC_CREDIT_HOURS')->nullable();
            $table->string('SEC_GRADABLE')->nullable();
            $table->string('SEC_SELFSERVICE_AVAIL')->nullable();
            $table->string('SEC_EXCL_ATTENDANCE')->nullable();
            $table->integer('SEC_CONTACT_HOURS')->nullable();
            $table->string('SEC_PART_OF_TERM')->nullable();
            $table->string('SEC_SCHEDULE_TYPE')->nullable();
            $table->integer('SEC_WORKLOAD')->nullable();
            $table->string('SEC_GRADE_MODE')->nullable();
            $table->string('SEC_SESSION')->nullable();
            $table->string('SEC_START_TIME')->nullable();
            $table->string('SEC_END_TIME')->nullable();
            $table->string('SEC_WK_DAYS')->nullable();
            $table->integer('SEC_HOURS_PER_WK')->nullable();
            $table->string('SEC_BUILDING')->nullable();
            $table->string('SEC_ROOM')->nullable();
            $table->string('SEC_TUTOR')->nullable();
            $table->string('SEC_PRIMARY_TUTOR')->nullable();
            $table->string('SEC_OVERRIDE')->nullable();
            $table->integer('SEC_MAX_EMROLLMENT')->nullable();
            $table->integer('SEC_ENROLLED_STUDENTS')->nullable();
            $table->string('SEC_SYAAITM_EXISTS')->nullable();
            $table->string('SEC_CAPP_PREREQ_IND')->nullable();
       
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
        Schema::dropIfExists('courses');
    }
}
