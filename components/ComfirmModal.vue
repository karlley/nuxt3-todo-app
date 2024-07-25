<template>
  <div class="wrapper modal-overlay">
    <div class="modal-content">
      <p>Are you sure ?</p>
      <button @click="emit('closeModal')">No</button>
      <button @click="emit('handleConfirm')">Yes</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (event: 'closeModal' | 'handleConfirm'): void
}>()
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  max-width: 50%;
  width: 100%;
  text-align: center;
}
</style>