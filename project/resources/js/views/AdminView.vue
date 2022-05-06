<template>
  <div class="container mt-5">
    <h1>Список книг нашей библиотеки</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Автор</th>
          <th scope="col">Наличие</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <th scope="row">{{ book.id }}</th>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>
            <button
              type="button"
              class="btn btn-outline-primary"
              v-on:click="changeBookAvailability(book.id)"
            >
              {{ book.availability ? "Доступна" : "Не доступна" }}
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-danger"
              v-on:click="deleteBook(book.id)"
            >
              Удалить
            </button>
          </td>
        </tr>

        <!-- Строка с полями для добавления новой книги -->
        <tr>
          <th scope="row">Добавить</th>
          <td>
            <input type="text" class="form-control" v-model="title" />
          </td>
          <td>
            <input type="text" class="form-control" v-model="author" />
          </td>
          <td></td>
          <td>
            <button
              type="button"
              class="btn btn-outline-success"
              v-on:click="addBook()"
            >
              Добавить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AdminView",
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
