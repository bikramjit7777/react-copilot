import { model } from "../llm/gemini.js";

export async function documentorAgent(state) {
    const response = await model.invoke(`
        You are a senior technical writer.
        
        Given this JavaScript code:
        ${state.code}
        
        Write clear documentation with:
        - overview
        - purpose of the code
        - installation instructions
        - usage
        - example

        Return markdown
    `);

    return { documentation: response.content };
}