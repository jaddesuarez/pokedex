import { Github, Linkedin, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 px-6 bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="hidden md:flex justify-between items-center">
          <div className="flex space-x-4">
            <a
              href="https://github.com/jaddesuarez"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/jaddesuarez"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={24} />
            </a>
          </div>

          <div className="flex items-center">
            <span>Created with</span>
            <Heart className="mx-2 text-red-500" size={20} fill="red" />
            <span>by Jadde Suarez</span>
          </div>

          <div>
            <p>© {currentYear} All rights reserved</p>
          </div>
        </div>

        <div className="md:hidden flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            <a
              href="https://github.com/jaddesuarez"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/jaddesuarez"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={24} />
            </a>
          </div>

          <div className="flex items-center">
            <span>Created with</span>
            <Heart className="mx-2 text-red-500" size={20} fill="red" />
            <span>by Jadde Suarez</span>
          </div>

          <div>
            <p>© {currentYear} All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
