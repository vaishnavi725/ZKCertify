"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Lock, Shield, Zap, X, GraduationCap, CreditCard, User } from "lucide-react";
import ChatBotZ from "./ChatBotZ";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="relative pt-24 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center gap-2 text-center max-w-4xl mx-auto">
          <img src="/zk-certify_logo.png" alt="ZK-Certify Logo" className="h-40 w-70 -my-12" />
          <div className="fade-in">
            <Badge variant="secondary" className="mb-4">
              <Shield className="w-3 h-3 mr-1" />
              Trustless Verification
            </Badge>
          </div>

          <div className="space-y-4 slide-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
              Zero Knowledge
              <br />
              <span className="text-muted-foreground">Verification</span>
            </h1>

            <div className="w-full overflow-hidden">
              <div className="flex whitespace-nowrap animate-marquee-rtl">
                <p className="text-lg md:text-xl text-muted-foreground font-mono mx-4">
                  Zero-knowledge proofs meet DigiLocker. Verify credentials instantly while keeping your documents private. No middlemen, no databases, no compromises.
                </p>
                <p className="text-lg md:text-xl text-muted-foreground font-mono mx-4">
                  Zero-knowledge proofs meet DigiLocker. Verify credentials instantly while keeping your documents private. No middlemen, no databases, no compromises.
                </p>
                <p className="text-lg md:text-xl text-muted-foreground font-mono mx-4">
                  Zero-knowledge proofs meet DigiLocker. Verify credentials instantly while keeping your documents private. No middlemen, no databases, no compromises.
                </p>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button size="lg" className="group" onClick={() => setShowModal(true)}>
              Start verification
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <ChatBotZ />
          </div>

          <div className="flex flex-wrap justify-center gap-8 pt-8 opacity-60">
            <div className="flex items-center gap-2 text-sm">
              <Lock className="h-4 w-4" />
              <span>Zero-knowledge proofs</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4" />
              <span>Government-signed PDFs</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4" />
              <span>Instant verification</span>
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

export default Hero;
