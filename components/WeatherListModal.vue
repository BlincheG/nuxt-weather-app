<template>
  <div v-if="weatherData" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
      <button 
        @click="$emit('close')" 
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>
        
        <div class="text-gray-600 mb-4">
          {{ formatDate(weatherData.current.dt) }}
        </div>

        <div class="text-5xl font-bold text-gray-900 mb-6">
          <img 
            :src="`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`" 
            :alt="weatherData.weather[0].description"
            class="inline-block mr-2 h-8 w-8"
          />
          <span class="text-5xl font-bold text-gray-900 mb-6">
            {{ formatTemperature(weatherData.main.temp) }}
          </span>
        </div>

        <div class="flex justify-between text-gray-700 text-lg">
          <div>
            <div class="font-medium">Мин.</div>
            <div>{{ formatTemperature(weatherData.main.temp_min) }}°</div>
          </div>
          <div>
            <div class="font-medium">Макс.</div> 
            <div>{{ formatTemperature(weatherData.main.temp_max) }}°</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface WeatherData {
  name: string;
  current: {
    dt: number;
  }
  sys: {
    country: string;
  };
  weather: Array<{
    main: string;
  }>;
  main: {
    temp: number;
  };
  timezone_offset: number;
}

const props = defineProps<{
  weatherData: WeatherData;
  units?: 'metric' | 'imperial';
}>()

const formatTemperature = (temp: number) => {
  if (props.units === 'imperial') {
    return `${Math.round(((temp) * 9/5) + 32)}°F`
  }
  return `${Math.round(temp)}°C`
}

const formatDate = (date: number) => {
  const timestamp = date * 1000
  
  const localDate = new Date(timestamp)
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }
  
  return localDate.toLocaleString('ru-RU', options)
}
</script>
