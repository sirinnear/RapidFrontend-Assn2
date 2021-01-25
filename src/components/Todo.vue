<template>
<div>
    <section class="todoapp">
        <header class="header">
            <h1>{{ title }}</h1>
            <input class="new-todo" placeholder="What needs to be done?" @keyup.enter="createTodo" autofocus>
        </header>

        <!-- This section should be hidden by default and shown when there are todos -->
        <section class="main" v-if="allTodos.length">
            <input id="toggle-all" class="toggle-all" type="checkbox">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                <!-- These are here just to show the structure of the list items -->
                <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
<!--                <li class="completed">-->
<!--                    <div class="view">-->
<!--                        <input class="toggle" type="checkbox" checked>-->
<!--                        <label>Taste JavaScript</label>-->
<!--                        <button class="destroy"></button>-->
<!--                    </div>-->
<!--                    <input class="edit" value="Create a TodoMVC template">-->
<!--                </li>-->
                <li v-for="(todo, idx) in allTodos" :class="{ completed: getDoneStatus(idx), editing: idx === editing}">
                    <div class="view">
                        <input class="toggle" type="checkbox" v-model="todo.isDone">
                        <label @dblclick="startEditing(idx)">{{ todo.text }}</label>
                        <button class="destroy" @click="destroyTodo(idx)"></button>
                    </div>
<!--                    <input class="edit"-->
<!--                           @keyup.esc="cancelEditing"-->
<!--                           @keyup.enter="finishEditing"-->
<!--                           @blur="finishEditing"-->
<!--                           :value="todo.text"-->
<!--                    >-->
                </li>
            </ul>
        </section>
        <!-- This footer should hidden by default and shown when there are todos -->
        <footer class="footer" v-if="allTodos.length">
            <!-- This should be `0 items left` by default -->
            <span class="todo-count"><strong> {{ activeTodos.length }}</strong> item(s) left</span>
            <!-- Remove this if you don't implement routing -->
            <ul class="filters">
                <li>
                    <a class="selected" href="#/">All</a>
                </li>
                <li>
                    <a href="#/active">Active</a>
                </li>
                <li>
                    <a href="#/completed">Completed</a>
                </li>
            </ul>
            <!-- Hidden if no completed items are left ↓ -->
            <button class="clear-completed" @click="clearCompleted()" v-show="completedTodos.length">Clear completed</button>
        </footer>
    </section>
    <footer class="info">
        <p>Double-click to edit a todo</p>
        <!-- Remove the below line ↓ -->
        <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
        <!-- Change this out with your name and url ↓ -->
        <p>Created by <a href="http://todomvc.com">you</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
</div>
</template>

<script>
const LOCAL_STORAGE_KEY = 'todo-app-vue';

export default {
  name: 'todo',
  data() {
    return {
      title: 'Todo Demo',
      todos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [
        { text: 'Learn JavaScript ES6+ goodies', isDone: true },
        { text: 'Learn Vue', isDone: false },
        { text: 'Build something awesome', isDone: false },
      ],
      editing: null,
    };
  },
  methods: {
    createTodo(event) {
      const textbox = event.target;
      this.$store.commit('createTodo', textbox.value.trim());
      textbox.value = '';
    },
    // startEditing(idx) {
    //   this.editing = idx;
    // },
    // finishEditing(event) {
    //   if (!this.editing) { return; }
    //   const textbox = event.target;
    //   this.$store.commit('editTodo', this.editing, textbox.value.trim());
    //   console.log(this.$store.state.todos);
    //   this.editing = null;
    // },
    // cancelEditing() {
    //   this.editing = null;
    // },
    destroyTodo(idx) {
      this.$store.commit('deleteTodo', idx);
    },
    clearCompleted() {
      this.$store.commit('clearCompleted');
    },
    getDoneStatus(idx) {
      return this.$store.state.todos[idx].isDone;
    },
  },
  computed: {
    allTodos() {
      return this.$store.state.todos;
    },
    activeTodos() {
      return this.$store.state.todos.filter((t) => !t.isDone);
    },
    completedTodos() {
      return this.$store.state.todos.filter((t) => t.isDone);
    },
  },
  watch: {
    // todos: {
    //   deep: true,
    //   handler(newValue) {
    //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
    //   },
    // },
  },
};
</script>
