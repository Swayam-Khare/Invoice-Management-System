<template>
    <div class="home-container d-md-flex" id="home">
        <div class="text-content d-flex flex-column h-100 my-md-auto pt-10 px-10 px-md-16 ga-8">
            <p class="text-h3 text-grey-darken-4">
                Free invoicing software for small business.
            </p>
            <p class="text-h6 text-justify text-grey-darken-2">
                Invoice is online invoicing software that helps you craft professional invoices, send payment reminders,
                keep track of expenses, log your work hours, and get paid faster all for free!
            </p>
            <v-btn class="w-0 px-11 text-capitalize bg-btn">Sign up</v-btn>
        </div>
        <div class="image-content d-none d-md-flex">
            <img src="../assets/home.svg" alt="" class="mt-10" srcset="">
        </div>
    </div>
</template>



<script setup>
    
</script>

<style scoped>
.home-container{
    background:linear-gradient(to bottom right, #3F72AF -10%,#fff 50%);
}
.bg-btn{
    background-color: #112D4E;
    color: #fff;
}
</style>