<template>
  <div class="list">
    <div v-for="task in tasks" :key="task.id" class="card">
      <ul>
        <li>Status: {{ task.status }}</li>
        <li>Title: {{ task.title }}</li>
        <li>Created At: {{ task.created_at.toLocaleDateString() }}</li>
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
    created_at: new Date('2024-7-17')
  },
  {
    id: 2,
    status: 'working',
    title: 'タスク2',
    created_at: new Date('2024-7-18')
  },
  {
    id: 3,
    status: 'completed',
    title: 'タスク3',
    created_at: new Date('2024-7-19')
  }
]);

//文字列から日付オブジェクトに変換
tasks.value = tasks.value.map(task => ({
  ...task, created_at: new Date(task.created_at)
}));
</script>

<style>
.list {
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
