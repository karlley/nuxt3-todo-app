<template>
  <div class="body">
    <h1>Todo App</h1>
    <div class="card">
      <ul>
        <li>Status: Pending</li>
        <li>Title: タスク1</li>
        <li>Created At: 2024/7/17</li>
      </ul>
    </div>
    <div class="card">
      <ul>
        <li>Status: Working</li>
        <li>Title: タスク2</li>
        <li>Created At: 2024/7/18</li>
      </ul>
    </div>
    <div class="card">
      <ul>
        <li>Status: Completed</li>
        <li>Title: タスク3</li>
        <li>Created At: 2024/7/19</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
.body {
  display: flex;
  flex-direction: column; /* 縦に並べる */
  //justify-content: center; /* 縦方向の中央揃え */
  align-items: center; /* 横方向の中央揃え */
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