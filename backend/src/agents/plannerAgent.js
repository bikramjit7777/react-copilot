import { model } from "../llm/gemini.js";
import { PlanSchema } from "../schemas/taskSchemas.js";

const plannerModel = model.withStructuredOutput(PlanSchema);

export async function plannerAgent(state) {
    const result = await plannerModel.invoke(`
        You are a senior software architect. Break this request into implementation tasks for a multi-agent software assistant.

        User Request: ${state.userQuery}

        Return:
        - Summary of the plan
        - tasks with assigned agents
    `);

    return {plan: result};
}