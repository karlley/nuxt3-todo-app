<template>
  <div :id="task.id" class="card">
    <ul>
      <li>Status: {{ task.status }}</li>
      <li>Title: {{ task.title }}</li>
      <li>Created At: {{ task.created_at.toLocaleDateString() }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// props変数は使用していないが問題ないらしい
const props = defineProps<{
  task: {
    id: number;
    status: string;
    title: string;
    created_at: Date;
  };
}>();

</script>

<style>
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
