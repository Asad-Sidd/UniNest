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
    "Find a cozy room under ₹6000 with WiFi near Kursi Road",
    "I need a 2-sharing space with AC and Food",
    "Show me verified places near Dasauli under ₹8000"
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] bg-warm-white dark:bg-dark-void p-4 md:p-8 transition-colors duration-300">
      
      <div className="flex-1 max-w-5xl mx-auto w-full bg-white dark:bg-dark-surface rounded-xl border border-mist/40 dark:border-dark-border shadow-lg dark:shadow-none flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="bg-white dark:bg-dark-surface border-b border-mist/30 dark:border-dark-border px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm dark:shadow-none relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center text-sage">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-charcoal dark:text-dark-text text-lg">UniNest AI Concierge</h1>
              <p className="text-xs text-charcoal/50 dark:text-dark-muted">Describe your ideal home in natural language</p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearChat} className="border-mist/60 dark:border-dark-border text-charcoal/70 dark:text-dark-muted hover:bg-mist/10 dark:hover:bg-dark-elevated hover:text-sage dark:hover:text-sage rounded-lg">
              <Trash2 className="w-4 h-4 mr-2" />         </Button>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-cream/50 dark:bg-dark-void relative">
          <div className="max-w-3xl mx-auto space-y-6">
            
            {messages.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bot className="w-10 h-10 text-sage" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-charcoal dark:text-dark-text mb-3">How can I help you find your perfect home?</h2>
                <p className="text-charcoal/60 dark:text-dark-muted max-w-md mx-auto leading-relaxed">
                  Just tell me what you're looking for, and I'll find the perfect match.
                </p>
                
                <div className="flex flex-wrap justify-center gap-3">
                  {sampleQueries.map((q, idx) => (
                    <button 
                      key={idx}
                      onClick={() => {
                        sendMessage(q);
                      }}
                      className="text-sm bg-cream dark:bg-dark-elevated border border-mist/50 dark:border-dark-border text-charcoal/70 dark:text-dark-text hover:border-sage dark:hover:border-sage hover:text-sage transition-colors rounded-full py-2 px-4 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-black/20"
                    >
                      "{q}"
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-mocha dark:bg-mocha text-warm-white' : 'bg-sage/10 text-sage'}`}>
                  {msg.role === 'user' ? <UserIcon className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'items-end flex flex-col' : 'items-start flex flex-col'}`}>
                  <div className={`px-5 py-3 ${msg.role === 'user' ? 'bg-mocha dark:bg-mocha text-warm-white rounded-2xl rounded-tr-sm' : 'bg-white dark:bg-dark-elevated border border-mist/50 dark:border-dark-border text-charcoal dark:text-dark-text rounded-2xl rounded-tl-sm shadow-sm dark:shadow-none'}`}>
                    {msg.content}
                  </div>
                  
                  {/* Results UI */}
                  {msg.results && msg.results.length > 0 && (
                    <div className="mt-4 w-full">
                      <p className="text-xs font-semibold text-mocha tracking-wider uppercase mb-3 flex items-center">
                        <div className="w-8 h-0.5 bg-sage mr-2"></div> Recommended Properties
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {msg.results.map((property) => (
                          <div key={property._id} className="border-l-4 border-l-sage rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <PropertyCard property={property} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {msg.results && msg.results.length === 0 && msg.role === 'assistant' && !msg.content.includes('error') && (
                    <div className="mt-3 text-sm text-charcoal/60 dark:text-dark-muted bg-white dark:bg-dark-surface border border-mist/50 dark:border-dark-border px-4 py-2 rounded-lg shadow-sm dark:shadow-none">
                      No matches found. Try modifying your criteria.
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 text-sage flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-white dark:bg-dark-elevated border border-mist/50 dark:border-dark-border px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm dark:shadow-none flex gap-2 items-center">
                  <div className="w-2 h-2 bg-sage rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white dark:bg-dark-surface border-t border-mist/30 dark:border-dark-border p-4 pb-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            {error && <div className="text-coral text-sm mb-2 px-2">{error}</div>}
            <form onSubmit={handleSubmit} className="flex gap-2 items-center relative">
              <Input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 rounded-xl px-4 py-6 text-base bg-white dark:bg-dark-elevated border border-mist dark:border-dark-border text-charcoal dark:text-dark-text placeholder:text-charcoal/30 dark:placeholder:text-dark-muted/50 focus-visible:border-sage dark:focus-visible:border-sage focus-visible:ring-1 focus-visible:ring-sage/20 dark:focus-visible:ring-sage/20 pr-16 shadow-sm dark:shadow-none"
                disabled={loading}
              />
              <Button 
                type="submit" 
                disabled={!query.trim() || loading}
                className="absolute right-2 rounded-lg w-10 h-10 p-0 flex items-center justify-center bg-coral hover:bg-coral-soft text-white shrink-0 shadow-sm"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
            <div className="text-center mt-3 text-xs text-charcoal/40">
              Powered by UniNest AI. Verify property details before booking.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
