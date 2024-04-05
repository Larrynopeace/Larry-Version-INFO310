<!-- This is the Home page -->

<script setup>

import BuildingCard from '../components/BuildingCard.vue';
import { store } from '../store/building-store.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import TestData from './TestData.vue';
import TestDataGym from './TestDataGym.vue';
import TestDataCafe from './TestDataCafe.vue';

// This is the original and favourite data
/* const original = ref([{ title: 'Card 1' }, { title: 'Card 2' }, { title: 'Card 3' },])
const favourite = ref([]) */

// Use the building store to get the original and favourite data
const buildingStore = store()

// These are the methods to add and cancel from favourites, using the methods from building store
const addToFavourite = (index) => buildingStore.addToFavourite(index)
const cancelFavourite = (index) => buildingStore.cancelFavourite(index)

// Get router
const router = useRouter()

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
    <h1>This is Home page</h1>

    <h2>Favourite</h2>
    <div class="Building-list">
        <BuildingCard v-for="(card, index) in buildingStore.favourite" :key="index" :title="card.title"
            :onCancelFavourite="() => cancelFavourite(index)" :isFavourite="true"
            :navigateToTest="() => navigateToTest(card.title)" />
    </div>

    <h2>Original</h2>
    <div class="Building-list">
        <BuildingCard v-for="(card, index) in buildingStore.original" :key="index" :title="card.title"
            :onAddToFavourite="() => addToFavourite(index)" :isFavourite="false"
            :navigateToTest="() => navigateToTest(card.title)" />
    </div>

    <!-- Pop up graph within a drawer after clicking a card (Don't use selectedCardTitle.value) -->
    <el-drawer v-model="table" title="I have a nested table inside!" direction="rtl" size="70%">
        <TestData :title="'Library'" v-if="selectedCardTitle === 'Card 1'" />
        <TestDataGym :title="'Gym'" v-if="selectedCardTitle === 'Card 2'" />
        <TestDataCafe :title="'Cafe'" v-if="selectedCardTitle === 'Card 3'" />
    </el-drawer>

</template>

<style scoped>
.Building-list {
    display: flex;
}
</style>