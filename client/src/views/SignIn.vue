<template>
    <div class="container">
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <img src="@/assets/Logo.png" alt="logo" width="50%" />
        <b-jumbotron header="Welcome back!" lead="Please sign in with you email address and your password.">
            <br>
            <input type="text" id="email" name="email" placeholder="Email" size="40"><br><br>
            <input type="text" id="password" name="passwork" placeholder="Password" size="40"><br><br>
            <b-button href="#" variant="info">Log in</b-button>
        </b-jumbotron>
    </div>
</template>
