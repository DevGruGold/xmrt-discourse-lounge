import { Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-card mt-auto py-6 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <a href="mailto:xmrtsolutions@gmail.com" className="hover:text-primary transition-colors">
              xmrtsolutions@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <a href="https://wa.me/50661500559" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              WhatsApp: +506 6150 0559
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};