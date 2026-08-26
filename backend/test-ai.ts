import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: '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', // The user's new key
});

async function test() {
  try {
    const response = await openai.chat.completions.create({
      model: 'qwen/qwen3.8-27b',
      messages: [
        { role: 'system', content: 'Say hello in JSON {"hello": "world"}' },
        { role: 'user', content: 'Hello' }
      ],
      response_format: { type: 'json_object' },
    });
    console.log("SUCCESS:", response.choices[0].message.content);
  } catch (error: any) {
    console.error('ERROR:', error.message);
  }
}

test();
