<template>
  <div class="weather-inner" v-if="weatherData">
    <div class="current-weather">
      <div class="current-weather__city">
        <h1>{{ weatherData.name }}, {{ weatherData.sys.country }}</h1>
      </div>
      <div class="current-weather__description">
        <p>{{ weatherData.weather[0].main }}</p>
      </div>
      <div class="current-weather__temperature">
        <p>{{ formatTemperature(weatherData.main.temp) }}</p>
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
  sys: {
    country: string;
  };
  weather: Array<{
    main: string;
  }>;
  main: {
    temp: number;
  };
}

const props = defineProps<{
  weatherData: WeatherData;
  units?: 'metric' | 'imperial';
}>()

const formatTemperature = (temp: number) => {
  if (props.units === 'imperial') {
    return `${Math.round(((temp - 273.15) * 9/5) + 32)}°F`
  }
  return `${Math.round(temp - 273.15)}°C`
}
</script>
