<template>
  <div>
    <h2>List</h2>
    <TodoList />
  </div>
</template>

<script setup lang="ts">
// 未使用のmiddlewareの定義
// definePageMeta({
//   middleware: ['reset-sort'],
// })
</script>

<style>
h2 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
