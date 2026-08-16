'use client';

import { useState, useRef, useEffect } from 'react';
import { useAIChat } from '@/hooks/useAIChat';
import { PropertyCard } from '@/components/listings/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User as UserIcon, Sparkles } from 'lucide-react';

export default function AISearchPage() {
  const { messages, loading, error, sendMessage, clearChat } = useAIChat();
  const [query, setQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    sendMessage(query);
    setQuery('');
  };

  const sampleQueries = [
    "Find a sanctuary under ₹6000 with WiFi near Kursi Road",
    "I need a 2-sharing haven with AC and Food",
    "Show me verified places near Dasauli under ₹8000"
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] bg-desert-dark relative">
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
      
      {/* Header */}
      <div className="bg-night-shadow border-b border-sand-shadow/20 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-night-blue flex items-center justify-center text-star-gold border border-star-gold/30">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-sand-tan tracking-widest uppercase text-lg">UniNest AI Oracle</h1>
            <p className="text-xs text-papyrus/60 uppercase tracking-wider">Describe your ideal sanctuary in natural language</p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearChat} className="border-sand-shadow/30 text-papyrus hover:bg-night-blue hover:text-sand-tan">
            Clear Divination
          </Button>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {messages.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-night-blue border border-star-gold/30 rounded-sm flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-star-gold" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-sand-tan tracking-widest uppercase mb-4">Consult the Oracle</h2>
              <div className="w-16 h-px bg-sand-tan mx-auto mb-6" />
              <p className="text-papyrus/70 max-w-md mx-auto mb-8">
                Speak your desires into the sands, and I shall unearth the perfect sanctuaries for your stay.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                {sampleQueries.map((q, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      sendMessage(q);
                    }}
                    className="text-sm bg-night-shadow border border-sand-shadow/30 hover:border-sand-tan hover:text-sand-tan hover:bg-night-blue text-papyrus/80 py-2 px-4 rounded-sm transition-colors"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 border ${msg.role === 'user' ? 'bg-sand-shadow border-sand-tan text-night-shadow' : 'bg-night-blue border-star-gold/30 text-star-gold'}`}>
                {msg.role === 'user' ? <UserIcon className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'items-end flex flex-col' : 'items-start flex flex-col'}`}>
                <div className={`px-5 py-3 rounded-sm ${msg.role === 'user' ? 'bg-sand-tan text-night-shadow' : 'bg-night-shadow border border-sand-shadow/30 text-papyrus shadow-sm'}`}>
                  {msg.content}
                </div>
                
                {/* Results UI */}
                {msg.results && msg.results.length > 0 && (
                  <div className="mt-4 w-full">
                    <p className="text-xs font-medium text-sand-tan/80 mb-3 tracking-wider uppercase">Revealed Sanctuaries</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {msg.results.map((property) => (
                        <div key={property._id} className="h-80">
                          <PropertyCard property={property} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {msg.results && msg.results.length === 0 && msg.role === 'assistant' && !msg.content.includes('error') && (
                  <div className="mt-3 text-sm text-papyrus/70 bg-night-shadow border border-sand-shadow/30 px-4 py-2 rounded-sm">
                    The sands revealed no matches. Try altering your divination.
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-sm bg-night-blue border border-star-gold/30 text-star-gold flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-night-shadow border border-sand-shadow/30 px-5 py-4 rounded-sm shadow-sm flex gap-2 items-center">
                <div className="w-2 h-2 bg-star-gold rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-star-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-star-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-night-shadow border-t border-sand-shadow/30 p-4 pb-6 shadow-md relative z-10">
        <div className="max-w-4xl mx-auto">
          {error && <div className="text-red-400 text-sm mb-2 px-2">{error}</div>}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Unveil a sanctuary under 5000 with WiFi..."
              className="flex-1 rounded-sm px-6 py-6 text-base bg-desert-dark border-sand-shadow/30 text-papyrus placeholder:text-papyrus/40 focus-visible:border-sand-tan focus-visible:ring-0"
              disabled={loading}
            />
            <Button 
              type="submit" 
              disabled={!query.trim() || loading}
              className="rounded-sm w-14 h-14 flex items-center justify-center bg-sand-tan hover:bg-sand-shadow text-night-shadow shrink-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
          <div className="text-center mt-3 text-xs text-papyrus/40 uppercase tracking-wider">
            Powered by UniNest AI Oracle (Llama-3.3). The Oracle's visions may waver; always verify your path.
          </div>
        </div>
      </div>
    </div>
  );
}
