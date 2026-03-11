import { Shield, FileX, Database } from "lucide-react";

const ProblemSolved = () => {
    return (
        <section className="py-24 bg-muted/50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="max-w-3xl mx-auto text-center space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                            The Problem We Solved
                        </h2>
                        <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                    </div>

                    <div className="prose prose-lg dark:prose-invert mx-auto leading-relaxed text-muted-foreground">
                        <p>
                            Background verification has always felt outdated. An employer asks
                            for your documents, a third-party agency collects them, and
                            suddenly your most personal information — your identity, your
                            certificates, your government IDs — is sitting in someone else's
                            database. It's inefficient, it's risky, and worst of all, it
                            forces you to give up control of your own data.
                        </p>
                        <p>
                            We wanted to rethink this from the ground up. What if verification
                            didn't require handing over documents at all? What if you could
                            prove the truth of your records — without ever exposing them?
                        </p>
                        <p className="text-xl font-semibold text-foreground">
                            That's exactly what we built.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                        <div className="flex flex-col items-center space-y-2">
                            <div className="p-3 bg-background rounded-full shadow-sm">
                                <FileX className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold">No Documents Shared</h3>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <div className="p-3 bg-background rounded-full shadow-sm">
                                <Database className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold">No Central Database</h3>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <div className="p-3 bg-background rounded-full shadow-sm">
                                <Shield className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold">Full User Control</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSolved;
