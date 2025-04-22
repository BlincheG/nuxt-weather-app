import { ref } from 'vue'
import axios from 'axios'

interface WeatherData {
  temperature: number
  description: string
}

export function useWeatherApi() {
  const config = useRuntimeConfig()
  const loading = ref(false)
  const error = ref<string | null>(null)
  const weatherData = ref<WeatherData | null>(null)

  const apiWithApiKey = axios.create({
    baseURL: config.public.WEATHER_API_BASE_URL,
    params: {
      apiKey: config.public.WEATHER_API_KEY,
      units: 'metric'
    }
  })

  const apiWithAppId = axios.create({
    baseURL: config.public.WEATHER_API_BASE_URL,
    params: {
      appId: config.public.WEATHER_API_KEY,
      units: 'metric'
    }
  })
  

  const fetchWeatherByCity = async (city: string) => {
    loading.value = true
    error.value = null
    
    try {
      const data = await apiWithApiKey.get(`find`, { params: {q: city, type: 'like'} })
      weatherData.value = data
    } catch (e) {
      error.value = 'Что-то пошло не так при получении погоды'
    }
  }

  const fetchWeatherByCoordinates = async (lat: number, lon: number) => {
    loading.value = true
    error.value = null
    
    try {
      const data = await apiWithAppId.get(`onecall`, { params: {lat: lat, lon: lon, exclude: 'hourly,daily' } })
      weatherData.value = data
    } catch (e) {
      error.value = 'Что-то пошло не так при получении погоды'
    }
  }

  return {
    loading,
    error,
    weatherData,
    fetchWeatherByCity,
    fetchWeatherByCoordinates
  }
}