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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
            $table->string('start_time')->nullable()->default('6:00');
            $table->string('end_time')->nullable()->default('20:00');
            $table->string('category_1')->nullable()->defalult('なし');
            $table->string('category_2')->nullable()->defalult('仕事');
            $table->string('category_3')->nullable()->defalult('お出かけ');
            $table->string('category_4')->nullable()->defalult('その他1');
            $table->string('category_5')->nullable()->defalult('その他2');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
