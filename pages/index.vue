<template>
  <div>
    <h1>Todo App</h1>
    <TaskList />
  </div>
</template>

<script setup lang="ts">
import TaskList from './TaskList.vue'
</script>

<style>
h1 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
