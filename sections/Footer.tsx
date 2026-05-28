import { GitHubIcon, LinkedInIcon, WhatsAppIcon, InstagramIcon } from "@/components/Icons";

const WHATSAPP_NUMBER  = "553399875063";
const WHATSAPP_MESSAGE = "Olá, Vitor! Gostaria de conversar sobre um projeto.";

const FOOTER_SOCIALS = [
  {
    href:  "https://github.com/vitorrodrigues-dev",
    icon:  GitHubIcon,
    label: "GitHub",
  },
  {
    href:  "https://www.linkedin.com/in/vitor-rodrigues-da-silva/",
    icon:  LinkedInIcon,
    label: "LinkedIn",
  },
  {
    href:  "https://www.instagram.com/devvitor7/",
    icon:  InstagramIcon,
    label: "Instagram",
  },
  {
    href:  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    icon:  WhatsAppIcon,
    label: "WhatsApp",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 bg-zinc-50/60 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Brand */}
          <div className="space-y-1">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Vitor Rodrigues
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              Front-end · Sistemas · Automações
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-1">
            {FOOTER_SOCIALS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 flex items-center justify-center rounded-md text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-110 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800/60">
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            © {currentYear} Vitor Rodrigues. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
