// server/index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildOutlinePrompt, buildScriptPrompt } from './prompts.js';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite' });

async function callModel(prompt) {
  const result = await model.generateContent(prompt);
  const content = result.response.text();

  if (!content) {
    console.error('Full API response:', JSON.stringify(result, null, 2));
    throw new Error('Model returned an empty response. Try generating again.');
  }

  return content;
}

app.post('/generate', async (req, res) => {
  const { topic, objectives, level, numModules, audience } = req.body;

  try {
    // Step 1 — Generate course outline
    let outlineText = await callModel(
      buildOutlinePrompt(topic, objectives, level, numModules, audience)
    );

    outlineText = outlineText.trim();

    // Strip markdown fences if Gemini adds them
    if (outlineText.startsWith('```')) {
      outlineText = outlineText.split('```')[1];
      if (outlineText.startsWith('json')) {
        outlineText = outlineText.slice(4);
      }
    }

    const outline = JSON.parse(outlineText.trim());

    // Step 2 — Generate full script for each module
    const modulesWithScripts = await Promise.all(
      outline.modules.map(async (mod) => {
        const scriptText = await callModel(buildScriptPrompt(mod, level));
        return {
          ...mod,
          script: scriptText.trim()
        };
      })
    );

    res.json({
      course_title: outline.course_title,
      course_description: outline.course_description,
      estimated_duration_minutes: outline.estimated_duration_minutes,
      modules: modulesWithScripts
    });

  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});