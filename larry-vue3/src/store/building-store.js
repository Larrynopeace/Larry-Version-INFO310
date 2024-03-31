// This is the store for the building card component

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const store = defineStore('building', () => {
    const original = ref([{ title: 'Card 1' }, { title: 'Card 2' }, { title: 'Card 3' }])
    const favourite = ref([])

    const addToFavourite = (index) => {
        favourite.value.push(original.value[index])
        original.value.splice(index, 1)
    }

    const cancelFavourite = (index) => {
        original.value.push(favourite.value[index])
        favourite.value.splice(index, 1)
    }

    return {
        original,
        favourite,
        addToFavourite,
        cancelFavourite
    }
}, {
    persist: {
        storage: sessionStorage,
    },
}
)