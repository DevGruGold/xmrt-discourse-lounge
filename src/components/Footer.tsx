import { Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-card/50 backdrop-blur-sm mt-auto py-6 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail className="w-4 h-4" />
            <a href="mailto:xmrtsolutions@gmail.com">
              xmrtsolutions@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            <a href="https://wa.me/50661500559" target="_blank" rel="noopener noreferrer">
              WhatsApp: +506 6150 0559
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};