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
  },
  mutations: {
    createTodo(state, text) {
      console.log(text);
      return state.todos.push({ text, isDone: false });
    },
  },
});
