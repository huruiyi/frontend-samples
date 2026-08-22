import request from './http';

export function fetchHealth() {
  return request('/api/health');
}

export function fetchUsers() {
  return request('/api/users');
}

export function fetchUserById(id) {
  return request(`/api/users/${id}`);
}

export function createUser(payload) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function updateUser(id, payload) {
  return request(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

export function deleteUser(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE'
  });
}
