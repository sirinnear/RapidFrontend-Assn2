import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const LOCAL_STORAGE_KEY = 'todo-app-vue';
export default new Vuex.Store({
  state: {
    todos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [
      { text: 'Learn JavaScript ES6+ goodies', isDone: true },
      { text: 'Learn Vue', isDone: false },
      { text: 'Build something awesome', isDone: false },
    ],
    editing: null,
  },
  mutations: {
    createTodo(state, text) {
      return state.todos.push({ text, isDone: false });
    },
    editTodo(state, idx, newText) {
      state.todos[idx] = { text: newText, ...state.todos[idx] };
      console.log(state.todos[idx].text);
    },
    deleteTodo(state, idx) {
      return state.todos.splice(idx, 1);
    },
    clearCompleted(state) {
      state.todos = state.todos.filter((todo) => !todo.isDone);
    },
  },
});
