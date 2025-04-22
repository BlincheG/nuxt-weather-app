<template>
  <div class="weather">
    <h1>Прогноз погоды</h1>
    <SearchInputAutoComplete 
      :cities="cities" 
      :inputWithDebounce="inputWithDebounce" 
      @citySelected="onCitySelected"
      @update:modelValue="citySearch"
    />
    <div v-if="loading">
      <p>Поиск города в процессе...</p>
    </div>
    <WeatherListModal
      :weatherData="weatherResponse" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface City {
  coord: {
    lat: number;
    lon: number;
  };
}

const { loading } = useWeatherApi()
const cities = ref(['Москва', 'Питер'])
const weatherResponse = ref(null)
const inputWithDebounce = ref('')

const onCitySelected = async (city: City) => {
  const { error, weatherData, fetchWeatherByCoordinates } = useWeatherApi()
  await fetchWeatherByCoordinates(city?.coord.lat, city?.coord.lon)

  if (error.value) {
    console.error('Ошибка при поиске города:', error.value)
    return
  }

  if (weatherData.value) {
    weatherResponse.value = weatherData.value.data.list[0]
  }
}

const citySearch = async(searchQuery: string) => {
  const { error, weatherData, fetchWeatherByCity } = useWeatherApi()
  await fetchWeatherByCity(searchQuery)
  
  if (error.value) {
    console.error('Ошибка при поиске города:', error.value)
    return
  }

  if (weatherData.value) {
    cities.value = weatherData.value.data.list
  }
}
</script>
