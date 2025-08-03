import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              Developed by <span className="font-semibold text-foreground">Zulqarnain</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Roll No: <span className="font-semibold text-foreground">191120</span>
            </p>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for cybersecurity awareness</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Smart Security Platform
            </p>
            <p className="text-sm text-muted-foreground">
              All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;