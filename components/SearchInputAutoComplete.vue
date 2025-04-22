<template>
  <div>
    <input 
      type="text" 
      v-model="inputWithDebounce" 
      placeholder="Введите название города"
    />
    <ul v-if="cities?.length">
      <li v-for="(city, index) in cities" :key="index" @click="onClickCity(city)">
        {{ city }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  cities?: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue' | 'citySelected', value: string): void,
}>()

const input = ref('');
const timeout = ref(0);

const onClickCity = (city: string) => {
  input.value = city
  emit('citySelected', city)
}

const inputWithDebounce = computed({
  get() {
    return input.value
  },
  set(value: string) {
    if (timeout.value) {
      clearTimeout(timeout.value)
    }
    timeout.value = setTimeout(() => {
      input.value = value
      emit('update:modelValue', value)
    }, 300)
  }
})


</script>
