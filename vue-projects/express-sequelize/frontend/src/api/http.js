import { useUserStore } from '@/stores/user';

const baseURL = import.meta.env.VITE_API_BASE_URL || '';

let unauthorizedHandler = null;

/** 由 main.js 注入：清理登录态并跳转登录页 */
export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler;
}

async function request(path, options = {}) {
  const userStore = useUserStore();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (userStore.token) {
    headers.Authorization = `Bearer ${userStore.token}`;
  }

  const response = await fetch(`${baseURL}${path}`, {
    ...options,
    headers
  });

  if (response.status === 401) {
    unauthorizedHandler?.();
    const text = await response.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }
    throw new Error(data?.message || 'unauthorized');
  }

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message || `请求失败 (${response.status})`;
    throw new Error(message);
  }

  return data;
}

export default request;
