import { useState, useCallback } from 'react';
import apiClient from '../lib/api-client';
import { ChatMessage } from '../types/ai';

export const useAIChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);

    // Add user message to UI immediately
    const userMessage: ChatMessage = { role: 'user', content: query, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // API call to the backend
      const response = await apiClient.post('/ai/search', { query });

      if (response.data.status === 'success') {
        const { explanation, results, aiResponse } = response.data.data;

        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: aiResponse || explanation,
          results: results,
          timestamp: new Date().toISOString()
        };

        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to communicate with AI');

      // Add error message as assistant response
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', timestamp: new Date().toISOString() }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, loading, error, sendMessage, clearChat };
};
