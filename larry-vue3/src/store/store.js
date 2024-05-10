/* This is the pinia store of user */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const store = defineStore('user', () => {

    // Variables:
    // User
    const token = ref(null)
    const userInfo = ref(null)
    // Test an user contains building array
    const userInfoWithBuilding = ref(null)
    // Building arrays from the 'userInfoWithBuilding'
    const original = ref([])// This is the original building array
    const favourite = ref([]) // This is the favourite building array

    // Functions:
    const setToken = (newToken) => {
        token.value = newToken
    }
    const setUserInfo = (newUserInfo) => {
        userInfo.value = newUserInfo
    }
    // Test the building array witin the user
    const setUserInfoWithBuilding = (newUserInfo2) => {
        userInfoWithBuilding.value = newUserInfo2
    }
    // Split the original and favourite building arrays
    const setOriginalAndFavourite = () => {
        if (userInfoWithBuilding.value && userInfoWithBuilding.value.favoriteBuildings) {
            original.value = userInfoWithBuilding.value.favoriteBuildings.filter(building => !building.isFavorite)
            favourite.value = userInfoWithBuilding.value.favoriteBuildings.filter(building => building.isFavorite)
        }
        console.log("Method has been called")
    }

    const addToFavourite = (index) => {
        const building = original.value[index]
        const userId = userInfoWithBuilding.value._id
        console.log("@@@Building: ", building)
        console.log("@@@Building ID: ", building._id)
        console.log("@@@User ID: ", userId)
        // Update the isFavorite field of the building to true
        axios.put(`http://localhost:3000/add-to-favorite/${userId}/${building._id}`)
            .then(() => {
                favourite.value.push(building)
                original.value.splice(index, 1)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const cancelFavourite = (index) => {
        const building = favourite.value[index]
        const userId = userInfoWithBuilding.value._id
        console.log("@@@Building: ", building)
        console.log("@@@Building ID: ", building._id)
        console.log("@@@User ID: ", userId)
        // Update the isFavorite field of the building to false
        axios.put(`http://localhost:3000/cancel-favorite/${userId}/${building._id}`)
            .then(response => {
                original.value.push(building)
                favourite.value.splice(index, 1)
            })
            .catch(error => {
                console.error(error)
            })
    }


    return {
        // Return all the variables
        token,
        userInfo,
        userInfoWithBuilding,
        original,
        favourite,

        // Return all the functions
        setToken,
        setUserInfo,
        setUserInfoWithBuilding,
        setOriginalAndFavourite,
        addToFavourite,
        cancelFavourite
    }
}, {
    persist: {
        storage: sessionStorage,
    },
}
)
