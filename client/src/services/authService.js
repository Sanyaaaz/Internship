// Authentication service for handling token storage and retrieval

// Store the authentication token in localStorage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Retrieve the authentication token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Remove the authentication token from localStorage (logout)
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Check if user is authenticated (token exists)
export const isAuthenticated = () => {
  return !!getToken();
};

// Store user data in localStorage
export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Retrieve user data from localStorage
export const getUser = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

// Remove user data from localStorage (logout)
export const removeUser = () => {
  localStorage.removeItem('user');
};

// Login function - stores token and user data
export const login = (token, user) => {
  setToken(token);
  setUser(user);
};

// Logout function - removes token and user data
export const logout = () => {
  removeToken();
  removeUser();
};