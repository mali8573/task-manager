<template>
  <v-card class="pa-4 mb-4">
    <v-row align="start">
      <v-col cols="12" md="12">
        <h2 class="text-h3 font-weight-bold mb-0">Add New Task</h2>
      </v-col>
      <v-col cols="12" md="5">
        <v-text-field
          v-model="taskTitle"
          label="Task name"
          variant="outlined"
          density="compact"
          persistent-details
          :error-messages="errorMessage"
          @input="clearError"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="category"
          :items="categories"
          label="Category"
          variant="outlined"
          density="compact"
          hide-details="auto"
        ></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-btn color="#673AB7" block @click="handleAddTask" prepend-icon="mdi-plus" class="custom-add-btn"> Add </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
const emit = defineEmits(['add-task'])
const props = defineProps({
  categories: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const taskTitle = ref('')
const category = ref(props.categories[0])
const errorMessage = ref('')

const handleAddTask = () => {
  if (!taskTitle.value.trim()) {
    errorMessage.value = 'Title cannot be empty'
    return
  }
  emit('add-task', { title: taskTitle.value, category: category.value })
  taskTitle.value = ''
  errorMessage.value = ''
  category.value = props.categories[0]
}
const clearError = () => {
  errorMessage.value = ''
}
</script>
<style scoped>
.custom-add-btn {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.custom-add-btn:hover {
  background-color: #512DA8 !important; 
  transform: translateY(-2px); 
  cursor: pointer;
}
</style>
