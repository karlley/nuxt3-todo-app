<template>
  <div>
    <h1>Todo App</h1>
    <todoList />
  </div>
</template>

<script setup lang="ts">
import todoList from './todos/todoList.vue'
</script>

<style>
h1 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
