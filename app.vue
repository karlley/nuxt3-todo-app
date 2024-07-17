<template>
  <div class="body">
    <h1>Todo App</h1>
    <div v-for="task in tasks" :id="task.id" class="card">
      <ul>
        <li>Status: {{ task.status }}</li>
        <li>Title: {{ task.title }}</li>
        <li>Created At: {{ task.created_at.toLocaleDateString() }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

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
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  border: 1px solid black;
  width: 250px;
  margin-bottom: 20px;
}

.card ul {
  list-style-type: none;
}

.card li {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>