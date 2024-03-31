<script setup>
const props = defineProps({
    title: String,
    onAddToFavourite: Function,
    onCancelFavourite: Function,
    navigateToTest: Function,
    isFavourite: Boolean,
})
</script>

<template>
    <div @click="props.navigateToTest()">
        <el-card class="hover-pointer" style="max-width: 300px; margin:20px " shadow="hover">
            <template #header>{{ title }}</template>
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                style="width: 100%" />
            <el-button @click.stop="isFavourite ? props.onCancelFavourite() : props.onAddToFavourite()">
                {{ isFavourite ? 'Cancel from Favourite' : 'Add to Favourite' }}
            </el-button>
        </el-card>
    </div>
</template>

<style scoped>
.hover-pointer {
    cursor: pointer;
}
</style>