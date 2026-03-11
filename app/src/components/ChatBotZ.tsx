"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Bot, User, Loader2, Sparkles } from "lucide-react";
import { chatWithZ } from "@/actions/aiActions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "model";
    content: string;
}

export default function ChatBotZ() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "model",
            content: "Hello! I'm Z, your Zero-Knowledge expert. Ask me anything about how ZK-Certify works, SNARK proofs, or our privacy guarantees!",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            // Convert messages to history format expected by Gemini
            const history = messages.map((msg) => ({
                role: msg.role === "user" ? "user" : "model",
                parts: msg.content,
            }));

            const response = await chatWithZ(userMessage, history);

            if (response.success && response.data) {
                setMessages((prev) => [...prev, { role: "model", content: response.data }]);
            } else {
                toast.error(response.message || "Z is having trouble connecting right now. Please try again.");
            }
        } catch (error) {
            console.error("Chat error:", error);
            toast.error("Failed to send message.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <Button
                variant="outline"
                size="lg"
                className="gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary transition-all duration-300 group shadow-lg hover:shadow-primary/20"
                onClick={() => setIsOpen(true)}
            >
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                HAVE DOUBTS?
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center sm:items-end sm:justify-end sm:p-6 bg-background/80 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none animate-in fade-in duration-200">
                    <div className="relative w-full h-full sm:h-[600px] sm:w-[400px] bg-card/95 backdrop-blur-xl border border-border sm:rounded-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 zoom-in-95 duration-300 overflow-hidden ring-1 ring-white/10 text-left">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                                        <Bot className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-card"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                        Ask Z <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                                    </h3>
                                    <p className="text-xs text-muted-foreground font-medium">AI Zero-Knowledge Expert</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth" ref={scrollRef}>
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex gap-3 max-w-[85%]",
                                        msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "h-8 w-8 rounded-full border flex items-center justify-center overflow-hidden shrink-0 shadow-sm",
                                        msg.role === "user" ? "border-primary/20 bg-primary/5" : "border-border bg-muted"
                                    )}>
                                        {msg.role === "user" ? (
                                            <User className="h-4 w-4 text-primary" />
                                        ) : (
                                            <Bot className="h-4 w-4 text-foreground" />
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-1 min-w-0">
                                        <div
                                            className={cn(
                                                "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                                                msg.role === "user"
                                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                                    : "bg-muted/50 border border-border rounded-tl-none"
                                            )}
                                        >
                                            {msg.content}
                                        </div>
                                        <span className={cn(
                                            "text-[10px] text-muted-foreground opacity-70 px-1",
                                            msg.role === "user" ? "text-right" : "text-left"
                                        )}>
                                            {index === 0 ? "Just now" : "Just now"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3 max-w-[85%]">
                                    <div className="h-8 w-8 rounded-full border border-border bg-muted flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                                        <Bot className="h-4 w-4 text-foreground" />
                                    </div>
                                    <div className="bg-muted/50 border border-border rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                        <span className="text-xs text-muted-foreground animate-pulse">Thinking...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-border bg-background/50 backdrop-blur-sm">
                            <div className="relative flex items-center gap-2">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask about SNARK proofs..."
                                    className="pr-12 py-6 rounded-xl bg-muted/50 border-muted-foreground/10 focus-visible:ring-primary/20 shadow-inner"
                                    disabled={isLoading}
                                />
                                <Button
                                    size="icon"
                                    className="absolute right-2 h-9 w-9 rounded-lg transition-all hover:scale-105 shadow-sm"
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-[10px] text-center text-muted-foreground mt-3 opacity-70">
                                Z is an AI assistant and can make mistakes.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
