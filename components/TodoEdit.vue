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
import { useRoute, useRouter } from 'vue-router';

type Todo = {
  id: number;
  status: 'pending' | 'working' | 'completed';
  title: string;
}

type InputForm = {
  title: string;
  status: 'pending' | 'working' | 'completed';
}

//idパラメータ取得
const route = useRoute();
const selectedTodoId = Number(route.params.id);

//対象todo取得
const todos = useStorage<Todo[]>('todos', [])
const todo = todos.value.find((todo) => todo.id === selectedTodoId);

//フォームに対象todoの値をセット
const inputForm = reactive<InputForm>({
  title: todo?.title ?? '',
  status: todo?.status ?? 'pending'
})

const router = useRouter();

const updateTodo = (): void => {
  const index = todos.value.findIndex((todo) => todo.id === selectedTodoId);
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
