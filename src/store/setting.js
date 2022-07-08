import { ArticlesService, CommentsService } from "@/common/api.service";
import { defineStore } from "pinia";
import { FETCH_ARTICLE, FETCH_COMMENTS } from "@/store1/actions.type";

export const useSettingStore = defineStore("settingstore", {
  state: () => {
    return {
      article: {},
      comments: []
    };
  },
  actions: {
    [FETCH_ARTICLE](context, articleSlug) {
      return ArticlesService.get(articleSlug)
        .then(({ data }) => {
          this.article = data.article;
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
    [FETCH_COMMENTS](context, articleSlug) {
      return CommentsService.get(articleSlug)
        .then(({ data }) => {
          this.comments = data.comments;
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }
});
