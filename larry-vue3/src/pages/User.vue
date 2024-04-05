<!-- This is the user page -->

<script setup>
// Import the store
import { store } from '@/store/store'
import axios from 'axios'
import { onMounted } from 'vue'
import BuildingCard from '../components/BuildingCard.vue';

// Get pinia store
const userStore = store()


// Get the user info when the page is loaded
onMounted(() => {
    //Use axios to get the user info that contains the building array
    axios.get('http://localhost:3000/user-and-building')
        .then(response => {
            console.log("@@@response:", response)
            // Set user info in pinia store
            userStore.setUserInfoWithBuilding(response.data.userAndBuilding)
            userStore.setOriginalAndFavourite()
        })
        .catch(error => {
            console.log(error)
        })
})

// Add to favourite: Methods from the store
const addToFavourite = (index) => userStore.addToFavourite(index)
const cancelFavourite = (index) => userStore.cancelFavourite(index)

</script>

<template>

    <h1>This is User page, user info are from pinia store</h1>
    <h2>Welcome, {{ userStore.userInfo.username }}</h2>
    <h2>Email: {{ userStore.userInfo.email }}</h2>


    <br><br>
    <!-- Testing building array within a user object -->
    <h1>Testing: This is an user object contains an building array</h1>
    <h2>Favourite</h2>
    <div class="Building-list">
        <!-- Render from the favourite building array in store -->
        <BuildingCard v-for="(building, index) in userStore.favourite" :key="index"
            :title="building.buildingName" :isFavourite="true"
            :onCancelFavourite="() => cancelFavourite(index)" />
    </div>

    <h2>Original</h2>
    <div class="Building-list">
        <!-- Render from the favourite building array in store -->
        <BuildingCard v-for="(building, index) in userStore.original" :key="index"
            :title="building.buildingName" :isFavourite="false"
            :onAddToFavourite="() => addToFavourite(index)" />
    </div>

</template>

<style scoped>
.Building-list {
    display: flex;
}
</style>