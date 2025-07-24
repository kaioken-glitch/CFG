  
const API_BASE_URL = 'https://cfg-backend-4smp.onrender.com'
    
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  // Auth operations
  async login(email, password) {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  async signup(name, email, password) {
    return this.request('/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error)
      throw error
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/health')
  }

  // Task operations
  async getTasks(filters = {}) {
  // Remove undefined or null userId
    if (filters.userId === undefined || filters.userId === null) {
      delete filters.userId;
    }
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/tasks?${queryParams}` : '/tasks';
    return this.request(endpoint);
  }

  async getTask(id) {
    return this.request(`/tasks/${id}`)
  }

  async createTask(taskData) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    })
  }

  async updateTask(id, updates) {
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  }

  async deleteTask(id) {
    return this.request(`/tasks/${id}`, {
      method: 'DELETE',
    })
  }

  async completeTask(id) {
    return this.updateTask(id, { completed: true, status: 'completed' })
  }

  async searchTasks(query, userId) {
    // Pass userId if provided
    const filters = { search: query }
    if (userId) filters.userId = userId
    return this.getTasks(filters)
  }

  async getTaskStats() {
    return this.request('/tasks/stats/overview')
  }

  // Utility methods
  async filterTasks(filters) {
    return this.getTasks(filters)
  }

  async getTasksByCategory(category) {
    return this.getTasks({ category })
  }

  async getTasksByPriority(priority) {
    return this.getTasks({ priority })
  }

  async getTasksByStatus(status) {
    return this.getTasks({ status })
  }

  async getCompletedTasks() {
    return this.getTasks({ completed: 'true' })
  }

  async getPendingTasks() {
    return this.getTasks({ completed: 'false' })
  }
}

// Create and export singleton instance
const apiService = new ApiService()

export default apiService

// Export individual methods for convenience
export const {
  healthCheck,
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  searchTasks,
  getTaskStats,
  filterTasks,
  getTasksByCategory,
  getTasksByPriority,
  getTasksByStatus,
  getCompletedTasks,
  getPendingTasks
} = apiService