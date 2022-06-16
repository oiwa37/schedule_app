<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unsigned(); 
            $table->date('sch_date')->nullable();
            $table->time('sch_time')->nullable();
            $table->time('sch_end_time')->nullable();
            $table->string('sch_category')->nullable();
            $table->string('sch_contents');
            $table->string('sch_memo')->nullable();
            $table->integer('sch_status')->default(1)->nullable();
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
        Schema::dropIfExists('schedules');
    }
};
