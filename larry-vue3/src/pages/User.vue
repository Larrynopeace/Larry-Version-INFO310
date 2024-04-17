<!-- This is the user page -->

<script setup>
// Import the store
import { store } from '@/store/store'
import axios from 'axios'
import { onMounted } from 'vue'
import BuildingCard from '../components/BuildingCard.vue';
import { ref } from 'vue'

import TestData from './TestData.vue';
import TestDataGym from './TestDataGym.vue';
import TestDataCafe from './TestDataCafe.vue';

// Get pinia store
const userStore = store()

const userInfoWithBuilding = userStore.userInfoWithBuilding

onMounted(() => {
    console.log("@@@username:", userInfoWithBuilding.username)
})

// Add to favourite: Methods from the store
const addToFavourite = (index) => userStore.addToFavourite(index)
const cancelFavourite = (index) => userStore.cancelFavourite(index)

// This is the drawer of graph
const table = ref(false)

// This is the currently selected card title
const selectedCardTitle = ref(null)

// This is the method to open the drawer
const navigateToTest = (title) => {
    selectedCardTitle.value = title;
    console.log(selectedCardTitle.value);
    // Open the drawer
    table.value = true;
    //router.push(`/chart?title=${title}`)
}

</script>

<template>

    <h1>This is User page, user info are from pinia store</h1>
    <h2>Welcome, {{ userStore.userInfoWithBuilding.username }}</h2>
    <h2>Email: {{ userStore.userInfoWithBuilding.email }}</h2>


    <br><br>
    <!-- Testing building array within a user object -->
    <h1>Testing: This is an user object contains an building array, the props of following Cards are stored in database
    </h1>
    <h2>Favourite</h2>
    <div class="Building-list">
        <!-- Render from the favourite building array in store -->
        <BuildingCard v-for="(building, index) in userStore.favourite" :key="index" :title="building.buildingName"
            :isFavourite="true" :onCancelFavourite="() => cancelFavourite(index)"
            :navigateToTest="() => navigateToTest(building.buildingName)" />
    </div>
    <h2>Original</h2>
    <div class="Building-list">
        <!-- Render from the favourite building array in store -->
        <BuildingCard v-for="(building, index) in userStore.original" :key="index" :title="building.buildingName"
            :isFavourite="false" :onAddToFavourite="() => addToFavourite(index)"
            :navigateToTest="() => navigateToTest(building.buildingName)" />
    </div>

    <!-- Pop up graph within a drawer after clicking a card (Don't use selectedCardTitle.value) -->
    <el-drawer v-model="table" title="I have a nested table inside!" direction="rtl" size="70%">
        <TestData :title="'Library'" v-if="selectedCardTitle === 'Library'" />
        <TestDataGym :title="'Gym'" v-if="selectedCardTitle === 'Gym'" />
        <TestDataCafe :title="'Cafe'" v-if="selectedCardTitle === 'Cafe'" />
    </el-drawer>

</template>

<style scoped>
.Building-list {
    display: flex;
}
</style>