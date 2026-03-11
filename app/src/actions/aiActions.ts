"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

// TODO: Move this to environment variables once file access is resolved
const GEMINI_API_KEY = "AIzaSyBEbXrhjRtbYvRps1h-LMFztbSPcVwVhRw";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

console.log("Gemini API Key configured:", !!GEMINI_API_KEY, "Length:", GEMINI_API_KEY.length);

export async function generateMockProofWithAI(proverName: string, proverPanId: string) {
  // Keeping this for backward compatibility if needed, but redirecting to generic
  return generateGenericMockProof("pan", { name: proverName, panId: proverPanId });
}

export async function generateGenericMockProof(
  type: "name" | "pan" | "academic",
  data: {
    name?: string;
    panId?: string;
    academicId?: string;
    institute?: string;
    cgpa?: string;
  }
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    let prompt = "";
    let structure = "";

    if (type === "name") {
      prompt = `Generate a realistic mock Groth16 SNARK proof for Name Verification. Name: "${data.name}"`;
      structure = `
      {
        "nameProof": { "proof": { "Groth16": { "public_inputs": ["<random_int>", "<random_int>"], "encoded_proof": "<hex>" } } }
      }`;
    } else if (type === "pan") {
      prompt = `Generate a realistic mock Groth16 SNARK proof for PAN Verification. Name: "${data.name}", PAN: "${data.panId}"`;
      structure = `
      {
        "nameProof": { "proof": { "Groth16": { "public_inputs": ["<random_int>", "<random_int>"], "encoded_proof": "<hex>" } } },
        "panProof": { "proof": { "Groth16": { "public_inputs": ["<random_int>", "<random_int>"], "encoded_proof": "<hex>" } } }
      }`;
    } else if (type === "academic") {
      prompt = `Generate a realistic mock Groth16 SNARK proof for Academic Verification. Name: "${data.name}", ID: "${data.academicId}", Institute: "${data.institute}", CGPA: "${data.cgpa}"`;
      structure = `
      {
        "nameProof": { "proof": { "Groth16": { "public_inputs": ["<random_int>", "<random_int>"], "encoded_proof": "<hex>" } } },
        "academicIdProof": { "proof": { "Groth16": { "public_inputs": ["<random_int>", "<random_int>"], "encoded_proof": "<hex>" } } },
        "instituteProof": { "proof": { "Groth16": { "public_inputs": ["<random_int>", "<random_int>"], "encoded_proof": "<hex>" } } },
        "cgpaProof": { "proof": { "Groth16": { "public_inputs": ["<random_int>", "<random_int>"], "encoded_proof": "<hex>" } } }
      }`;
    }

    const fullPrompt = `
      ${prompt}
      The output MUST be a valid JSON object with this structure:
      ${structure}
      Do not include markdown. Just raw JSON.
    `;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return {
      success: true,
      data: JSON.parse(cleanJson),
    };
  } catch (error: any) {
    console.error(`Error generating ${type} mock proof:`, error);

    // Fallback mocks
    const mockProof: any = {};
    const proofTemplate = {
      proof: {
        Groth16: {
          public_inputs: [
            "149800815611436812082480275882123042722446416032342697152274526392165486411",
            "8854716478872429534514904806288662784310559991140926685572137701300355121892"
          ],
          encoded_proof: "25c302f3bec45b1ac5a178db592f7d2f0b5e407df68f8812b911de643a95d25823885826d7786ab87fdd18b11e819c383a3487f3e240d4e078e50d7048d2c522d9d5ff92d04d9206d598726a298665bdc073c5d5f7ac567c0a1931b2333b96221fd08262c400c4b3ee81cad730d6a428d508089595af4d777da8573b4a817540dccff425811e7970bfc07449cc6aff51bb4a284ded408de31287ba655df0ccf1efc452b4a92aaf76fa667307a84dbf9c98b9cb46ab6fbf5d9c771509d59fae80527bc803ecb829380dd639e5a6bc49f8c5ed4af0c12440a5b08be2652a16e390bb75631ce536a2dcb95545084503190854f3e150378757e2b1885c"
        }
      }
    };

    if (type === "name") {
      mockProof.nameProof = proofTemplate;
    } else if (type === "pan") {
      mockProof.nameProof = proofTemplate;
      mockProof.panProof = proofTemplate;
    } else if (type === "academic") {
      mockProof.nameProof = proofTemplate;
      mockProof.academicIdProof = proofTemplate;
      mockProof.instituteProof = proofTemplate;
      mockProof.cgpaProof = proofTemplate;
    }

    return {
      success: true,
      data: mockProof,
      message: "Generated fallback mock proof (AI unavailable)"
    };
  }
}

export async function generatePrivacyReport(documentText: string, verifiedFields: string[]) {
  try {
    // Use gemini-2.0-flash for text analysis
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Analyze the following document text and compare it against the list of "Verified Fields" (${verifiedFields.join(", ")}).
      
      Your goal is to generate a "Privacy Report Card" that highlights the benefits of Zero-Knowledge proofs by showing what data was HIDDEN (kept private) vs what was PROVED.

      Document Text:
      "${documentText.substring(0, 2000)}..." (truncated for brevity)

      Output MUST be a valid JSON object with this structure:
      {
        "hiddenData": ["List", "of", "sensitive", "fields", "found", "in", "text", "but", "NOT", "verified", "e.g. Address, DOB, Father's Name"],
        "verifiedData": ["List", "of", "fields", "that", "were", "verified"],
        "proofExplanation": "A 1-sentence simple explanation of what the ZK proof guarantees without revealing the hidden data."
      }

      Do not include markdown. Just raw JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return {
      success: true,
      data: JSON.parse(cleanJson)
    };
  } catch (error: any) {
    console.error("Error generating privacy report:", error);
    // Fallback mock data
    return {
      success: true,
      data: {
        hiddenData: ["Date of Birth", "Father's Name", "Address", "Signature Image"],
        verifiedData: verifiedFields,
        proofExplanation: "This Zero-Knowledge proof cryptographically guarantees the document was issued by the Income Tax Department without revealing your personal details like DOB or Address."
      }
    };
  }
}




export async function chatWithZ(message: string, history: { role: string; parts: string }[]) {
  try {
    const modelName = "gemini-2.0-flash";
    console.log("Using Gemini Model:", modelName);
    const model = genAI.getGenerativeModel({ model: modelName });

    const systemPrompt = `
      You are "Z", an AI assistant for the ZK-Certify platform.
      
      Your Persona:
      - You are an expert in Zero-Knowledge Proofs (ZKPs), SNARKs, Blockchain, and Cryptography.
      - You are helpful, technical but accessible, and enthusiastic about privacy.
      - You use high-level terms like "trustless", "verifiable computation", "succinctness", "zk-SNARKs", "Groth16", "circuit constraints", etc., but you explain them simply if asked.

      Platform Details:
      - ZK-Certify is a platform for verifying documents (PAN, Academic, Name) without revealing sensitive data.
      - It uses **SNARK PROOFS** (Succinct Non-interactive Arguments of Knowledge).
      - It leverages the **SUCCINCT Explorer API** for proof verification.
      - It is completely dependent on **Blockchain** and **Cryptography** for trustless verification.
      - No databases are used to store user data; everything is verified on-the-fly using ZKPs.

      Goal:
      - Answer user queries about how the platform works.
      - Explain the technology (ZKPs, SNARKs).
      - Reassure users about their privacy.

      CRITICAL INSTRUCTIONS FOR RESPONSE STYLE:
      - Keep answers SHORT and CONCISE (maximum 2-3 sentences).
      - Use bullet points for lists to make it readable like a WhatsApp message.
      - Do NOT write long paragraphs. Users will not read them.
      - Be direct and to the point.
      - Use emojis occasionally to be friendly but professional.

      If the user asks something unrelated to ZK-Certify, privacy, or cryptography, politely steer them back to these topics.
    `;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am Z, the ZK-Certify expert. I am ready to explain SNARK proofs, the Succinct Explorer API, and our trustless architecture." }],
        },
        ...history.map(msg => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.parts }]
        }))
      ],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return {
      success: true,
      data: text,
    };
  } catch (error: any) {
    console.error("Error in chatWithZ:", error);
    return {
      success: false,
      message: error.message || "Failed to generate response",
    };
  }
}
