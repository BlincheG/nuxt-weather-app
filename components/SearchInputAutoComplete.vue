<template>
  <div class="relative">
    <input 
      type="text"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Введите название города"
      v-model="inputWithDebounce"
    />
    <ul 
      v-if="showDropdown" 
      class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <li 
        v-for="(city, index) in cities" 
        :key="index"
        class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        @click="onClickCity(city)"
      >
        {{ city.name }}, {{ city.sys.country }}
      </li>
      <li 
        v-if="cities?.length === 0"
        class="px-4 py-2 hover:bg-gray-100"
      >
        Not found
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from '#imports'
import type { SearchCityItem } from '../pages/index.vue';

defineProps<{
  cities?: SearchCityItem[]
  showDropdown: boolean;
}>()

const emit = defineEmits<{
  (e: 'searchCityInput', value: string): void,
  (e: 'citySelected', value: SearchCityItem): void
}>()

const route = useRoute();

const input = ref<string>(route.query.city as string ?? '');
const timeout = ref<ReturnType<typeof setTimeout>>();


const onClickCity = (city: SearchCityItem) => {
  input.value = city?.name
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
      emit('searchCityInput', value)
    }, 300)
  }
})
</script>
