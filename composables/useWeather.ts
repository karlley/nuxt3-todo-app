import { ref } from 'vue'
import axios from 'axios';
import type { Weather } from '~/types/types'

const config = useRuntimeConfig();
const API_KEY = config.public.openWeatherApiKey;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const city = 'Fukuoka';
const weather = ref<Weather | null>(null);
const iconUrl = ref<string>('');

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

export const useWeather = () => ({
    weather,
    iconUrl,
    fetchWeather,
})
