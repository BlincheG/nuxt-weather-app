<template>
  <div class="weather">
    <h1>Прогноз погоды</h1>
    <SearchInputAutoComplete :cities="cities" :inputWithDebounce="inputWithDebounce" @citySelected="onCitySelected" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const cities = ref(['Москва', 'Питер'])
const inputWithDebounce = ref('')

const onCitySelected = (city: string) => {
  console.log(city)
}
</script>
