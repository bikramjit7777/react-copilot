import "dotenv/config"
import expreess from "express";
import cors from "cors"
import { buildSoftwareAssistantGraph } from "./graph/softwareAssistantGraph.js";

const app = expreess();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(expreess.json({limit: "2mb"}));

const assistantGraph = buildSoftwareAssistantGraph();

app.get("/api/health", async(req, res) => {
    res.json({ ok: true, message: "Software assistant is running!" });
})

app.post("/api/assistant", async(req, res) => {
    try {
        const {query} = req.body;
        if(!query || !query.trim()) {
            return res.status(400).json({ ok: false, message: "Query is required" });
        }

        const result = await assistantGraph.invoke({
            userQuery: query.trim()
        })

        if(result.finalMessage) {
            return res.json({
                ok: true,
                isCodingQuestion: false,
                message: result.finalMessage
            })
        }
        return res.json({
            ok: true,
            isCodingQuestion: true,
            data: {
                plan: result.plan,
                code: result.code,
                tests: result.tests,
                documentation: result.documentation,
                review: result.review
            }
        })
    } catch (error) {
        console.error("Error processing assistant request:", error);
        res.status(500).json({ ok: false, message: "Something went wrong" });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

