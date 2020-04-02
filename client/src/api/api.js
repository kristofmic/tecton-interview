import api from './apiConfig';

/**
 * Auth APIs
 */
export function loginWithEmail(email, password) {
  return api.post('/auth/login/email', {
    email,
    password,
  });
}

export function loginWithGoogle(code) {
  return api.post('/auth/login/google', {
    code,
  });
}

export function logout() {
  return api.post('/auth/logout');
}

export function signupWithEmail(email, password, context) {
  return api.post('/auth/signup/email', {
    email,
    password,
    context,
  });
}

export function signupWithGoogle(code, context) {
  return api.post('/auth/signup/google', {
    code,
    context,
  });
}

/**
 * API APIs
 */
export function getComments(videoId) {
  return api.get(`/api/videos/${videoId}/comments`);
}

export function postComment(videoId, comment, timestamp) {
  return api.post(`/api/videos/${videoId}/comments`, {
    comment,
    timestamp,
  });
}
