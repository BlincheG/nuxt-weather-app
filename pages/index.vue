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
          class="mb-6"
          :show-dropdown="showDropdown"
          @city-selected="onCitySelected"
          @searchCityInput="citySearch"
        />

        <div v-if="loading" class="text-center py-4">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
          <p class="mt-2 text-gray-600">Поиск города в процессе...</p>
        </div>

        <WeatherListModal
          v-if="weatherResponse"
          :weather-data="weatherResponse"
          :units="units"
          @close="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, useRoute } from '#imports'

export interface SearchCityItem {
  id: number
  name: string
  coord: {
    lat: number
    lon: number
  }
  sys: {
    country: string
  }
}

export interface SearchCity extends SearchCityItem {
  dt: number
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
  main: {
    temp: number
    temp_min: number
    temp_max: number
    feels_like: number
    humidity: number
  }
  timezone_offset: number
}

interface WeatherApiResponse {
  list: SearchCity[]
}

const requestCache = new Map<string, SearchCityItem[]>()
const units = ref<'metric' | 'imperial'>('metric')
const cities = ref<SearchCityItem[]>([])
const weatherResponse = ref<SearchCity | null>(null)
const showDropdown = ref<boolean>(false)

const weatherApi = useWeatherApi()
const { loading, weatherData } = weatherApi

const route = useRoute()

const onCitySelected = async (city: SearchCityItem) => {
  weatherResponse.value = city as SearchCity
  showDropdown.value = false
  const router = useRouter()
  router.push({ query: { city: city.name, id: city.id } })
}

const citySearch = async(searchQuery: string) => {
  if (searchQuery.length <= 3) {
    cities.value = []
    return
  }
  
  const cacheKey = `search_${searchQuery}`
  
  if (requestCache.has(cacheKey)) {
    const cachedData = requestCache.get(cacheKey)
    if (cachedData) {
      cities.value = cachedData as SearchCityItem[]
    }
    return
  }

  const { error, fetchWeatherByCity } = weatherApi
  await fetchWeatherByCity(searchQuery)
  
  if (error.value) {
    console.error('Ошибка при поиске города:', error.value)
    return
  }

  const response = weatherData.value as WeatherApiResponse
  console.log(response)
  if (response?.list) {
    showDropdown.value = true
    cities.value = response.list
    requestCache.set(cacheKey, response.list)
  }
}

const closeModal = () => {
  weatherResponse.value = null
  const router = useRouter()
  router.push({ query: {} })

  if (cities.value.length > 0) {
    showDropdown.value = true
  }
}

onMounted(async () => {
  const cityParam = route.query.city as string
  const cityId = route.query.id

  if (!cityParam || !cityId) return

  try {
    await citySearch(cityParam)
    
    if (cities.value.length > 0) {
      const matchingCity = cities.value.find((c: SearchCityItem) => c.id.toString() === cityId)
      if (matchingCity) {
        onCitySelected(cities.value.find((c: SearchCityItem) => c.id === matchingCity.id) as SearchCityItem)
      } else {
        const router = useRouter()
        await router.push({ query: {} })
      }
    }
  } catch (error) {
    console.error('Ошибка:', error)
    const router = useRouter() 
    await router.push({ query: {} })
  }
})
</script>
