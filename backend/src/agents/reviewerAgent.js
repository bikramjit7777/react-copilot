import { model } from "../llm/gemini.js";

import { ReviewSchema } from "../schemas/taskSchemas.js";

const reviewerModel = model.withStructuredOutput(ReviewSchema);

export async function reviewerAgent(state) {
    const result = await reviewerModel.invoke(`
        You are a senior code reviewer. 

        Review this output:

        PLAN:
        ${JSON.stringify(state.plan, null, 2)}

        CODE:
        ${state.code || ""}

        TESTS:
        ${state.tests || ""}    

        DOCUMENTATION:
        ${state.documentation || ""}        

        Appove only if: 
        - code is coherent
        - tests are relevant and cover the main functionality
        - documentation is clear and helpful

        Return
        - approved
        - feedback
        - nextStep
    `)

    return { review: result };
}