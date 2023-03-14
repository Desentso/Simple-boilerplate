const BASE_ENDPOINT = process.env.NODE_ENV === "production"
  ? "https://api.example.com/api"
  : 'https://localhost:8080/api';

const BASE_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const DONT_REDIRECT_FOR_ROUTES = [
  "login",
  "register",
  "reset-password",
  "forgot-password",
]

const makeRequest = async ({ path, method, body, params }) => {
  const queryString = params
    ? `?${Object.keys(params)
        .map((key) => key + '=' + params[key])
        .join('&')}`
    : '';

  const res = await fetch(`${BASE_ENDPOINT}${path}${queryString}`, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: BASE_HEADERS,
    credentials: 'include',
  });

  try {
    if (res.status === 401 && DONT_REDIRECT_FOR_ROUTES.every(route => !window.location.href.includes(route))) {
      window.location.href = process.env.NODE_ENV === "production" 
        ? "https://example.com/app/login"
        : "/app/login"
      return { error: true }
    }

    const data = res.status >= 500
      ? { error: true, errors: { base: 'Something went wrong' } }
      : res.status >= 400 
        ? { error: true, data: await res.json() }
        : await res.json();
    return data
  } catch(err) {
    console.error(err)
    return { error: true, errors: { base: 'Something went wrong' } }
  }

};

export default makeRequest;
