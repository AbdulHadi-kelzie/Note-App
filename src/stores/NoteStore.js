import { defineStore } from 'pinia';

export const useNoteStore = defineStore('NoteStore', {
  state: () => ({
    notes: JSON.parse(localStorage.getItem('notes')) || [],
    modal: false,
    editNoteModal: false,
    selectedNote: null,
    originalText: ''
  }),
  getters: {},
  actions: {
    AddNote(note) {
      this.notes.push(note);
      this.updateLocalStorage();
    },
    EditNote(id, newText) {
      const noteIndex = this.notes.findIndex((note) => note.id === id);

      // Update the text of the note
      if (noteIndex !== -1) {
        // Update the text of the existing note
        this.notes[noteIndex].text = newText;
      }
      this.editNoteModal = false;
      this.updateLocalStorage();
    },
    DeleteNote(ID) {
      const noteID = this.notes.findIndex((note) => note.id === ID);
      this.notes.splice(noteID, 1);
      this.updateLocalStorage();
    },
    GetRandomColor() {
      return 'hsl(' + Math.random() * 360 + ', 100%, 90%)';
    },
    updateLocalStorage() {
      localStorage.setItem('notes', JSON.stringify(this.notes));
    },
  },
});
