<script setup>
import { ref } from "vue";
import Son from "../components/Son.vue";

// Test data that will be passed to the Son component
let foods = ref([
    { name: 'Apples', desc: 'Apples are a type of fruit that grow on trees.', favorite: true },
    { name: 'Pizza', desc: 'Pizza has a bread base with tomato sauce, cheese, and toppings on top.', favorite: false },
    { name: 'Rice', desc: 'Rice is a type of grain that people like to eat.', favorite: false },
    { name: 'Fish', desc: 'Fish is an animal that lives in water.', favorite: true },
    { name: 'Cake', desc: 'Cake is something sweet that tastes good.', favorite: false }
])

// *2. Function that will be called when the Son component emits an event
//  'nameOfFood' is equaled to the 'foodName.value' emitted from the Son component
const receiveEmit = (nameOfFood) => {
    // See the food name that was clicked
    alert("@@@You clicked " + nameOfFood)

    // Find the food in the array and toggle its favorite status
    const food = foods.value.find(food => food.name === nameOfFood)
    food.favorite = !food.favorite
}

</script>

<template>
    <h1>This is father component: Testing passing data from son component to father component using emit</h1>
    <h2>Food</h2>
    <p>Toggle with the 'Favorite' button to emit an event from 'Son.vue' to 'SonToFather.vue' with the built-in Vue method
        '$emit()'.</p>
    <div id="wrapper">
        <!-- *3. 'toggle-favorite' is emitted from Son component, listen it using the 'receiveEmit' from father component -->
        <Son v-for="x in foods" :key="x.name" :foodName="x.name" :foodDesc="x.desc" :isFavorite="x.favorite"
            @toggle-favorite="receiveEmit" />
    </div>
</template>

<style>
#wrapper {
    display: flex;
    flex-wrap: wrap;
}

#wrapper>div {
    border: dashed black 1px;
    flex-basis: 120px;
    margin: 10px;
    padding: 10px;
    background-color: lightgreen;
}
</style>