<template>
  <div class="wrapper">
    <div>
      <NuxtLink :to="`/todos/new`">
        <button>New</button>
      </NuxtLink>
      <button @click="resetTodos">Reset</button>
      <NuxtLink :to="`/weather`">
        <button>Weather</button>
      </NuxtLink>
    </div>
    <div v-if="todos.length" class="sort">
      <label>
        <span>pending</span>
        <input v-model="pending" type="checkbox" checked >
      </label>
      <label>
        <span>working</span>
        <input v-model="working" type="checkbox" checked >
      </label>
      <label>
        <span>completed</span>
        <input v-model="completed" type="checkbox" checked >
      </label>
    </div>
    <div v-if="filteredTodos.length">
      <div v-for="todo in filteredTodos" :key="todo.id" class="todo">
        <NuxtLink :to="`/todos/${todo.id}`" class="link">
        <ul>
          <li>Status: <span :style="getStatusColor(todo.status)">{{ todo.status }}</span></li>
          <li>Title: {{ todo.title }}</li>
        </ul>
        </NuxtLink>
        <div class="todo-button">
          <NuxtLink :to="`/todos/${todo.id}/edit`">
            <button>Edit</button>
          </NuxtLink>
          <button @click="openModal(todo.id)">Delete</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Todo not found.</p>
    </div>
  </div>
  <ComfirmModal v-if="isModalOpen" @close-modal="closeModal" @handle-confirm="handleConfirm"/>
</template>

<script setup lang="ts">
import { useTodo } from '~/composables/useTodo'
import { useModal } from '~/composables/useModal'
import { useRoute, useRouter } from 'vue-router'

const { todos, pending, working, completed, getTodos,resetTodos, deleteTodo, getStatusColor, filteredTodos, keepSortQuery, updateSortQuery } = useTodo();
const { selectedTodoId, isModalOpen, openModal, closeModal  } = useModal();
const route = useRoute();
const router = useRouter();

const handleConfirm = () => {
  deleteTodo(selectedTodoId.value);
  closeModal();
};

onMounted(() => {
  keepSortQuery(route, router)
  getTodos();
})

//チェックボックスのソート状態変更時にクエリを連結
watch([pending, working, completed], () => {
  updateSortQuery(router)
})
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper button {
  background: inherit;
  padding: 5px 10px;
  border: 1px solid black;
  margin: 30px 20px;
}

.sort {
  margin: 30px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.sort label {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
}

.link {
  text-decoration: none;
  color: inherit; /* 親要素から色を継承 */
}

.todo {
  border: 1px solid black;
  width: 250px;
  margin-bottom: 30px;
}

.todo ul {
  list-style-type: none;
  margin: 0;
}

.todo li {
  margin: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

.todo-button {
  display: flex;
  justify-content: space-around;
}

.todo-button button {
  margin: 10px;
}
</style>
