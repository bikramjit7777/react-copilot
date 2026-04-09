import { model } from "../llm/gemini.js";

export async function coderAgent(state) {
    const response = await model.invoke(`
        You are a senior software engineer. 
        User request: 
        ${state.userQuery}

        Implement the following task: 
        ${JSON.stringify(state.plan, null, 2)}
        
        Write production-style code. Focus on clean, maintainable code with comments. Return only code with short inline comments where needed.
    `);
    return { code: response.content };
}