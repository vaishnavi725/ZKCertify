const apiKey = "AIzaSyBEbXrhjRtbYvRps1h-LMFztbSPcVwVhRw";

if (!apiKey) {
    console.error("Could not find GEMINI_API_KEY");
    process.exit(1);
}

console.log("Found API Key (length):", apiKey.length);

async function listModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
            console.error("API Error:", JSON.stringify(data.error, null, 2));
        } else {
            console.log("Available Models:");
            if (data.models) {
                data.models.forEach(m => {
                    if (m.supportedGenerationMethods.includes("generateContent")) {
                        console.log(`- ${m.name}`);
                    }
                });
            } else {
                console.log("No models found in response", data);
            }
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

listModels();
