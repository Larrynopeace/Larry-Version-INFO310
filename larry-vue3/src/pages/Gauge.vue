<!-- This is the Guage page -->

<script setup>
import { onMounted } from 'vue';
import GaugeOfLibrary from '../components/GaugeOfLibrary.vue';
import GaugeOfGym from '../components/GaugeOfGym.vue';
import GaugeOfCafe from '../components/GaugeOfCafe.vue';
import GaugeOfUnipol from '../components/GaugeOfUnipol.vue';

onMounted(() => {
    /* console.log('@@@currentURL', currentURL) */

})

</script>

<template>
    <h1>This is the Gauge Page</h1>

    <el-card style="max-width: 100%; max-height: 600px; margin-top: 30px;">
        <div class="gauge-container">
            <GaugeOfLibrary id="library" />
            <GaugeOfGym id="gym" />
            <GaugeOfCafe id="cafe" />
        </div>
    </el-card>
    <el-card style="max-width: 100%; max-height: 600px; margin-top: 30px;">
        <div class="gauge-container">
            <GaugeOfUnipol id="unipol" class="gauge-item" />
        </div>
    </el-card>
</template>

<style scoped>
.gauge-container {
    display: flex;
    /* flex-wrap: wrap;
    justify-content: space-between; */
}
</style>