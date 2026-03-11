# WISK: Trustless Background Verification

**WISK** is a privacy-first, zero-knowledge background verification system. It allows anyone to prove the authenticity of their official documents (like DigiLocker certificates) without actually sharing the document itself.

## What Problem Does It Solve?
Traditional background verification is broken. When an employer or institution asks for your documents, a third-party background-check agency collects them. Your most sensitive and personal information—like your identity, your academic certificates, and your government IDs—ends up sitting in someone else's database. It's inefficient, risky, prone to data leaks, and forces you to give up control over your own data. 

## How It Works
WISK completely removes the middleman from the verification process using advanced cryptography.

1. **The Request**: An employer wants to verify a candidate and sends a simple verification request via email.
2. **The Proof**: The candidate clicks the link in the email and uploads their DigiLocker-issued certificate (a natively government-signed PDF) directly in their web browser. 
3. **Zero-Knowledge Magic**: The entire verification happens locally on the candidate's device. The system mathematically verifies the government's digital signature embedded in the PDF to ensure the document hasn't been tampered with. It then checks if the requested details (like your name or ID number) actually exist in the document. 
4. **The Result**: Instead of sending the actual PDF to the employer, WISK securely generates a **Zero-Knowledge Proof**. This cryptographic proof simply guarantees: *"Yes, this document is 100% real, it is officially signed by the government, and it contains the requested details."*
5. **Verification**: This mathematical proof is emailed back to the employer, who can instantly and trustlessly verify it. 

The raw PDF never leaves the candidate's device. 

## Why Is It Effective in the Real World?
- **Uncompromising Privacy**: Your raw documents are never uploaded, stored on a server, or seen by human reviewers. No private data is ever stored anywhere.
- **Impossible to Fake**: Because the system mathematically validates the government's digital signature embedded inside the file, any edited, photoshopped, or forged PDFs are instantly rejected.
- **Incredibly Simple for Users**: For the employee, it’s just clicking a link and selecting a file. For the employer, it’s receiving a guaranteed mathematical "Yes/No" verification email. 
- **Zero Middlemen**: It replaces expensive, slow background verification agencies with instant cryptography.
- **Data Ownership**: You remain in total control of your digital identity, only sharing the exact facts required and nothing more.
