<template>
    <div class="home-container">
        <NavBar />
        <div class="d-flex flex-column-reverse flex-md-row align-center justify-center w-150" id="home">
            <div class="text-content d-flex flex-column pt-10 px-10 px-md-16 ga-8">
                <p class="text-h3 text-grey-darken-4">
                    Free invoicing software for small business.
                </p>
                <p class="text-h6 text-justify text-grey-darken-2">
                    IMS is online invoicing software that helps you craft professional invoices, send payment
                    reminders,
                    keep track of expenses, log your work hours, and get paid faster all for free!
                </p>
                <v-btn class="w-0 px-11 text-capitalize bg-btn">Sign up</v-btn>
            </div>
            <div class="image-content">
                <img src="../assets/home.svg" alt="" class="mt-10" srcset="">
            </div>
        </div>
    </div>
</template>



<script setup>
import NavBar from '../components/NavBar.vue';
</script>

<style scoped>
@media only screen and (min-width: 960px) {
    .home-container{
        background:linear-gradient(to bottom right, #3F72AF -10%,#fff 50%);
    }
}
.home-container{
    /* width: 150vw; */
}
.bg-btn {
    background-color: #112D4E;
    color: #fff;
}

</style>