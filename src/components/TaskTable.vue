<template>
  <v-card class="mb-4">
    <v-card-title class="text-h6 pa-4">Tasks</v-card-title>

    <v-data-table
      :items="tableItems"
      :headers="headers"
      :group-by="[{ key: 'category' }]"
      hide-default-header
      class="elevation-0 bg-transparent"
    >
      <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
        <tr @click="toggleGroup(item)" class="bg-grey-lighten-4 w-100" style="cursor: pointer">
          <td :colspan="columns.length" class="py-2">
            <div class="d-flex align-center">
              <v-icon class="mr-1">
                {{ isGroupOpen(item) ? 'mdi-chevron-down' : 'mdi-chevron-right' }}
              </v-icon>
              <v-icon class="mr-2" color="grey-darken-1">
                {{ getCategoryIcon(item.value) }}
              </v-icon>
              <strong class="text-subtitle-1 text-grey-darken-2">{{ item.value }}</strong>
              <span class="text-subtitle-1 text-grey ml-2">
( {{ getCategoryTaskCount(item.value) }} tasks )            </span>
            </div>

          </td>
        </tr>
      </template>

      <template v-slot:item="{ item }">
        <tr v-if="item.isEmpty">
          <td colspan="3" class="text-center py-4 text-grey">
            There are no tasks in this category.
          </td>
        </tr>
        <tr v-else>
          <td colspan="3">
            <TaskRow
              :task="item"
              :status-constants="statusConstants"
              @deleteTask="handleDelete"
              @updateStatus="handleComplete"
            />
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>
<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue'
import TaskRow from './TaskRow.vue'
const headers = [
  { title: 'title', key: 'title', width: '50%' },
  { title: 'Status', key: 'status', align: 'center', width: '25%' },
  { title: 'Actions', key: 'actions', align: 'end', width: '25%' },
]
const groupBy = [{ key: 'category', order: 'asc' }]
const props = defineProps({
  tasks: {
    type: Array,
    required: true,
    default: () => [],
  },
  categories: {
    type: Array,
    required: true,
    default: () => [],
  },
  statusConstants: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})

const tableItems = computed(() => {
  let result = []
  props.categories.forEach((cat) => {
    const filtered = props.tasks.filter((t) => t.category === cat)
    if (filtered.length > 0) {
      result.push(...filtered.map((t) => ({ ...t, category: cat, isEmpty: false })))
    } else {
      result.push({ category: cat, isEmpty: true })
    }
  })
  return result
})
const getCategoryTaskCount = (categoryValue) => {
  return tableItems.value.filter((i) => i.category === categoryValue && !i.isEmpty).length
}
const getCategoryIcon = (category) => {
  const icons = {
    Work: 'mdi-briefcase-variant',
    Personal: 'mdi-account',
    Shopping: 'mdi-cart',
    Studies: 'mdi-book-open-variant',
  }
  return icons[category] || 'mdi-folder'
}
const emit = defineEmits(['deleteTask', 'updateStatus'])
const handleDelete = (id) => {
  emit('deleteTask', id)
}
const handleComplete = (id) => {
  emit('updateStatus', id)
}
</script>

