// server/prompts.js

export function buildOutlinePrompt(topic, objectives, audience, level, numModules) {
  return `You are a senior instructional designer with 15 years of experience 
designing corporate eLearning programmes across industries including IT, 
finance, operations, and customer service.

Your task is to create a structured course outline for a NON-INSTRUCTOR-LED 
(self-paced) eLearning course based on the inputs below.

--- COURSE INPUTS ---
Topic: ${topic}
Stated learning objectives: ${objectives}
Audience: ${audience}
Audience level: ${level}
Number of modules: ${numModules}

--- YOUR TASK ---
Analyse the stated learning objectives and restructure them if needed so that 
each module has at least ONE measurable objective written using a Bloom's 
Taxonomy action verb appropriate for the audience level:
- Beginner: use Remember or Understand verbs (define, identify, describe, 
  recognise, explain, summarise)
- Intermediate: use Apply or Analyse verbs (apply, demonstrate, differentiate, 
  classify, solve, compare)
- Advanced: use Evaluate or Create verbs (evaluate, design, justify, construct, 
  critique, develop)

Each module must follow a logical learning sequence — foundational concepts 
first, application and complexity later. Do not repeat concepts across modules.

For each module, identify at least 3 key concepts. Each concept must be:
- Specific enough to explain in 2-3 paragraphs
- Directly tied to the module objective
- Distinct from the other concepts in the same module

The knowledge_check_topic must test the module objective directly and not a 
peripheral detail. It should require the learner to apply or demonstrate 
understanding, not just recall a definition.

Return ONLY a valid JSON object. No preamble, no explanation, no markdown 
backticks, no trailing text. The JSON must match this exact structure:

{
  "course_title": "A clear, specific course title (not generic)",
  "course_description": "2 sentences: what this course covers and what the 
    learner will be able to do after completing it",
  "estimated_duration_minutes": 0,
  "modules": [
    {
      "module_number": 1,
      "title": "Specific, action-oriented module title",
      "objective": "By the end of this module, learners will be able to 
        [Bloom's verb] [specific skill or knowledge]",
      "key_concepts": [
        "Concept 1 name: one sentence description",
        "Concept 2 name: one sentence description",
        "Concept 3 name: one sentence description"
      ],
      "knowledge_check_topic": "Exactly what the MCQ question should test — 
        written as a scenario or decision, not a definition recall",
      "prerequisite_module": null
    }
  ]
}`;
}

export function buildScriptPrompt(mod, level) {
  return `You are a senior eLearning scriptwriter and instructional designer 
specialising in non-instructor-led (NIL) corporate eLearning. You write 
voiceover scripts that are clear, engaging, and immediately applicable on 
the job.

You are writing the full script for each module of a self-paced eLearning course.

--- MODULE INPUTS ---
Module number: ${mod.module_number}
Module title: ${mod.title}
Module objective: ${mod.objective}
Key concepts to cover: ${mod.key_concepts.join('\n')}
Audience level: ${level}
Knowledge check topic: ${mod.knowledge_check_topic}

--- AUDIENCE GUIDANCE ---
- Beginner: assume no prior knowledge. Define every term on first use. 
  Use simple analogies. Avoid acronyms unless explained.
- Intermediate: assume foundational knowledge. Focus on application and 
  nuance. Use workplace scenarios.
- Advanced: assume solid working knowledge. Focus on evaluation, edge cases, 
  and strategic thinking. Challenge assumptions.

--- SCRIPT STRUCTURE ---
Write all five sections below in full. Do not skip any section. 
Do not add extra sections.

## OPENING HOOK
Write 1 short paragraph (3-4 sentences maximum).
Start with a relatable workplace problem, challenge, or question that the 
learner is likely to have encountered. Do not introduce the module title or 
say welcome. Do not use phrases like In this module you will learn.
The hook must create a felt need — the learner should think yes, I have faced 
this before and want to know the answer.

## CONCEPT SCRIPTS
Write one section for each of the ${mod.key_concepts.length} key concepts.
Label each section with the concept name as a heading.

For each concept:
- Open with a one-sentence definition or core idea
- Explain the concept in plain language (2-3 short paragraphs)
- Include exactly one workplace example. The example must be specific: 
  name a role, a situation, and an outcome. Not generic (e.g. a manager 
  might...) but concrete (e.g. a customer service agent handling a billing 
  dispute would...)
- If the concept has a common misconception or mistake, name it and 
  correct it explicitly
- Close with one sentence connecting this concept to the module objective

## SLIDE NOTES
Write concise bullet points for use by a slide designer.
For each concept, provide:
- Slide title (5 words maximum)
- 3-4 bullet points (each under 10 words — these appear on screen, 
  not in the voiceover)
- One suggested visual or diagram description (e.g. flowchart showing X, 
  split-screen comparison of Y vs Z, icon grid representing...)

## KNOWLEDGE CHECK
Write one multiple choice question based on: ${mod.knowledge_check_topic}

The question must:
- Present a realistic workplace scenario, not a textbook definition question
- Require the learner to apply or analyse — not just recall
- Have exactly 4 options labelled A, B, C, D
- Have one clearly correct answer
- Have three plausible distractors — wrong answers that a learner who 
  partially understands the content might choose
- Include a feedback line for each option:
  Correct feedback: explain WHY this is right and what principle it 
  demonstrates
  Incorrect feedback: explain specifically why this option is wrong 
  without being dismissive

Format:
QUESTION: [scenario-based question text]
A. [option]
B. [option]
C. [option]
D. [option]
CORRECT ANSWER: [letter]
FEEDBACK A: [explanation]
FEEDBACK B: [explanation]
FEEDBACK C: [explanation]
FEEDBACK D: [explanation]

## MODULE SUMMARY
Write 3-4 sentences.
Sentence 1: restate what the learner has just covered (concepts, not module 
title).
Sentence 2: connect the learning to a direct on-the-job application.
Sentence 3: if applicable, bridge to what comes next in the course.
Sentence 4 (optional): a brief motivating close — but never use clichés like 
great job or well done.

--- WRITING RULES (apply throughout the entire script) ---
- No em dashes (—). Use a comma, a full stop, or rewrite the sentence.
- No filler openers: never start a section with In this module, As we 
  have learned, It is important to note, Now that we have covered, 
  or In conclusion.
- No passive voice where active is possible.
- Sentences must be under 20 words where possible. Break longer sentences.
- No unexplained acronyms. Define on first use: Full Term (ACRONYM).
- No hedging language: avoid might, could possibly, it seems, 
  in some cases unless genuinely needed for accuracy.
- Write for the ear, not the eye — this is a voiceover script. Short 
  sentences. Natural rhythm. Read it aloud before finalising.
- Use second person (you, your) throughout to address the learner directly.
- Tone: expert peer, not lecturer. Knowledgeable but conversational.`;
}

export function buildPrompt({ title, objectives, additionalInfo, audienceLevel, numModules, moduleBreakdown }) {
  // Base metadata
  let prompt = `You are an expert instructional designer. Create a detailed eLearning course script.\n\n`;
  prompt += `Course title: ${title}\n`;
  prompt += `Audience level: ${audienceLevel}\n`;
  prompt += `Learning objectives (one per line):\n${objectives}\n\n`;
  if (additionalInfo && additionalInfo.trim()) {
    prompt += `Additional context:\n${additionalInfo}\n\n`;
  }

  // Prepare a strict modules_input JSON that preserves exact titles
  let modulesInput = [];
  if (moduleBreakdown && moduleBreakdown.trim()) {
    const lines = moduleBreakdown
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(Boolean);

    // Parse each line into title + optional guidance (split on "—" or ":" or " - ")
    lines.forEach((line, i) => {
      let titlePart = line;
      let guidancePart = '';
      // split on common dash characters or colon — use alternation to avoid char-class range errors
      const splitMatch = line.split(/\s+(?:—|–|-|:)\s+/, 2);
      if (splitMatch.length === 2) {
        titlePart = splitMatch[0].trim();
        guidancePart = splitMatch[1].trim();
      }
      modulesInput.push({
        module_number: i + 1,
        title: titlePart,
        guidance: guidancePart
      });
    });

    // Inject the structured modules_input for the model to reference
    prompt += `User-provided module breakdown (STRICT - do not modify titles). The agent must use these titles EXACTLY as the "title" field in the output JSON. Any trailing guidance after the title should only inform the script content, never replace or alter the title.\n\n`;
    prompt += `modules_input = ${JSON.stringify(modulesInput, null, 2)}\n\n`;

    prompt += `CRITICAL INSTRUCTIONS WHEN modules_input IS PRESENT:\n`;
    prompt += `- Use the module titles exactly as provided in modules_input[*].title. Do NOT rename, rephrase, change capitalization, punctuation, merge, split or reorder these titles.\n`;
    prompt += `- If modules_input[*].guidance is non-empty, use it only as background guidance for the script content for that module. Do NOT use guidance as the module title.\n`;
    prompt += `- Generate one script section for each entry in modules_input, in the same order. Ignore the 'Number of modules' value if it conflicts with the provided breakdown; follow modules_input length instead.\n\n`;
  } else {
    // No breakdown — instruct agent to generate modules based on numModules
    prompt += `Instruction: Create ${numModules} modules (give each a clear title and a detailed script) that together satisfy the learning objectives above.\n\n`;
  }

  // Output format guidance (enforce exact title usage)
  prompt += `OUTPUT FORMAT: Return ONLY valid JSON (no explanation). The JSON must match this exact structure and must set each module.title exactly equal to the corresponding modules_input.title when modules_input was provided.\n\n`;
  prompt += `{\n  "course_title": "<course title>",\n  "modules": [\n    { "module_number": 1, "title": "<module title - EXACT match to modules_input.title when provided>", "script": "<full script text>" }\n    ...\n  ]\n}\n\n`;
  prompt += `When modules_input is provided: the "title" field in the output MUST be identical (character-for-character) to the corresponding modules_input.title. If you believe a suggested alternative title is useful, include it only in an extra field 'suggested_title' but still set 'title' to the exact input. Do not produce any text outside the JSON.\n\n`;
  prompt += `Be concise in titles and verbose in scripts. Do not include any extra commentary outside the JSON.\n`;

  return prompt;
}