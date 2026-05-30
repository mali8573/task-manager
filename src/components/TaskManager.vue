<template>
  <v-container class="max-width-800">
    <v-card elevation="3" class="bg-grey-lighten-4">
      <div class="bg-primary pa-2 d-flex align-center justify-st" style="background-color: #673ab7">
        <div class="d-flex align-center" style="width: auto">
          <v-icon color="white" class="mr-1" size="20">mdi-checkbox-marked-outline</v-icon>
          <span class="text-white font-weight-bold" style="font-size: 14px; letter-spacing: 0.5px">
            Task Manager
          </span>
        </div>
      </div>

      <div class="pa-4">
        <TaskInput :categories="Object.values(taskStore.CATEGORIES)" @add-task="handleAddTask" />
        <TaskFilters
          :categories="['All', ...Object.values(taskStore.CATEGORIES)]"
          @update-search="handleSearch"
          @update-category="handleCategory"
        />
        <v-divider class="my-4"></v-divider>
        <TaskTable
          :tasks="filteredTasks"
          :categories="Object.values(taskStore.CATEGORIES)"
          :status-constants="STATUS"
          @deleteTask="handleDelete"
          @updateStatus="handleUpdate"
        />
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { useTaskStore } from '../stores/taskStore'
import TaskTable from './TaskTable.vue'
import TaskInput from './TaskInput.vue'
import TaskFilters from './TaskFilters.vue'
import { computed } from 'vue'
const taskStore = useTaskStore()
const STATUS = taskStore.STATUS
const filteredTasks = computed(() => taskStore.filteredTasks)
const handleAddTask = (task) => {
  taskStore.addTask(task.title, task.category)
}

const handleSearch = (query) => {
  taskStore.searchQuery = query
}

const handleCategory = (category) => {
  taskStore.filterCategory = category
}

const handleDelete = (id) => {
  taskStore.deleteTask(id)
}

const handleUpdate = (id) => {
  taskStore.advanceTaskStatus(id)
}
</script>

