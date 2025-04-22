<template>
  <div class="weather-inner" v-if="weatherData">
    <div class="current-weather">
      <div class="current-weather__city">
        <h1>{{ weatherData.name }}, {{ weatherData.sys.country }}</h1>
      </div>
      <div class="current-weather__date">
        <p>{{ formatDate(weatherData.current.dt) }}</p>
      </div>
      <div class="current-weather__description">
        <p>{{ weatherData.weather[0].main }}</p>
      </div>
      <div class="current-weather__temperature">
        <p>{{ formatTemperature(weatherData.main.temp) }}</p>
      </div>
      <div class="details__item pressure">
        <div class="details__name">Max and Min temperature</div>
        <div class="details__value">{{ formatTemperature(weatherData.main.temp_max) }}</div>
        <div class="details__value">{{ formatTemperature(weatherData.main.temp_min) }}</div>
      </div>
    </div>
    <div class="details">
      <div class="details__row">
        <div class="details__items pressure">
          <div class="details__value">1000</div>
          <div class="details__label">Давление</div>
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
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  
  return localDate.toLocaleString('ru-RU', options)
}
</script>
