/* This is the pinia store of user */

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const store = defineStore('user', () => {
    // User
    const token = ref(null)
    const userInfo = ref(null)
    const setToken = (newToken) => {
        token.value = newToken
    }
    const setUserInfo = (newUserInfo) => {
        userInfo.value = newUserInfo
    }

    /* // Building
    const original = ref([{ title: 'Card 1' }, { title: 'Card 2' }, { title: 'Card 3' }])
    const favourite = ref([])
    const addToFavourite = (index) => {
        favourite.value.push(original.value[index])
        original.value.splice(index, 1)
    }
    const cancelFavourite = (index) => {
        original.value.push(favourite.value[index])
        favourite.value.splice(index, 1)
    } */

    return {
        token,
        userInfo,
        setToken,
        setUserInfo,

        /* original,
        favourite,
        addToFavourite,
        cancelFavourite, */
    }
}, {
    persist: {
        storage: sessionStorage,
    },
}
)
