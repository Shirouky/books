<template>
  <body>
    <div id="app">
      <div class="container mt-5">
        <h1>Список книг нашей блиотеки</h1>
        <router-link to="/">Главная</router-link>
        <router-link to="/admin">Админка</router-link>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Автор</th>
              <th scope="col">Наличие</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id">
              <th scope="row">{{ book.id }}</th>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>
                {{ book.availability ? "Доступна" : "Не доступна" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  name: "UserView",
  mounted() {
    this.$store.dispatch("LOAD_BOOKS");
  },
  computed: {
    books() {
      return this.$store.state.books;
    }
  },
};
</script>
