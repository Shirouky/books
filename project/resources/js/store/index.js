import Vue from 'vue';
import Vuex from 'Vuex';
import Axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: "",
        api: "http://127.0.0.1:8000/api",
        user: {},
        books: [],
    },
    getters: {
        isLogged: state => !!state.user
    },
    mutations: {
        SET_TOKEN: (state, payload) => {
            state.token = payload.token;
            localStorage.setItem("token", state.token)
            state.user = payload.user;
            Axios.defaults.headers.common['Authorization'] = 'Bearer' + state.token;
        },
        RESET_TOKEN: (state) => {
            state.token = "";
            localStorage.setItem("token", state.token)
            state.user = {};
            Axios.defaults.headers.common['Authorization'] = "";
        },
        SET_BOOKS: (state, payload) => {
            state.books = payload;
        },
    },
    actions: {
        async LOGIN({ commit, state }, data) {
            await Axios
                .post(`${state.api}/token`, data)
                .then(function (response) {
                    commit('SET_TOKEN', response.data);
                }).catch(function (error) {
                    console.log("Произошла ошибка (" + error.response.status + ")");
                })
        },

        async LOGOUT({ commit }) {
            commit("RESET_TOKEN")
        },

        async REGISTER({ commit, state }, data) {
            await Axios
                .post(`${state.api}/register`, data)
                .catch(function (error) {
                    console.log("Произошла ошибка (" + error.response.status + ")");
                })
        },

        async LOAD_BOOKS({ commit, state }) {
            await Axios
                .get(`${state.api}/book/all`)
                .then(function (response) {
                    commit('SET_BOOKS', response.data);
                }).catch(function (error) {
                    console.log("Произошла ошибка (" + error.response.status + ")");
                })
        },

        async ADD_BOOK({ commit, state }, data) {
            await Axios
                .post(`${state.api}/book/add`, data)
                .then(function (response) {
                    commit('SET_BOOKS', response.data);
                }).catch(function (error) {
                    console.log("Произошла ошибка (" + error.response.status + ")");
                })
        },

        async DELETE_BOOK({ commit, state }, id) {
            await Axios
                .delete(`${state.api}/book/delete/${id}`)
                .then(function (response) {
                    commit('SET_BOOKS', response.data);
                }).catch(function (error) {
                    console.log("Произошла ошибка (" + error.response.status + ")");
                })
        },

        async CHANGE_BOOK({ commit, state }, id) {
            await Axios
                .patch(`${state.api}/book/change_availability/${id}`)
                .then(function (response) {
                    commit('SET_BOOKS', response.data);
                }).catch(function (error) {
                    console.log("Произошла ошибка (" + error.response.status + ")");
                })
        },
    }
})