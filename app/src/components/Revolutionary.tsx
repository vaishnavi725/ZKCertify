"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, X, GraduationCap, CreditCard, User } from "lucide-react";

const Revolutionary = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <section className="py-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                            Why It's Revolutionary
                        </h2>
                        <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                            <p>
                                What makes this powerful is simplicity. For the employee, it's
                                just clicking a link in their inbox. For the employer, it's
                                receiving an email with a verified result. Underneath, though,
                                it's state-of-the-art cryptography ensuring privacy,
                                authenticity, and tamper-proof verification.
                            </p>
                            <p>
                                No private data is stored anywhere. The entire codebase is open
                                source, so anyone can audit how it works. And because it's tied
                                to Digilocker, only official government-signed certificates are
                                accepted. Fake or edited PDFs are instantly rejected.
                            </p>
                            <p className="font-semibold text-foreground">
                                In short: we turned background verification into a trustless,
                                privacy-preserving experience. No middlemen. No leaks. Just
                                cryptographic truth, delivered seamlessly through email.
                            </p>
                        </div>
                        <div className="pt-4">
                            <Button size="lg" className="group" onClick={() => setShowModal(true)}>
                                Start Verification
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border border-border flex items-center justify-center">
                        <div className="absolute inset-0 grid-pattern opacity-30" />
                        {/* Placeholder for an illustration or abstract graphic */}
                        <div className="text-center p-8">
                            <div className="text-6xl mb-4">🚀</div>
                            <h3 className="text-2xl font-bold mb-2">Future of Trust</h3>
                            <p className="text-muted-foreground">
                                Privacy-first, Cryptographically Secured
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </button>

                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold tracking-tight">Select Verification Type</h2>
                            <p className="text-muted-foreground mt-2">Choose the type of document you want to verify</p>
                        </div>

                        <div className="grid gap-4">
                            <Link href="/academic" className="block group">
                                <div className="flex items-center p-4 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20">
                                        <GraduationCap className="h-5 w-5 text-primary group-hover:text-accent-foreground" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold group-hover:text-accent-foreground">Academic Verification</h3>
                                        <p className="text-sm text-muted-foreground group-hover:text-accent-foreground">Verify degrees, transcripts, and certificates</p>
                                    </div>
                                    <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </Link>

                            <Link href="/pan" className="block group">
                                <div className="flex items-center p-4 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20">
                                        <CreditCard className="h-5 w-5 text-primary group-hover:text-accent-foreground" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold group-hover:text-accent-foreground">Pancard Verification</h3>
                                        <p className="text-sm text-muted-foreground group-hover:text-accent-foreground">Verify identity using PAN card documents</p>
                                    </div>
                                    <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </Link>

                            <Link href="/name" className="block group">
                                <div className="flex items-center p-4 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20">
                                        <User className="h-5 w-5 text-primary group-hover:text-accent-foreground" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold group-hover:text-accent-foreground">Name Verification</h3>
                                        <p className="text-sm text-muted-foreground group-hover:text-accent-foreground">Verify name consistency across documents</p>
                                    </div>
                                    <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Revolutionary;
