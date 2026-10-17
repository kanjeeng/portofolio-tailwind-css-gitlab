import Link from "next/link";
import SocialLinks from "./SocialLinks";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/project" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-dark pt-24 pb-12">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full px-4 mb-12 text-slate-300 font-medium md:w-1/3">
            <h2 className="font-bold text-4xl mb-5">
              <span className="text-2xl font-bold text-white-900 tracking-tight">
                Portofolio<span className="text-blue-600">.</span>
              </span>
            </h2>
            <h3 className="font-bold text-2xl mb-2 text-white">Get in Touch</h3>
            <p>dimasleny210@gmail.com</p>
            <p>Probolinggo, East Java</p>
            <p>Indonesia</p>
          </div>
          <div className="w-full px-4 mb-12 md:w-1/3">
            <h3 className="font-semibold text-xl text-white mb-5">Focus Areas</h3>
            <ul className="text-slate-300">
              <li>
                <span className="inline-block text-base text-secondary mb-3">
                  DevOps &amp; Automation
                </span>
              </li>
              <li>
                <span className="inline-block text-base text-secondary mb-3">
                  Cloud Infrastructure
                </span>
              </li>
              <li>
                <span className="inline-block text-base text-secondary mb-3">
                  Security &amp; Networking
                </span>
              </li>
            </ul>
          </div>

          <div className="w-full px-4 mb-12 md:w-1/3">
            <h3 className="font-semibold text-xl text-white mb-5">Quick Links</h3>
            <ul className="text-slate-300">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-base text-secondary hover:text-primary transition-colors duration-300 mb-3"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full pt-10 border-t border-slate-800">
          <div className="flex items-center justify-center mb-5">
            <SocialLinks />
          </div>
          <p className="font-medium text-xs text-slate-500 text-center">
            Built with <span className="text-pink-500">❤️</span> by{" "}
            <a
              href="https://www.instagram.com/kanjeeng__/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-primary"
            >
              Kanjeng Dhimas Cahyoherlina
            </a>
            , using{" "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-sky-400"
            >
              Tailwind CSS
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
