const BASE = 'http://localhost:8080/api';   // ← add full URL

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (res.status === 204) return null;
  return res.json();
}

const api = {
  getDogs:        (search = '') => request(`/dogs${search ? '?search=' + encodeURIComponent(search) : ''}`),
  getDog:         (id)          => request(`/dogs/${id}`),
  createDog:      (data)        => request('/dogs',       { method: 'POST',   body: JSON.stringify(data) }),
  updateDog:      (id, data)    => request(`/dogs/${id}`, { method: 'PUT',    body: JSON.stringify(data) }),
  deleteDog:      (id)          => request(`/dogs/${id}`, { method: 'DELETE' }),
  submitAdoption: (data)        => request('/adoptions',  { method: 'POST',   body: JSON.stringify(data) }),
};