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
import { ref } from 'vue'
import axios from 'axios';

interface Weather {
  weather: { icon: string; description: string }[];
  main: { temp: number };
  wind: { speed: number };
}

const config = useRuntimeConfig();
const API_KEY = config.public.openWeatherApiKey;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const city = 'Fukuoka';
const weather = ref<Weather | null>(null);
const iconUrl = ref<string>('');

onMounted(() => {
  fetchWeather();
});

async function fetchWeather() {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        units: 'metric', //℃表示
        appid: API_KEY,
      },
    });
    weather.value = response.data;
    if (weather.value) {
      iconUrl.value = `https://openweathermap.org/img/wn/${weather.value.weather[0].icon}@2x.png`;
    }
  } catch (error) {
    console.error(error);
  }
}
</script>

<style>
.weather-icon {
  display: flex;
  justify-content: center;
}
</style>
