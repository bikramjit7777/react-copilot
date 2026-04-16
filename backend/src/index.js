import "dotenv/config";

import { buildSoftwareAssistantGraph } from "./graph/softwareAssistantGraph.js";

const app = buildSoftwareAssistantGraph();

const result = await app.invoke({
    userQuery: `Create a JavaScript utility that validates email addresses,
    documents the function, and writes Jest Unit tests for it.`
});

console.log("\n======PLAN======\n", result.plan);
console.log("\n======CODE======\n", result.code);
console.log("\n======TESTS======\n", result.tests);
console.log("\n======DOCUMENTATION======\n", result.documentation);
console.log("\n======REVIEW======\n", result.review);
