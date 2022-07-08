import { defineStore } from "pinia";
import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import {
  CHECK_AUTH,
  LOGIN,
  LOGOUT,
  REGISTER,
  UPDATE_USER
} from "@/store/actions.type";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    errors: null,
    user: {},
    isAuthenticated: !!JwtService.getToken()
  }),
  getters: {
    currentUser(state) {
      return state.user;
    },
    isAuthentication(state) {
      return state.isAuthenticated;
    }
  },
  actions: {
    [LOGIN](user) {
      return new Promise((resolve) => {
        ApiService.post("users/login", { user: user })
          .then(({ data }) => {
            this.isAuthenticated = true;
            this.user = user;
            this.errors = {};
            JwtService.saveToken(this.user.token);
            resolve(data);
          })
          .catch(({ response }) => {
            this.errors = response.data.errors;
          });
      });
    },
    [LOGOUT]() {
      this.isAuthenticated = false;
      this.user = {};
      this.errors = {};
      JwtService.destroyToken();
    },
    [REGISTER](user) {
      return new Promise((resolve, reject) => {
        ApiService.post("users", { user: user })
          .then(({ data }) => {
            this.isAuthenticated = true;
            this.user = user;
            this.errors = {};
            JwtService.saveToken(this.user.token);
            resolve(data);
          })
          .catch(({ response }) => {
            this.errors = response.data.errors;
            reject(response);
          });
      });
    },
    [CHECK_AUTH]() {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("user")
          .then(({ data }) => {
            this.isAuthenticated = true;
            this.user = data.user;
            this.errors = {};
            JwtService.saveToken(this.user.token);
          })
          .catch(({ response }) => {
            this.errors = response.data.errors;
          });
      } else {
        this.isAuthenticated = false;
        this.user = {};
        this.errors = {};
        JwtService.destroyToken();
      }
    },
    [UPDATE_USER](user) {
      const { password } = user;
      if (password) {
        user.password = password;
      }
      return ApiService.put("user", user).then(({ data }) => {
        this.isAuthenticated = true;
        this.user = data.user;
        this.errors = {};
        JwtService.saveToken(this.user.token);
        return data;
      });
    }
  }
});
