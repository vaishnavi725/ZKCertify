import { Shield, Github, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 md:px-6 py-12">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="flex items-center space-x-2">
            <img src="/zk-certify_logo.png" alt="ZK-Certify Logo" className="h-8 w-8" />
            <span className="text-xl font-bold">ZK-Certify</span>
          </div>

          <p className="text-sm text-muted-foreground max-w-md">
            Trustless background verification with DigiLocker and SNARK
            proofs. Secure, private, employer-ready.
          </p>

          <div className="flex space-x-4">
            <Button variant="ghost" size="sm">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 ZK-Certify. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Built with zero-knowledge proofs</span>
            <div className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>Open source</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
