<script setup>
import { ref, defineProps, defineEmits } from 'vue'

// Define the props that the component will receive
const props = defineProps({
    foodName: String,
    foodDesc: String,
    isFavorite: Boolean
})

// Make the foodName prop reactive so that it can be passed to the parent component
const foodName = ref(props.foodName)

// *1. Define the events that the parent component will listen to
const emit = defineEmits(['toggle-favorite'])
// Define the toggleFavorite method emitting the 'toggle-favorite' event and passing the foodName value
const toggleFavorite = () => {
    emit('toggle-favorite', foodName.value)
}

</script>

<template>
    <div>
        <h2>
            <h6>Son Component</h6>
            {{ foodName }}
            <img src="../assets/logo.svg" v-show="isFavorite">
        </h2>
        <p>{{ foodDesc }}</p>
        <button @click="toggleFavorite">Favorite</button>
    </div>
</template>

<style>
img {
    height: 1.5em;
    float: right;
}
</style>