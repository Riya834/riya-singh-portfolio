import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('riya_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors gracefully
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const portfolioAPI = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),

  getSkills: () => api.get('/skills'),
  createSkill: (data) => api.post('/skills', data),
  updateSkill: (id, data) => api.put(`/skills/${id}`, data),
  deleteSkill: (id) => api.delete(`/skills/${id}`),

  getExperience: () => api.get('/experience'),
  createExperience: (data) => api.post('/experience', data),
  updateExperience: (id, data) => api.put(`/experience/${id}`, data),
  deleteExperience: (id) => api.delete(`/experience/${id}`),

  getProjects: () => api.get('/projects'),
  getProjectBySlug: (slug) => api.get(`/projects/${slug}`),
  createProject: (data) => api.post('/projects', data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`),

  getEducation: () => api.get('/education'),
  createEducation: (data) => api.post('/education', data),
  updateEducation: (id, data) => api.put(`/education/${id}`, data),
  deleteEducation: (id) => api.delete(`/education/${id}`),

  getCertifications: () => api.get('/certifications'),
  createCertification: (data) => api.post('/certifications', data),
  updateCertification: (id, data) => api.put(`/certifications/${id}`, data),
  deleteCertification: (id) => api.delete(`/certifications/${id}`),

  getLeadership: () => api.get('/leadership'),
  createLeadership: (data) => api.post('/leadership', data),
  updateLeadership: (id, data) => api.put(`/leadership/${id}`, data),
  deleteLeadership: (id) => api.delete(`/leadership/${id}`),

  getDesigns: () => api.get('/designs'),
  createDesign: (data) => api.post('/designs', data),
  updateDesign: (id, data) => api.put(`/designs/${id}`, data),
  deleteDesign: (id) => api.delete(`/designs/${id}`),

  getSettings: () => api.get('/settings'),
  updateSettings: (data) => api.put('/settings', data),

  submitContact: (data) => api.post('/contact', data),

  // Admin endpoints
  adminLogin: (credentials) => api.post('/auth/login', credentials),
  getAdminMe: () => api.get('/auth/me'),
  getMessages: () => api.get('/admin/messages'),
  updateMessageStatus: (id, status) => api.put(`/admin/messages/${id}`, { status }),
  deleteMessage: (id) => api.delete(`/admin/messages/${id}`),
};

export const fetchDesigns = async () => {
  try {
    const res = await portfolioAPI.getDesigns();
    return res.data || [];
  } catch (err) {
    return [];
  }
};

export default api;
