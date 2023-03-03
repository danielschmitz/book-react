
const api = "http://localhost:3001/"

async function request(url, method = "GET", data) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  const response = await fetch(api + url, options);
  return response.json();
}

const service = {
  books: {
    getById: (id) => request(`books/${id}`),
    getAll: () => request("books?_expand=friend&_expand=category"),
    getByCategoryId: (id) => request(`books?categoryId=${id}`),
    getByFriendId: (id) => request(`books?friendId=${id}`),
    save: (data) => request(`books/${data.id ?? ''}`, data.id ? "PUT" : "POST", data),
    remove: (id) => request(`books/${id}`, "DELETE")
  },
  categories: {
    getAll: () => request("categories"),
    getById: (id) => request(`categories/${id}`),
    save: (data) => request(`categories/${data.id ?? ''}`, data.id ? "PUT" : "POST", data),
    remove: (id) => request(`categories/${id}`, "DELETE")
  },
  friends: {
    getAll: () => request("friends"),
    getById: (id) => request(`friends/${id}`),
    save: (data) => request(`friends/${data.id ?? ''}`, data.id ? "PUT" : "POST", data),
    remove: (id) => request(`friends/${id}`, "DELETE")
  },
}

export default service