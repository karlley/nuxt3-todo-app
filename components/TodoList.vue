<template>
  <div class="task-list">
    <div v-for="task in tasks" :key="task.id" class="task">
      <ul>
        <li>Status: {{ task.status }}</li>
        <li>Title: {{ task.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core';

const tasks = useStorage('tasks', [
  {
    id: 1,
    status: 'pending',
    title: 'タスク1',
  },
  {
    id: 2,
    status: 'working',
    title: 'タスク2',
  },
  {
    id: 3,
    status: 'completed',
    title: 'タスク3',
  }
]);
</script>

<style>
.task-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.task {
  border: 1px solid black;
  width: 250px;
  margin-bottom: 20px;
}

.task ul {
  list-style-type: none;
}

.task li {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
