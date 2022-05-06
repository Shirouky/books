import Vue from 'vue';
import Vuex from 'Vuex';
import Axios from 'axios';
// import router from './router'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        api: "http://127.0.0.1:7000/",
        user: {},
    },
    getters: {
        USER: state => id => {
            return state.users.find(user => user.id == id);
        },
        ARTICLE: state => id => {
            return state.articles.find(article => article.id == id);
        },
        TAG: state => id => {
            return state.tags.find(tag => tag.id == id);
        },
    },
    mutations: {

        SET_USER_VIEWED: (state, payload) => {
            state.user_viewed = payload;
        },
        SET_USER_READ: (state, payload) => {
            state.user_read = payload;
        },
    },
    actions: {

        async SET_POPULAR_ARTICLES({ commit, state }) {
            state.popular_articles_load = true;
            await Axios
                .get(state.api + "articles/popular")
                .then(function (response) {
                    commit('SET_POPULAR_ARTICLES', response.data);
                    state.popular_articles_load = false;
                }).catch(function (error) {
                    commit('SET_MESSAGE', ["error", "Произошла ошибка загрузки(" + error.response.status + ")"]);
                    commit('SET_POPULAR_ARTICLES', []);
                    state.popular_articles_load = false;
                })
        },
    }
})