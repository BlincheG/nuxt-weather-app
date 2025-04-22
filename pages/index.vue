<template>
  <div class="weather">
    <h1>Прогноз погоды</h1>
    <div class="temperature-switch">
      <button 
        :class="{ active: units === 'metric' }" 
        @click="units = 'metric'"
      >°C</button>
      <button 
        :class="{ active: units === 'imperial' }" 
        @click="units = 'imperial'"
      >°F</button>
    </div>
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
      :units="units"
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

const units = ref('metric')
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
    weatherResponse.value = {...weatherData.value.data, ...city}
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
