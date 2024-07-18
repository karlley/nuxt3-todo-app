<template>
  <div class="task-list">
    <div v-for="task in tasks" :key="task.id" class="task">
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
