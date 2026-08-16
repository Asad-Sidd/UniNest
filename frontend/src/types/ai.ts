import { Property } from './listing';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  results?: Property[]; // Optional properties returned by the AI search
}

export interface AiSearchResponse {
  results: Property[];
  explanation: string;
  aiResponse: string;
}
