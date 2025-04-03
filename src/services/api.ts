const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Chat API
export const chatApi = {
  // Create a new chat session
  createSession: async (userId?: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create chat session');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating chat session:', error);
      throw error;
    }
  },
  
  // Get a chat session by ID
  getSession: async (sessionId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/sessions/${sessionId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch chat session');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching chat session:', error);
      throw error;
    }
  },
  
  // Get all chat sessions for a user
  getUserSessions: async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/sessions/user/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user chat sessions');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user chat sessions:', error);
      throw error;
    }
  },
  
  // Send a message in a chat session
  sendMessage: async (sessionId: string, message: string, userId?: string) => {
    try {
      console.log(`Sending message to ${API_BASE_URL}/chat/messages`);
      const response = await fetch(`${API_BASE_URL}/chat/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, message, userId }),
      });
      
      const data = await response.json();
      console.log('Response from server:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      return data;
    } catch (error) {
      console.error('Error details:', error);
      if (error instanceof Error) {
        console.error(`Error sending message: ${error.message}`);
      } else {
        console.error('Unknown error sending message:', error);
      }
      throw error;
    }
  },
};

// Health API
export const healthApi = {
  // Create a health profile
  createHealthProfile: async (profileData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/health/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create health profile');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating health profile:', error);
      throw error;
    }
  },
  
  // Get a user's health profile
  getHealthProfile: async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/health/profile/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch health profile');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching health profile:', error);
      throw error;
    }
  },
  
  // Update a user's health profile
  updateHealthProfile: async (userId: string, profileData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/health/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update health profile');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating health profile:', error);
      throw error;
    }
  },
  
  // Get list of health topics
  getHealthTopics: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health/topics`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch health topics');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching health topics:', error);
      throw error;
    }
  },
  
  // Get info about a specific health topic
  getTopicInfo: async (topic: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/health/topics/${topic}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch topic info');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching topic info:', error);
      throw error;
    }
  },
}; 