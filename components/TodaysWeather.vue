<template>
  <div class="wrapper">
    <div v-if="weather">
      <div class="weather-icon"><img :src="iconUrl" :alt="weather.weather[0].description" ></div>
      <p><strong>Temperature:</strong> {{ weather.main.temp }} ℃</p>
      <p><strong>Wind Speed:</strong> {{ weather.wind.speed}} m/s</p>
    </div>
    <p v-else>Loading...</p>
    <div>
      <NuxtLink :to="`/todos`">
        <button>Back</button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWeather } from '~/composables/useWeather'

const { weather, iconUrl, fetchWeather } = useWeather();

onMounted(() => {
  fetchWeather();
});

</script>

<style>
.weather-icon {
  display: flex;
  justify-content: center;
}
</style>
