import { defineStore } from "pinia";

import {
  ArticlesService,
  CommentsService,
  FavoriteService
} from "@/common/api.service";
import {
  ARTICLE_DELETE,
  ARTICLE_EDIT,
  ARTICLE_EDIT_ADD_TAG,
  ARTICLE_PUBLISH,
  COMMENT_CREATE,
  COMMENT_DESTROY,
  FAVORITE_ADD,
  FAVORITE_REMOVE,
  FETCH_ARTICLE,
  ARTICLE_EDIT_REMOVE_TAG,
  FETCH_COMMENTS,
  ARTICLE_RESET_STATE
} from "@/store/actions.type";

export const useArticleStore = defineStore("articlestore", {
  state: () => {
    return {
      article: {
        author: {},
        title: "",
        description: "",
        body: "",
        tagList: []
      },
      comments: []
    };
  },
  getters: {
    // article(state) {
    //   return state.article;
    // },
    // comments(state) {
    //   return state.comments;
    // }
  },
  actions: {
    async [FETCH_ARTICLE](articleSlug, prevArticle) {
      if (prevArticle !== undefined) {
        this.article = prevArticle;
      }
      const { data } = await ArticlesService.get(articleSlug);
      this.article = data.article;
      return data;
    },
    async [FETCH_COMMENTS](articleSlug) {
      const { data } = await CommentsService.get(articleSlug);
      this.comments = data.comments;
      return data.comments;
    },
    async [COMMENT_CREATE](payload) {
      await CommentsService.post(payload.slug, payload.comment);
      const { data } = await CommentsService.get(payload.slug);
      this.comments = data.comments;
    },
    async [COMMENT_DESTROY](payload) {
      await CommentsService.destroy(payload.slug, payload.commentId);
      await this.COMMENT_CREATE(payload.slug);
    },
    async [FAVORITE_ADD](slug) {
      const { data } = await FavoriteService.add(slug);
      // TODO: doi xong home
      this.article = data.article;
    },
    async [FAVORITE_REMOVE](slug) {
      const { data } = await FavoriteService.remove(slug);
      // TODO: doi xong home
      this.article = data.article;
    },
    [ARTICLE_PUBLISH]() {
      return ArticlesService.create(this.article);
    },
    [ARTICLE_DELETE](slug) {
      return ArticlesService.destroy(slug);
    },
    [ARTICLE_EDIT]() {
      return ArticlesService.update(this.article.slug, this.article);
    },
    [ARTICLE_EDIT_ADD_TAG](tag) {
      this.article.tagList = this.article.tagList.concat([tag]);
    },
    [ARTICLE_EDIT_REMOVE_TAG](context, tag) {
      this.article.tagList = this.article.tagList.filter((t) => t !== tag);
    },
    [ARTICLE_RESET_STATE]() {
      // for (let f in state) {
      //   Vue.set(state, f, initialState[f]);
      // }
    }
  }
});
