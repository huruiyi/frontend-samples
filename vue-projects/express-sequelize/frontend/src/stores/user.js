import { defineStore } from 'pinia';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

function loadToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}

function loadUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * 登录用户状态：token + userInfo
 */
export const useUserStore = defineStore('user', {
  state: () => ({
    token: loadToken(),
    userInfo: loadUser()
  }),

  getters: {
    isLogin: (state) => Boolean(state.token),
    userId: (state) => state.userInfo?.id ?? null,
    userName: (state) => state.userInfo?.name ?? ''
  },

  actions: {
    /** 登录/注册成功后写入凭证 */
    setAuth(token, userInfo) {
      this.token = token || '';
      this.userInfo = userInfo ? { ...userInfo } : null;
      if (this.token) {
        localStorage.setItem(TOKEN_KEY, this.token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
      if (this.userInfo) {
        localStorage.setItem(USER_KEY, JSON.stringify(this.userInfo));
      } else {
        localStorage.removeItem(USER_KEY);
      }
    },

    /** 仅更新用户资料（不改 token） */
    setUserInfo(userInfo) {
      this.userInfo = userInfo ? { ...userInfo } : null;
      if (this.userInfo) {
        localStorage.setItem(USER_KEY, JSON.stringify(this.userInfo));
      } else {
        localStorage.removeItem(USER_KEY);
      }
    },

    updateUserInfo(partial) {
      if (!this.userInfo) {
        this.userInfo = { ...partial };
      } else {
        this.userInfo = { ...this.userInfo, ...partial };
      }
      localStorage.setItem(USER_KEY, JSON.stringify(this.userInfo));
    },

    /** 退出登录 / 未授权清理 */
    clearUserInfo() {
      this.token = '';
      this.userInfo = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    },

    logout() {
      this.clearUserInfo();
    }
  }
});
