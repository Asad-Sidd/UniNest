import OpenAI from 'openai';
import Property from '../models/Property';

const openai = new OpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY || '',
});

export const parseUserQuery = async (query: string) => {
  const prompt = `
You are UniNest AI, a helpful and friendly accommodation assistant for Integral University students.
If the user's request is a greeting or a general conversational question (e.g. "Hi", "What's the time?", "Who are you?"), parse the request into a JSON object with:
- "isConversational": true
- "filter": {}
- "explanation": Your friendly response to their question.

If the user is looking for accommodation (PG, Hostel, rooms), parse the request into a JSON object with:
- "isConversational": false
- "filter": MongoDB-style query object based on the user's requirements. Available fields: "type" (PG or Hostel), "address.area" (Dasauli, Kursi Road, Other), "pricing.monthlyRent" (use $lte, $gte, etc.), "pricing.sharingOptions.type" (e.g., "1-sharing", "2-sharing"), "amenities" (WiFi, AC, Food, Laundry, PowerBackup, etc.).
- "explanation": A friendly, human-readable summary of what you are searching for.

User Query: "${query}"

Ensure the response is valid JSON.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'llama3-8b-8192', // using Groq's widely available Llama 3 model
      messages: [{ role: 'system', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No content from OpenAI');
    
    return JSON.parse(content);
  } catch (error) {
    console.error('Error with OpenAI:', error);
    // Fallback if OpenAI fails or key is missing
    return {
      filter: {},
      explanation: "I couldn't process your request right now, so here are some popular properties.",
    };
  }
};

export const executeSearch = async (filter: any) => {
  try {
    // Sanitize filter if necessary
    const properties = await Property.find(filter).limit(10);
    return properties;
  } catch (error) {
    console.error('Error executing search:', error);
    return [];
  }
};
