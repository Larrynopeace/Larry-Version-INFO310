<!-- This is the Home page -->

<script setup>

import BuildingCard from '../components/BuildingCard.vue';
import { store } from '../store/building-store.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import TestData from './TestData.vue';

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
const gridData = [
    {
        date: '2016-05-02',
        name: 'Peter Parker',
        address: 'Queens, New York City',
    },
    {
        date: '2016-05-04',
        name: 'Peter Parker',
        address: 'Queens, New York City',
    },
    {
        date: '2016-05-01',
        name: 'Peter Parker',
        address: 'Queens, New York City',
    },
    {
        date: '2016-05-03',
        name: 'Peter Parker',
        address: 'Queens, New York City',
    },
]
// This is the method to open the drawer
const navigateToTest = (title) => {
    table.value = true;
    /* router.push(`/test?title=${title}`) */
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

    <!-- Pop up graph within a drawer after clicking card -->
    <el-drawer v-model="table" title="I have a nested table inside!" direction="rtl" size="70%">
        <TestData />
    </el-drawer>
</template>

<style scoped>
.Building-list {
    display: flex;
}
</style>