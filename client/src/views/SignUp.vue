<template>
    <div class="container">
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <img src="@/assets/Logo.png" alt="logo" width="50%" />
        <b-jumbotron header="Welcome to GET FIT!" lead="Please fill up the following information to create an account. You will be able to edit it later">
            <div class="row">
                <div class="col-6 col-md-4">
                    Account Information:
                </div>
                <div class="col-6 col-md-4">
                    <input type="text" id="email" name="email" placeholder="Email" size="40" class="input">
                </div>
                <div class="col-6 col-md-4">
                    <input type="text" id="password" name="password" placeholder="Password" size="40" class="input">
                </div>
            </div>
            <div class="row">
                <div class="col-6 col-md-4">
                    Personal Information:
                </div>
                <div class="col-6 col-md-4">
                    <input type="text" id="name" name="name" placeholder="Name" size="40" class="input">
                </div>
                <div class="col-6 col-md-4">
                    <input type="text" id="age" name="age" placeholder="Age" size="40" class="input">
                </div>
                <div class="col-6 col-md-4"></div>
                <div class="col-6 col-md-4">
                    <input type="text" id="height" name="height" placeholder="Height" size="40" class="input">
                </div>
                <div class="col-6 col-md-4">
                    <input type="text" id="gender" name="gender" placeholder="Gender" size="40" class="input">
                </div>
                <div class="col-6 col-md-4"></div>
                <div class="col-6 col-md-4">
                    <input type="text" id="weight" name="weight" placeholder="Body Weight" size="40" class="input">
                </div>
                <div class="col-6 col-md-4">
                    <input type="text" id="bodyFat" name="bodyFat" placeholder="Body Fat Percentage" size="40" class="input">
                </div>
                <div class="col-6 col-md-4"></div>
                <div class="col-6 col-md-4">
                    <input type="text" id="goal" name="goal" placeholder="Goal" size="40" class="input">
                </div>
            </div>
            <br>
            <b-button href="#" variant="info">Create Account</b-button>
        </b-jumbotron>
    </div>
</template>

<style>
    .col-6{
        padding: 1%;
    }
    .row{
        padding-top: 2%;
    }
    .input{
        text-align: left;
    }

</style>
