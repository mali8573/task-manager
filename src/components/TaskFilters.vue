<template>
  <v-card class="pa-4 mb-4">
    <v-row align="center">
      <v-col cols="12" md="12">
        <h2 class="text-h3 font-weight-bold mb-0">Filters</h2>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchQuery"
          label="Search"
          variant="outlined"
          density="compact"
          hide-details
          prepend-inner-icon="mdi-magnify"
          @input="handleSearch"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="Filter by Category"
          variant="outlined"
          density="compact"
          hide-details
          clearable
          @update:model-value="handleCategory"
        ></v-select>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  categories: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const emit = defineEmits(['update-search', 'update-category'])
const searchQuery = ref('')
const selectedCategory = ref(props.categories[0] || 'All')
const handleSearch = (event) => {
  emit('update-search', searchQuery.value)
}
const handleCategory = (selected) => {
  const categoryToFilter = selected || 'All'
  emit('update-category', categoryToFilter)
}
</script>

