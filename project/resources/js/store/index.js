import Vue from 'vue';
import Vuex from 'Vuex';
import Axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: "",
        api: "http://127.0.0.1:8000/api",
        user: {},
        is_admin: false,
    },
    getters: {
        isLogged: state => !!state.user
    },
    mutations: {
        SET_TOKEN: (state, payload) => {
            state.token = payload.token;
            state.user = payload.user;
            state.is_admin = payload.is_admin;
            Axios.defaults.headers.common['Authorization'] = state.token;
        },
        RESET_TOKEN: (state) => {
            state.token = "";
            state.user = {};
            state.is_admin = false;
            Axios.defaults.headers.common['Authorization'] = "";
        },
    },
    actions: {
        async LOGIN({ commit, state }, data) {
            await Axios
                .post(`${state.api}/token`, data)
                .then(function (response) {
                    commit('SET_TOKEN', response.data);
                }).catch(function (error) {
                    console.log("Произошла ошибка загрузки (" + error.response.status + ")");
                })
        },

        async LOGOUT({ commit, state }) {
            commit("RESET_TOKEN")
        },

        async LOAD_BOOKS({ commit, state }) {
            await Axios
                .get(`${state.api}/book/all`)
                .then(function (response) {
                    commit('SET_BOOKS', response.data);
                }).catch(function (error) {
                    console.log("Произошла ошибка загрузки (" + error.response.status + ")");
                })
        },

        async ADD_BOOK({ commit, state }, data) {
            await Axios
                .post(`${state.api}/book/add`, data)
                .then(function (response) {
                    commit('SET_BOOKS', response.data);
                }).catch(function (error) {
                    console.log("Произошла ошибка загрузки (" + error.response.status + ")");
                })
        },

        async DELETE_BOOK({ commit, state }, id) {
            await Axios
                .delete(`${state.api}/book/delete/${id}`)
                .then(function (response) {
                    commit('SET_BOOKS', response.data);
                }).catch(function (error) {
                    console.log("Произошла ошибка загрузки (" + error.response.status + ")");
                })
        },

        async CHANGE_BOOK({ commit, state }, id) {
            await Axios
                .patch(`${state.api}/book/change_availability/${id}`)
                .then(function (response) {
                    commit('SET_BOOKS', response.data);
                }).catch(function (error) {
                    console.log("Произошла ошибка загрузки (" + error.response.status + ")");
                })
        },
    }
})