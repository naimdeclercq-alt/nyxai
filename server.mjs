import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    const apiKey = process.env.TAVILY_API_KEY || process.env.NEBIUS_API_KEY || "";

    const postData = JSON.stringify({
        query: message,
        search_depth: "advanced",
        include_answer: true,
        topic: "general"
    });

    const options = {
        hostname: 'api.tavily.com',
        port: 443,
        path: '/search',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'Content-Length': Buffer.byteLength(postData)
        },
        rejectUnauthorized: false
    };

    const apiReq = https.request(options, (apiRes) => {
        let responseData = '';
        apiRes.on('data', (chunk) => { responseData += chunk; });
        apiRes.on('end', () => {
            try {
                const data = JSON.parse(responseData);
                const reply = data.answer || (data.results && data.results[0] && data.results[0].content) || data.message || "Aucun résultat trouvé.";
                res.json({ reply });
            } catch (e) {
                res.status(500).json({ reply: "Erreur de format de réponse de l'API" });
            }
        });
    });

    apiReq.on('error', (error) => {
        res.status(500).json({ reply: "Erreur lors de la communication avec l'API" });
    });

    apiReq.write(postData);
    apiReq.end();
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${3001}`);
});