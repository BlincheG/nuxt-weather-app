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
        <p>{{ Math.floor(weatherData.main.temp - 273.15) }}</p>
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

defineProps<{
  weatherData: WeatherData;
}>()
</script>
