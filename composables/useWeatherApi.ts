import { ref } from 'vue'
import axios from 'axios'

interface WeatherData {
  list: Array<{
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    sys: {
      country: string
    }
  }>
}

export function useWeatherApi() {
  const config = useRuntimeConfig()
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const weatherData = ref<WeatherData | null>(null)

  const apiWithApiKey = axios.create({
    baseURL: config.public.WEATHER_API_BASE_URL,
    params: {
      apiKey: config.public.WEATHER_API_KEY,
      units: 'metric'
    }
  })  

  const fetchWeatherByCity = async (city: string) => {
    loading.value = true
    error.value = null
    
    try {
      const { data } = await apiWithApiKey.get(`find`, { params: {q: city, type: 'like'} })
      weatherData.value = data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Что-то пошло не так при получении погоды'
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    weatherData,
    fetchWeatherByCity
  }
}