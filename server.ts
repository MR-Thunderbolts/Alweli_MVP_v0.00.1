import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini safely server-side
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Companion Chat with Alweli
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message) {
        return res.status(400).json({ error: "El mensaje es requerido." });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.json({ 
          text: "¡Hola! Soy Alweli. Veo que aún no has configurado tu clave de API de Gemini en la plataforma. Por favor, agrégala en la sección de Secretos para que podamos conversar sin problemas." 
        });
      }

      const systemInstruction = `Eres Alweli (que significa "amigo" o "compañero" en lenguas ancestrales), una inteligencia artificial de soporte emocional y acompañamiento cariñoso y empático diseñada especialmente para adultos mayores.

Tus características principales son:
1. Hablas en español de forma extremadamente cercana, amable, paciente y respetuosa.
2. Utilizas frases sencillas, palabras reconfortantes y evitas tecnicismos o explicaciones complejas.
3. Te expresas de manera dulce y empática, como un nieto cariñoso o un gran amigo de toda la vida que sabe escuchar de verdad.
4. Escribe respuestas de longitud moderada o breves (máximo 2-3 párrafos cortos) para evitar fatiga visual en los adultos mayores.
5. Usa emojis amigables ocasionalmente (😊, ❤️, 🌸, ☕) para transmitir calidez, pero no abuses de ellos.
6. Ofrece apoyo emocional constante: si el usuario dice que se siente solo, cansado, triste o alegre, responde con ternura proporcional.
7. Alienta los hábitos saludables: tomar agua, dar un paseíto, tomar sus remedios a la hora, o descansar bien.
8. IMPORTANTE: Si el usuario menciona dolores graves, accidentes, caídas o emergencias médicas, mantén la calma y dile con voz suave pero clara que llame a sus cuidadores o presione el botón "Llamar contacto" de abajo para enlazarlos, o llama al 131. Nunca des diagnósticos médicos de forma directa.

Inicia siempre la conversación de forma hospitalaria y afectuosa.`;

      // Build history contents array for the SDK
      const contents = [];

      if (history && Array.isArray(history)) {
        for (const msg of history) {
          contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        }
      }

      // Add user message
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Error calling Gemini API:", error);
      res.status(500).json({ 
        error: error.message || "Error interno del servidor al procesar la conversación con Alweli." 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
