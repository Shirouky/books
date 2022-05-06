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
    // Сразу после загрузки страницы подгружаем список книг и отображаем его
    this.loadBookList();
  },
  methods: {
    loadBookList() {
      axios.get("http://127.0.0.1:8000/api/book/all").then((response) => {
        this.books = response.data;
      });
    },
    addBook() {
      axios
        .post("http://127.0.0.1:8000/api/book/add", {
          title: this.title,
          author: this.author,
        })
        .then((response) => {
          this.books = response.data;
        });
    },
    deleteBook(id) {
      axios
        .get("http://127.0.0.1:8000/api/book/delete/" + String(id))
        .then((response) => {
          this.books = response.data;
        });
    },
    changeBookAvailability(id) {
      axios
        .get("http://127.0.0.1:8000/api/book/change_availability/" + String(id))
        .then((response) => {
          this.books = response.data;
        });
    },
  },
  data() {
    return {
      books: [],
      title: "",
      author: "",
    };
  },
};
</script>
