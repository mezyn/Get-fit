<template>
    <div class="container">
        <b-jumbotron header="Hello User" lead="In this page you can see and edit all your personal information and view the exercises you saved"></b-jumbotron>
        <div class="row">
            <div class="col-6 col-md-4">
                <h5>Personal information</h5>
                <p>Here you can edit you personal information</p>
                <input type="text" id="name" name="name" placeholder="Your name"><br><br>
                <input type="text" id="age" name="age" placeholder="Your age"><br><br>
                <input type="text" id="height" name="height" placeholder="Your height"><br><br>
            </div>
            <div class="col-6 col-md-4">
                <h5>Saved Exercises</h5>
                <p>Or a short description</p>
            </div>
        </div>
    </div>
</template>
