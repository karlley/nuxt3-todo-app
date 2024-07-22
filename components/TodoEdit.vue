<template>
  <div class="wrapper">
    <div>
      <p>Title: <input v-model="inputForm.title"></p>
      <p>Status:
        <select v-model="inputForm.status">
          <option>pending</option>
          <option>working</option>
          <option>completed</option>
        </select>
      </p>
    </div>
    <div>
      <NuxtLink :to="`/todos`">
        <button>Back</button>
      </NuxtLink>
      <button @click="updateTodo">Update</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

//idパラメータ取得
const route = useRoute();
const id = Number(route.params.id);

//対象todo取得
const todos = useStorage('todos', [])
const todo = todos.value.find((todo) => todo.id === id);

//フォームに対象todoの値をセット
const inputForm = reactive({
  title: todo.title,
  status: todo.status
})

const router = useRouter();

const updateTodo = () => {
  const index = todos.value.findIndex((todo) => todo.id === id);
  //findIndexの返り値でtodoの存在確認(アンマッチ時は-1)
  if (index !== -1) {
    //対象todoのプロパティを保持しながら更新
    todos.value[index] = {
      ...todos.value[index],
      title: inputForm.title,
      status: inputForm.status
    }
  }
  router.push('/todos');
}
</script>

<style>
</style>