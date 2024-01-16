<script setup>
import { useNoteStore } from '../../stores/NoteStore';

const noteStore = useNoteStore();


</script>

<template>
  <div class="container">
    <header>
      <h1>Notes</h1>
      <button @click="noteStore.modal = true">+</button>
    </header>
  </div>
</template>

<style scoped>
.container {
  max-width: 1108px;
  padding: 10px;
  margin: 0 auto;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

h1 {
  font-weight: bold;
  font-size: 75px;
}

header button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;

  border: none;
  border-radius: 100%;

  padding: 16px;
  margin-right: 16px;
  width: 50px;
  height: 50px;
  cursor: pointer;

  background-color: darkcyan;
  color: white;
}

header button:hover {
  background-color: rgb(12, 179, 179);
}
</style>
