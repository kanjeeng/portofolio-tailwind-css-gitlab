import RetroGrid from "@/components/magicui/retro-grid";
import { cn } from "@/lib/utils";
import ContactForm from "@/components/ContactForm";
import Marquee from "@/components/magicui/marquee";
import IconCloud from "@/components/magicui/icon-cloud";
import SkillCategoryGrid from "@/components/SkillCategoryGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SocialLinks from "@/components/SocialLinks";
import Link from "next/link";

// Marquee — quick highlights pulled from Experience
const reviews = [
  {
    name: "Defenxor (PT Defender Nusa Semesta)",
    job: "SOC L1 Analyst",
    body: "Monitoring and investigating real-time security threats across SIEM, firewall, WAF, and endpoint security for incident response.",
    img: "cybersecurity.png",
  },
  {
    name: "PT. BPR Sahabat Sejati",
    job: "DevOps Engineer",
    body: "Architected a secure VPN Gateway on Proxmox VE with NAT, IP forwarding, and firewall rules for zero-trust remote access.",
    img: "cci.png",
  },
  {
    name: "CCI Organization",
    job: "DevOps R&D Engineer",
    body: "Automated CI/CD pipelines with GitHub Actions and managed secure server infrastructure for government & MSME digital services.",
    img: "cci.png",
  },
];

const ReviewCard = ({
  img,
  name,
  job,
  body,
}: {
  img: string;
  name: string;
  job: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-72 cursor-pointer overflow-hidden rounded-xl border p-5 transition-all duration-300 hover:shadow-lg",
        "border-gray-950/[.1] bg-white hover:bg-gray-950/[.02]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <img className="rounded-full" width="36" height="36" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-dark">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-primary">{job}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-sm text-secondary leading-relaxed">{body}</blockquote>
    </figure>
  );
};

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

export default function Home() {
  return (
    <>
      <RetroGrid className="fixed bg-dark bg-opacity-20" />
      <Navbar />

      {/* Hero Section Start */}
      <section id="home" className="relative pt-32 pb-10 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 to-sky-400/10 blur-3xl"
        />
        <div className="container relative">
          <div className="flex flex-wrap">
            <div className="w-full self-center px-4 lg:w-1/2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-5">
                👋 Available for DevOps &amp; Security opportunities
              </span>
              <h1 className="font-bold text-dark text-4xl leading-tight mb-4 lg:text-5xl">
                I&apos;m{" "}
                <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
                  Kanjeng Dhimas Cahyoherlina
                </span>
              </h1>
              <h2 className="font-semibold text-secondary text-lg mb-6 lg:text-2xl">
                DevOps · Cloud Infrastructure{" "}
                <span className="text-dark">&amp; Security Engineer</span>
              </h2>
              <p className="font-medium text-secondary mb-10 leading-relaxed max-w-xl lg:text-lg">
                I design and automate{" "}
                <span className="font-bold text-slate-900">CI/CD pipelines</span>, build resilient{" "}
                <span className="font-bold text-slate-900">cloud infrastructure</span>, and secure
                systems with containerization and network engineering — turning complex
                infrastructure into something reliable, scalable, and safe to ship.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="text-base font-semibold text-white bg-primary py-3 px-8 rounded-full
                  hover:shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get In Touch
                </Link>
                <Link
                  href="/project"
                  className="text-base font-semibold text-dark bg-white border border-slate-200 py-3 px-8 rounded-full
                  hover:shadow-lg hover:border-primary hover:-translate-y-0.5 transition-all duration-300"
                >
                  View My Work
                </Link>
              </div>
            </div>
            <div className="w-full self-end px-4 lg:w-1/2">
              <div className="relative mt-10 lg:mt-9 lg:right-auto">
                <img src="myprofile.png" alt="Kanjeng Dhimas" className="max-w-full mx-auto drop-shadow-2xl" />
                <span className="absolute bottom-36 -z-20 left-1/2 -translate-x-1/2 md:scale-125 ">
                  <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="#5f9ea0"
                      d="M51.4,-12.6C59.8,9,54.9,38.9,37.3,51.8C19.7,64.7,-10.7,60.6,
                  -30.1,45.5C-49.5,30.5,-58,4.4,-51.2,-15.1C-44.3,-34.6,-22.2,-47.7,-0.3,-47.6C21.5,-47.5,
                  43.1,-34.2,51.4,-12.6Z"
                      transform="translate(100 100)"
                      scale={1.1}
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section End */}

      {/* About Section Start */}
      <section id="about" className="pt-20 pb-16">
        <div className="container">
          <div className="flex flex-wrap gap-y-10">
            <div className="w-full px-4 lg:w-1/2">
              <h4 className="font-bold uppercase text-primary text-sm tracking-widest mb-3">
                About Me
              </h4>
              <h2 className="font-bold text-dark text-3xl mb-5 max-w-md leading-tight lg:text-4xl">
                Automation and security aren&apos;t optional — they&apos;re the foundation.
              </h2>
              <p className="font-medium text-base text-secondary max-w-xl leading-relaxed lg:text-lg">
                As digital threats grow and systems scale, reliable infrastructure and strong
                security practices become essential — not an afterthought. That&apos;s the role I
                play: automating delivery, hardening infrastructure, and keeping systems both fast
                and safe.
              </p>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <h3 className="font-semibold text-dark text-2xl mb-4 lg:text-3xl">
                Let&apos;s Connect
              </h3>
              <p className="font-medium text-base text-secondary mb-6 leading-relaxed">
                I&apos;m Kanjeng Dhimas Cahyoherlina — you can just call me Kanjeng. Based in
                Probolinggo, East Java, Indonesia. Always glad to talk DevOps, Cloud Infrastructure,
                Networking, and Cybersecurity.
              </p>
              <SocialLinks />
            </div>
          </div>
        </div>
      </section>
      {/* About Section End */}

      {/* Experience Marquee Section Start */}
      <section id="experience" className="pt-20 pb-16 bg-slate-100">
        <div className="container">
          <div className="w-full px-4">
            <div className="max-w-xl mx-auto text-center mb-16">
              <h4 className="font-bold uppercase text-primary text-sm tracking-widest mb-2">
                Experience
              </h4>
              <h2 className="font-bold text-dark text-3xl mb-4 sm:text-4xl lg:text-5xl">
                Roles That Shaped My Craft
              </h2>
              <p className="font-medium text-md text-secondary md:text-lg">
                A quick look at recent roles across DevOps, Infrastructure, and Security — see the
                full timeline on the Experience page.
              </p>
            </div>
          </div>

          <div className="relative flex w-full flex-wrap items-center justify-center overflow-hidden">
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {reviews.map((review) => (
                <ReviewCard key={review.job} {...review} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-slate-100 dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-slate-100 dark:from-background"></div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/experience"
              className="text-sm font-semibold text-primary hover:underline underline-offset-4"
            >
              View Full Experience Timeline →
            </Link>
          </div>
        </div>
      </section>
      {/* Experience Marquee Section End */}

      {/* Skill Section Start */}
      <section id="skills" className="pt-20 pb-20">
        <div className="container">
          <div className="w-full p-4">
            <div className="mx-auto text-center mb-16 max-w-2xl">
              <h4 className="font-bold uppercase text-primary text-sm tracking-widest mb-2">
                Technical Toolkit
              </h4>
              <h2 className="font-bold text-dark text-3xl mb-4 sm:text-4xl lg:text-5xl">
                Tools I Rely On
              </h2>
              <p className="font-medium text-md text-secondary md:text-lg leading-relaxed">
                Hands-on experience spanning cloud platforms, containers, CI/CD automation, and
                network security.
              </p>
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm mt-10">
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl">
                  <IconCloud iconSlugs={slugs} />
                </div>
              </div>
            </div>
            <SkillCategoryGrid categories={skillCategories} />
          </div>
        </div>
      </section>
      {/* Skill Section End */}

      {/* Project Section Start */}
      <section id="project" className="section pt-20 pb-24 bg-gradient-to-br from-dark to-slate-800">
        <div className="container">
          <div className="w-full px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="font-bold uppercase text-sky-400 text-sm tracking-widest mb-3">
                Portfolio
              </h4>
              <h2 className="font-bold text-white text-3xl mb-5 sm:text-4xl lg:text-5xl">
                DevOps &amp; Infrastructure Projects
              </h2>
              <p className="font-medium text-md text-slate-300 md:text-lg mb-10 leading-relaxed">
                From CI/CD pipelines to secure VPN gateways and Infrastructure as Code — explore
                the full source code on my GitHub.
              </p>
              <Link
                href="/project"
                className="inline-flex items-center gap-2 font-semibold text-dark bg-white py-3 px-8 rounded-full
                hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                View Project Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Project Section End */}

      {/* Contact Section Start */}
      <section id="contact" className="pt-20 pb-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-12 px-4">
            <h4 className="font-bold uppercase text-primary text-sm tracking-widest mb-3">
              Get In Touch
            </h4>
            <h2 className="font-bold text-dark text-3xl mb-5 sm:text-4xl lg:text-5xl">
              Let&apos;s Build Something Reliable
            </h2>
            <p className="font-medium text-base text-secondary md:text-lg leading-relaxed">
              Have a project, an opportunity, or just want to talk DevOps &amp; Security? Send a
              message below.
            </p>
          </div>
          <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-10 px-4
          transition-all duration-300 hover:shadow-lg">
            <ContactForm />
          </div>
        </div>
      </section>
      {/* Contact Section End */}

      <Footer />
      <BackToTop />
    </>
  );
}
