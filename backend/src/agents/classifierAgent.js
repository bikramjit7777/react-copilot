import { model } from "../llm/gemini.js";
import { CodingIntentSchema } from "../schemas/taskSchemas.js";

const classfierModel = model.withStructuredOutput(CodingIntentSchema);

export async function classifierAgent(state) {
    const result = await classfierModel.invoke(
        `You are a strict classifier that determines if a user's question is related to coding.
        Determine whether this user request is mainly about software development, coding, debugging, architecture,
        APIs, frontend, backend, databases, DevOps, testing, documentation, or programming.

        User request: ${state.userQuery}

        return: 
        - isCodingQuestion
        - reason (a brief explanation of why you classified it as coding or not coding)
    `);
    return {
    classification: result}
}