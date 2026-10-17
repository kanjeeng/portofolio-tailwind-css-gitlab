import RetroGrid from "@/components/magicui/retro-grid";
import IconCloud from "@/components/magicui/icon-cloud";
import SkillCategoryGrid from "@/components/SkillCategoryGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

// icon-Cloud — DevOps toolset
const slugs = [
  "amazonaws",
  "googlecloud",
  "docker",
  "kubernetes",
  "githubactions",
  "gitlab",
  "jenkins",
  "ansible",
  "terraform",
  "linux",
  "gnubash",
  "python",
  "go",
  "cplusplus",
  "git",
  "github",
  "wireshark",
  "wireguard",
  "nginx",
  "grafana",
];

// Skills grouped by category. Tools with an official logo in simple-icons are
// mapped to a slug above; concepts without an official logo (Proxmox, Biznet
// Gio, Subnetting, etc.) are rendered as plain text badges instead.
const skillCategories = [
  {
    title: "Cloud & Virtualization",
    items: [
      { label: "AWS", slug: "amazonaws" },
      { label: "Google Cloud Platform (GCP)", slug: "googlecloud" },
      { label: "Biznet Gio Cloud" },
      { label: "Proxmox VE" },
    ],
  },
  {
    title: "Containerization & Orchestration",
    items: [
      { label: "Docker", slug: "docker" },
      { label: "Kubernetes", slug: "kubernetes" },
    ],
  },
  {
    title: "CI/CD & Automation",
    items: [
      { label: "GitHub Actions", slug: "githubactions" },
      { label: "GitLab CI", slug: "gitlab" },
      { label: "Jenkins", slug: "jenkins" },
      { label: "Ansible", slug: "ansible" },
      { label: "Terraform", slug: "terraform" },
    ],
  },
  {
    title: "Networking & Security",
    items: [
      { label: "VPN Gateway", slug: "wireguard" },
      { label: "TCP/IP" },
      { label: "Subnetting" },
      { label: "Penetration Testing" },
      { label: "SIEM" },
    ],
  },
  {
    title: "OS, Administration & Scripting",
    items: [
      { label: "Linux System Administration", slug: "linux" },
      { label: "Bash", slug: "gnubash" },
      { label: "Python", slug: "python" },
      { label: "Go", slug: "go" },
      { label: "C++", slug: "cplusplus" },
    ],
  },
];

export default function Skills() {
  return (
    <>
      <RetroGrid className="fixed bg-dark bg-opacity-20" />
      <Navbar />

      {/* Skill Section Start */}
      <section id="skills" className="section pt-32 pb-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container">
          <div className="w-full px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h4 className="font-bold uppercase text-primary text-sm tracking-widest mb-3">
                Technical Toolkit
              </h4>
              <h2 className="font-bold text-dark text-3xl mb-5 sm:text-4xl lg:text-5xl">
                Tools I Rely On
              </h2>
              <p className="font-medium text-base text-secondary md:text-lg leading-relaxed">
                The technologies and tools I use daily as a DevOps & Security Engineer — spanning
                cloud platforms, containers, CI/CD, and network security.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm mb-14">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl">
                <IconCloud iconSlugs={slugs} />
              </div>
            </div>

            <SkillCategoryGrid categories={skillCategories} />
          </div>
        </div>
      </section>
      {/* Skill Section End */}

      <Footer />
      <BackToTop />
      <script src="/script.js" />
    </>
  );
}
