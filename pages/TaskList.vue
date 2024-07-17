<template>
  <div class="list">
    <div v-for="task in tasks" :key="task.id">
      <TaskCard :task="task" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TaskCard from './TaskCard.vue';

const tasks = ref([]);

onMounted(() => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks.value = JSON.parse(storedTasks);
  } else {
    tasks.value = [
      {
        id: 1,
        status: 'pending',
        title: 'タスク1',
        created_at: new Date('2024-7-17')
      },
      {
        id: 2,
        status: 'working',
        title: 'タスク2',
        created_at: new Date('2024-7-18')
      },
      {
        id: 1,
        status: 'completed',
        title: 'タスク3',
        created_at: new Date('2024-7-19')
      }
    ]
  }
})
</script>

<style>
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
