<template>
  <body>
    <div id="app">
      <div class="container mt-5">
        <h1>Регистрация</h1>
        <router-link to="/login">Вход</router-link>
        <router-link to="/register">Регистрация</router-link>
      </div>
      <div class="container mt-5">
        <input type="text" placeholder="Name" v-model="name" />
        <input type="text" placeholder="Email" v-model="email" />
        <input type="text" placeholder="Password" v-model="password" />
        <button @click="register()">Зарегистрироваться</button>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  name: "RegisterView",
  methods: {
    register() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("REGISTER", data).then(() => {
        this.$router.push({ name: "login" }).catch((err) => {
          console.log(err);
        });
      });
    },
  },
  data() {
    return {
      email: "",
      password: "",
      name: ""
    };
  },
};
</script>
