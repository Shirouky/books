<template>
  <body>
    <div id="app">
      <div class="container mt-5">
        <h1>Список книг нашей блиотеки</h1>
        <router-link to="/">Главная</router-link>
      </div>
      <div class="container mt-5">
        <input type="text" placeholder="Email" v-model="email" />
        <input type="text" placeholder="Password" v-model="password" />
        <button @click="login()">Войти</button>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  name: "LoginView",
  methods: {
    login() {
      const data = {
        email: this.email,
        password: this.password,
        device_name: navigator.userAgent,
      };
      this.$store.dispatch("LOGIN", data).then(() => {
        this.$router.push({ name: "home" }).catch((err) => {
          console.log(err);
        });
      });
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>
