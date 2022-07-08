import ApiService from "@/common/api.service";
import { defineStore } from "pinia";
import {
  FETCH_PROFILE,
  FETCH_PROFILE_FOLLOW,
  FETCH_PROFILE_UNFOLLOW
} from "@/store/actions.type";

export const useProfileStore = defineStore("profilestore", {
  state: () => {
    return {
      errors: {},
      profile: {}
    };
  },
  getters: {
    profile(state) {
      return state.profile;
    }
  },
  actions: {
    [FETCH_PROFILE](username) {
      return ApiService.get("profiles", username)
        .then(({ data }) => {
          this.profile = data.profile;
          this.errors = {};
          return data;
        })
        .catch(() => {
          // #todo SET_ERROR cannot work in multiple states
          // context.commit(SET_ERROR, response.data.errors)
        });
    },
    [FETCH_PROFILE_FOLLOW](username) {
      return ApiService.post(`profiles/${username}/follow`)
        .then(({ data }) => {
          this.profile = data.profile;
          this.errors = {};
          return data;
        })
        .catch(() => {
          // #todo SET_ERROR cannot work in multiple states
          // context.commit(SET_ERROR, response.data.errors)
        });
    },
    [FETCH_PROFILE_UNFOLLOW](username) {
      return ApiService.delete(`profiles/${username}/follow`)
        .then(({ data }) => {
          this.profile = data.profile;
          this.errors = {};
          return data;
        })
        .catch(() => {
          // #todo SET_ERROR cannot work in multiple states
          // context.commit(SET_ERROR, response.data.errors)
        });
    }
  }
});
