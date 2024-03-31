<!-- This is the user page -->

<script setup>
// Import the store
import { store } from '@/store/store'

// Get pinia store
const userStore = store()

</script>

<template>

    <h1>This is User page</h1>
    <h2>Welcome, {{ userStore.userInfo.username }}</h2>
    <h2>Email: {{ userStore.userInfo.email }}</h2>

</template>