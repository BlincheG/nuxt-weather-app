<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Прогноз погоды</h1>
      
      <div class="bg-white rounded-xl shadow-md p-6 mb-6">
        <div class="flex justify-center mb-6">
          <div class="inline-flex rounded-lg bg-gray-100 p-1">
            <button 
              class="px-4 py-2 rounded-md transition-colors"
              :class="{ 'bg-white shadow text-blue-600': units === 'metric', 'text-gray-600 hover:text-gray-800': units !== 'metric' }" 
              @click="units = 'metric'"
            >
              °C
            </button>
            <button 
              class="px-4 py-2 rounded-md transition-colors"
              :class="{ 'bg-white shadow text-blue-600': units === 'imperial', 'text-gray-600 hover:text-gray-800': units !== 'imperial' }" 
              @click="units = 'imperial'"
            >
              °F
            </button>
          </div>
        </div>

        <SearchInputAutoComplete 
          :cities="cities" 
          :inputWithDebounce="inputWithDebounce"
          @citySelected="onCitySelected"
          @update:modelValue="citySearch"
          class="mb-6"
          :showDropdown="showDropdown"
        />

        <div v-if="loading" class="text-center py-4">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
          <p class="mt-2 text-gray-600">Поиск города в процессе...</p>
        </div>

        <WeatherListModal
          v-if="weatherResponse"
          :weatherData="weatherResponse" 
          :units="units"
          @close="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from '#imports'
import type { SearchCity, WeatherData, WeatherResponse } from '~/types'

const units = ref<'metric' | 'imperial'>('metric')
const { loading } = useWeatherApi()
const cities = ref<SearchCity[]>([])
const weatherResponse = ref<WeatherData | null>(null)
const inputWithDebounce = ref('')
const showDropdown = ref(false)

const onCitySelected = async (city: SearchCity) => {
  const { error, weatherData, fetchWeatherByCoordinates } = useWeatherApi()
  await fetchWeatherByCoordinates(city?.coord.lat, city?.coord.lon)

  if (error.value) {
    console.error('Ошибка при поиске города:', error.value)
    return
  }

  if (weatherData.value) {
    showDropdown.value = false
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

  const response = weatherData.value as unknown as WeatherResponse
  if (response?.data?.list) {
    showDropdown.value = true
    cities.value = response.data.list
  }
}

const closeModal = () => {
  weatherResponse.value = null
}
</script>
