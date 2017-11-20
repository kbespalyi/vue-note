<template lang='pug'>
body
  .notes.row
    .column.column-20.sidebar
      h5.notes-title
        a(href='#' @click="addNote") +
      transition-group(name="flip-list" tag="ul")
        li(v-for="note in notes"
        :key="note.id"
        :class="{ active: note === selected }"
        @click="selectNote(note)") {{ note.body }}
    .column.column-80(style='position: relative')
      transition(name="fade" appear)
        editor(v-if='selected' v-model='selected.body' :key="selected.id")
</template>

<script>
import guid from '../utils/guid';

require("milligram");

const { chrome } = window;
const SKEY = "ZENOTES";

const component = {
  data: () => {
    return {
      notes: [ ],
      selected: undefined
    };
  },
  mounted: function() {
    const vm = this;
    loadNotes(this);
    vm.$watch(
      watchable.bind(this),
      onChange.bind(this),
      { deep: true }
    );
  },
  methods: { addNote, selectNote }
};

export default component;

function watchable() {
  if (!this.selected) return undefined;
  return { id: this.selected.id, body: this.selected.body };
}

function onChange(val, prev) {
  if (!prev) return;
  if (val.id === prev.id && val.body !== prev.body) {
    const ind = this.notes.findIndex((x) => x.id === val.id);
    if (ind > 0) {
      const el = this.notes[ind];
      this.notes.splice(ind, 1);
      this.notes = [el, ...this.notes];
    }
    save(this.notes);
  }
}

function selectNote(note) {
  if (note === this.selected) return;

  this.selected = note;

  if (this.notes.some((n) => !n.body)) {
    this.notes = this.notes.filter((note) => !!note.body);
    save(this.notes);
  }
}

function addNote() {
  const note = { id: guid(), body: '# ' };
  this.notes.unshift(note);
  this.selectNote(note);
  save(this.notes);
}

function save(notes) {
  if (!notes) return;
  chrome.storage.sync.set({[SKEY]: notes});
}

function loadNotes(vm) {
  chrome.storage.sync.get(SKEY, ({ [SKEY]: list = [] }) => {
    vm.notes.push(...list);
    vm.selectNote(list[0]);
  });
}

</script>

<style src="../../style/App.sass" lang='sass'></style>
