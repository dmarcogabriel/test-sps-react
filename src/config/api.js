const BASE_URL = process.env.REACT_APP_SERVER_URL;

async function execFetch(url, method, body) {
  const token = localStorage.getItem("@token");

  const response = await fetch(`${BASE_URL}/${url}`, {
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : null
  });

  if (!response.ok) {
    throw new Error("Falha ao tentar acessar api.");
  }

  return response.json();
}

export const api = {
  get: (url) => {
    return execFetch(url, "GET");
  },
  post: (url, data) => {
    return execFetch(url, "POST", data);
  },
  patch: (url, data) => {
    return execFetch(url, "PATCH", data);
  },
  delete: (url) => {
    return execFetch(url, "DELETE");
  }
}