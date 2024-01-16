<script setup>
import { useNoteStore } from '../stores/NoteStore';

const noteStore = useNoteStore();
import { ref, watch } from 'vue';

// const modal = noteStore.modal;

const noteText = ref('');
const error = ref(false);
const enteredLetterLength = ref(0);

watch(noteText, () => {
  enteredLetterLength.value = noteText.value.length;
});

const handleNewNote = () => {
  if (noteText.value.length <= 3) {
    error.value = true;
    return;
  }
  noteStore.AddNote({
    id: Math.floor(Math.random() * 100000000000),
    text: noteText.value,
    date: new Date().toLocaleDateString('en-UK'),
    color: noteStore.GetRandomColor(),
  });
  noteText.value = '';
  error.value = false;
  noteStore.modal = false;
};
</script>

<template>
  <div v-if="noteStore.modal" class="overlay">
    <div v-if="noteStore.modal" class="modal">
      <textarea
        v-model.trim="noteText"
        name="note"
        id="note"
        cols="30"
        rows="20"
        maxlength="200"></textarea>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
        <p>{{ enteredLetterLength }} / 200</p>
        <div style="display: flex; gap: 4px">
          <p>clear note</p>
          <i @click="noteText = ''" class="material-icons">delete </i>
        </div>
      </div>
      <p class="error-text" v-if="error">
        Note needs to be 3 characters or more (spaces not included!)
      </p>
      <button @click="handleNewNote" class="add-btn">Add Note</button>
      <button @click="noteStore.modal = false" class="close-btn">Close</button>
    </div>
  </div>
</template>

<style scoped>
.material-icons {
  margin-top: 8px;
  cursor: pointer;
}
.material-icons:hover {
  color: rgb(159, 32, 32);
}

.overlay {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  width: 500px;
  height: 65vh;
  padding: 30px;
  background-color: white;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  position: relative;
}

.modal p {
  margin-top: 8px;
}

textarea {
  font: inherit;
  padding: 16px;
  font-weight: 500;
  resize: none;
  font-size: 16px;
}

.error-text {
  color: rgb(163, 7, 7);
}

.add-btn {
  padding: 8px 16px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  background-color: rgb(115, 20, 205);
  color: white;
  cursor: pointer;
  margin-top: 15px;
}

.close-btn {
  padding: 8px 16px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  background-color: rgb(163, 7, 7);
  color: white;
  margin-top: 8px;
  cursor: pointer;
}
@media (max-width: 850px) {
  .modal {
    width: 75%;
    padding: 30px;
    background-color: white;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    position: relative;
  }
}
</style>
