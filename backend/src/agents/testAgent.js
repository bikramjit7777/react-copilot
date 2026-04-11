import { model } from "../llm/gemini.js";
export async function testAgent(state) {
    const response = await model.invoke(`
        You are a senior QA engineer. 
        Given this JavaSCript code:
        ${state.code}

        Write unit tests using Jest.
        Return only the test code with short inline comments where needed.
    `);
    return { tests: response.content };
}