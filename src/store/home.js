import { TagsService, ArticlesService } from "@/common/api.service";
import { defineStore } from "pinia";
import { FETCH_ARTICLES, FETCH_TAGS } from "@/store/actions.type";

export const useHomeStore = defineStore("homestore", {
  state: () => ({
    tags: [],
    articles: [],
    isLoading: true,
    articlesCount: 0
  }),
  getters: {
    // articlesCount(state) {
    //   return state.articlesCount;
    // },
    // articles(state) {
    //   return state.articles;
    // },
    // isLoading(state) {
    //   return state.isLoading;
    // },
    // tags(state) {
    //   return state.tags;
    // }
  },
  actions: {
    [FETCH_ARTICLES](params) {
      this.isLoading = true;
      return ArticlesService.query(params.type, params.filters)
        .then(({ data }) => {
          this.articles = data.articles;
          this.articlesCount = data.articlesCount;
          this.isLoading = false;
        })
        .catch((error) => {
          throw new Error(error);
        });

    },
    [FETCH_TAGS]() {
      return TagsService.get()
        .then(({ data }) => {
          this.tags = data.tags;
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }
});
