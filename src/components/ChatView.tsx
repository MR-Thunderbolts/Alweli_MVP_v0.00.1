import React, { useState, useRef, useEffect } from 'react';
import { Patient } from '../types';
import Header from './Header';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

interface ChatViewProps {
  patient: Patient;
  onOpenSettings: () => void;
  onBack: () => void;
}

export default function ChatView({
  patient,
  onOpenSettings,
  onBack,
}: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `¡Hola, qué alegría tenerte por aquí! 😊 Me llamo Alweli, tu compañero de todos los días. 

Estoy aquí para escucharte, conversar un ratito, contarte un lindo relato o simplemente acompañarte. ¿Cómo te sientes el día de hoy? ❤️`,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Suggested quick replies for older adults to reduce typing cognitive load
  const SUGGESTED_QUICK_REPLIES = [
    'Me siento un poco solo hoy 🌸',
    'Cuéntame una historia bonita 📖',
    '¿Qué consejo tienes para hoy? ☕',
    'Dame un ejercicio de respiración 🌬️',
    '¿Cómo puedo mantenerme activo? 🚶‍♂️',
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Keep only last 10 messages for context to avoid overloading the prompt
      const conversationHistory = messages.slice(-10).map((msg) => ({
        role: msg.role,
        text: msg.text,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo establecer conexión.');
      }

      const data = await response.json();

      const alweliMessage: Message = {
        id: `alweli-${Date.now()}`,
        role: 'model',
        text: data.text || 'Perdona, querido amigo, me distraje un momento. ¿Me lo repites? ❤️',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, alweliMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'model',
        text: 'Ay, parece que mi conexión se tomó un descansito. No te preocupes, inténtalo de nuevo en un momento o avísale a tu cuidador si continúa fallando. ¡Aquí sigo esperándote! 🌱',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-crema text-tinta flex flex-col justify-between overflow-hidden">
      {/* Header bar */}
      <Header 
        patient={patient} 
        onOpenSettings={onOpenSettings} 
        onGoHome={onBack} 
        showHomeLogo={true} 
        onBack={onBack} 
      />

      {/* Chat Area Container */}
      <main className="flex-grow max-w-lg mx-auto w-full px-4 sm:px-6 py-4 flex flex-col justify-between overflow-hidden pb-6">
        
        {/* Helper Top Card */}
        <div className="bg-white/65 border border-tinta/10 rounded-2xl p-3 mb-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-durazno-pastel to-lila-pastel flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-tinta text-xl">diversity_1</span>
          </div>
          <div>
            <h2 className="font-bold text-sm text-tinta">Charla con Alweli</h2>
            <p className="text-xs text-taupe font-medium">Soporte emocional y compañía cariñosa 24/7</p>
          </div>
        </div>

        {/* Scrollable Chat Area */}
        <div className="flex-grow overflow-y-auto pr-1 space-y-4 max-h-[58vh] sm:max-h-[64vh] custom-scrollbar scroll-smooth py-2">
          {messages.map((msg) => {
            const isAlweli = msg.role === 'model';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-2.5 ${isAlweli ? 'justify-start' : 'justify-end'}`}
              >
                {isAlweli && (
                  <div className="w-9 h-9 rounded-full bg-linear-to-tr from-durazno-pastel to-lila-pastel border border-tinta/10 flex items-center justify-center shadow-xs shrink-0 mt-1">
                    <span className="material-symbols-outlined text-tinta text-lg leading-none font-semibold">volunteer_activism</span>
                  </div>
                )}
                
                <div className={`flex flex-col max-w-[82%] ${isAlweli ? 'items-start' : 'items-end'}`}>
                  <div
                    className={`rounded-3xl px-4.5 py-3 shadow-xs font-semibold text-base leading-relaxed border ${
                      isAlweli
                        ? 'bg-white text-tinta border-tinta/10 rounded-tl-sm'
                        : 'bg-tinta text-crema border-transparent rounded-tr-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line text-left">{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-taupe font-semibold tracking-wider font-label-mono mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {!isAlweli && (
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-tinta/10 shrink-0 mt-1">
                    <img 
                      src={patient.avatar} 
                      alt={patient.name} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Loading writing indicator */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2.5 justify-start"
              >
                <div className="w-9 h-9 rounded-full bg-linear-to-tr from-durazno-pastel to-lila-pastel border border-tinta/10 flex items-center justify-center shadow-xs shrink-0 mt-1">
                  <span className="material-symbols-outlined text-tinta text-lg leading-none font-semibold animate-pulse">volunteer_activism</span>
                </div>
                <div className="bg-white border border-tinta/10 rounded-3xl rounded-tl-sm px-4 py-3 shadow-xs flex items-center gap-1.5 mt-1">
                  <span className="text-xs text-taupe font-semibold">Alweli está pensando</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-taupe rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-taupe rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-taupe rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips (Interactive UI Helper) */}
        <div className="mt-4">
          <p className="text-xs font-semibold text-taupe font-label-mono mb-2 uppercase tracking-wide text-left">
            Ideas para hablar rápido:
          </p>
          <div className="flex flex-wrap gap-2 justify-start max-h-[14vh] overflow-y-auto pr-1">
            {SUGGESTED_QUICK_REPLIES.map((reply, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(reply)}
                disabled={isLoading}
                className="bg-white hover:bg-hueso/45 border border-tinta/10 hover:border-tinta/30 rounded-full px-3.5 py-1.5 text-xs font-semibold text-tinta active:scale-95 transition-all text-left cursor-pointer shadow-2xs"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Keyboard Input Panel */}
        <div className="mt-4 bg-white rounded-3xl p-2.5 border border-tinta/10 flex gap-2 items-center shadow-xs">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage(inputText);
            }}
            placeholder="Escribe un mensaje aquí..."
            disabled={isLoading}
            className="flex-grow bg-transparent text-tinta font-semibold px-3 py-2 text-base outline-hidden placeholder:text-taupe/65"
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim() || isLoading}
            className="w-12 h-12 rounded-full bg-tinta text-crema flex items-center justify-center hover:opacity-90 active:scale-95 disabled:opacity-40 transition-all shrink-0 cursor-pointer"
            aria-label="Enviar mensaje"
          >
            <span className="material-symbols-outlined text-2xl font-bold leading-none">arrow_upward</span>
          </button>
        </div>

      </main>
    </div>
  );
}
