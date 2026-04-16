import { StateGraph, START, END, MessagesAnnotation} from "@langchain/langgraph"
import { coderAgent } from "../agents/coderAgent.js";
import { classifierAgent } from "../agents/classifierAgent.js";
import { plannerAgent } from "../agents/plannerAgent.js";
import { testAgent } from "../agents/testAgent.js";
import { documentorAgent } from "../agents/docsAgent.js";
import { reviewerAgent } from "../agents/reviewerAgent.js";

function routeAfterClassification(state) {
    if(state.classification?.isCodingQuestion) return "planner";
    return "nonCoding";
}

const GraphState = MessagesAnnotation;

function routeAfterReview(state) {
    if(state.review?.approved || state.review?.nextStep === "completed" ) return END;
    if(state.review?.nextStep === "coder") return "coder";
    if(state.review?.nextStep === "tester") return "tester";
    if(state.review?.nextStep === "documenter") return "documenter";

    return END;
}



export const buildSoftwareAssistantGraph = () => {
    const graph = new StateGraph({
        channels: {
            userQuery: null,
            classification: null,
            plan: null,
            code: null,
            tests: null,    
            documentation: null,
            review: null,
            finalMessage: null
        },
    });

    graph
        .addNode("classifier", classifierAgent)
        .addNode("planner", plannerAgent)
        .addNode("coder", coderAgent)
        .addNode("tester", testAgent)
        .addNode("documenter", documentorAgent)
        .addNode("reviewer", reviewerAgent)
        .addEdge(START, "classifier")
        .addConditionalEdges("classifier", routeAfterClassification)
        .addEdge("planner", "coder")
        .addEdge("coder", "tester")
        .addEdge("tester", "documenter")
        .addEdge("documenter", "reviewer")
        .addEdge("nonCoding", END)
        .addConditionalEdges("reviewer", routeAfterReview)

    return graph.compile();   
}

