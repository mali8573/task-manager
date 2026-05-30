<template>
  <div class="d-flex align-center py-2" style="width: 100%">
    <div style="flex: 1; min-width: 0">
      <span class="text-subtitle-1 font-weight-medium">{{ task.title }}</span>
    </div>

    <div class="d-flex justify-center align-center" style="flex: 1">
      <v-chip :color="getStatusColor(task.status)" size="small">
        <v-icon start size="x-small">
          {{ getStatusIcon(task.status) }}
        </v-icon>
        {{ task.status }}
      </v-chip>
    </div>

    <div
      style="width: 160px; display: flex; justify-content: flex-end; align-items: center; gap: 4px"
    >
      <v-btn
        v-if="task.status !== statusConstants.COMPLETED"
        color="primary"
        variant="tonal"
        size="small"
        @click="handleComplete"
      >
        {{ actionLabel }}
      </v-btn>

      <v-btn
        variant="tonal"
        color="red-darken-2"
        size="small"
        @click="handleDelete"
        class="text-capitalize"
        prepend-icon="mdi-trash-can-outline"
      >
        Delete
      </v-btn>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  statusConstants: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})
const emit = defineEmits(['deleteTask', 'updateStatus'])
const actionLabels = computed(() => ({
  [props.statusConstants.TO_DO]: 'start',
  [props.statusConstants.IN_PROGRESS]: 'to complete',
  [props.statusConstants.COMPLETED]: 'completed',
}))
const actionLabel = computed(() => {
  return actionLabels.value[props.task.status]
})
const handleDelete = () => {
  emit('deleteTask', props.task.id)
}

const handleComplete = () => {
  emit('updateStatus', props.task.id)
}
const getStatusIcon = (status) => {
  const icons = {
    [props.statusConstants.TO_DO]: 'mdi-play',
    [props.statusConstants.IN_PROGRESS]: 'mdi-clock-outline',
    [props.statusConstants.COMPLETED]: 'mdi-check',
  }
  return icons[status] || 'mdi-help'
}
const getStatusColor = (status) => {
  const statusColors = {
    [props.statusConstants.TO_DO]: 'blue',
    [props.statusConstants.IN_PROGRESS]: 'orange',
    [props.statusConstants.COMPLETED]: 'green',
  }
  return statusColors[status] || 'grey'
}
</script>

