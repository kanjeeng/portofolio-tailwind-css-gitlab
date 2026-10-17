import RetroGrid from "@/components/magicui/retro-grid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  description: string;
};

const experiences: ExperienceItem[] = [
  {
    role: "SOC L1 Analyst — Internship",
    org: "Defenxor · PT. Defender Nusa Semesta (DNS)",
    period: "Sep 2025 – Aug 2026",
    description:
      "Monitored and investigated real-time security threats using enterprise-grade SIEM technology. Performed alert triage to verify and distinguish genuine threats from false positives, assisted in case escalation by gathering critical log evidence, and collaborated with senior SOC members to improve detection accuracy.",
  },
  {
    role: "DevOps Engineer — Freelancer",
    org: "PT BPR Sahabat Sejati",
    period: "Jan 2026 – Aug 2026",
    description:
      "Architected and deployed a secure VPN Gateway within a Proxmox VE infrastructure, establishing zero-trust remote access for containerized workloads by configuring NAT, IP forwarding, and firewall rules. Optimized kernel routing for low-latency connectivity, implemented High Availability (HA) strategies, and executed advanced Layer 2/3 troubleshooting using tcpdump and ARP analysis.",
  },
  {
    role: "Intelligent School Data RAG System — Internship",
    org: "PT. Telkom Unit Sidoarjo",
    period: "Aug 2025",
    description:
      "Led development of an intelligent chatbot system for Indonesian school data using RAG architecture. Implemented an async FastAPI backend with Qdrant vector database and LLM integration, built natural language query processing with intent recognition, and optimized performance for high-concurrency environments.",
  },
  {
    role: "Research Assistant | Cybersecurity Division",
    org: "Multimedia Application, Big Data and Cybersecurity Laboratory",
    period: "May 2024 – May 2026",
    description:
      "Conducted research on vulnerability analysis and penetration testing of IoT devices using the MQTT protocol, focusing on securing message transmission through applied cryptography.",
  },
  {
    role: "DevOps R&D Engineer",
    org: "CCI Organization (Computer Centra Improvement)",
    period: "Oct 2023 – Oct 2025",
    description:
      "Managed secure remote access for CCI servers across multiple datacenters (Telkom University & PT BPR), ensuring high system stability. Architected and implemented CI/CD pipelines using GitHub Actions for the 'Nevmock' platform, streamlining application delivery for government and MSME vendors.",
  },
  {
    role: "Vice Head of Network Division",
    org: "CCI Organization (Computer Centra Improvement)",
    period: "Oct 2023 – Oct 2025",
    description:
      "Designed and managed the technical curriculum for the Network Division, delivering training on subnetting, switching, and routing. Mentored members through hands-on workshops and facilitated problem-solving sessions on network implementation challenges.",
  },
  {
    role: "Coordinator of IoT Cybersecurity Division",
    org: "Internet of Things Laboratory, Telkom University",
    period: "Dec 2024 – Present",
    description:
      "Researching secure communication in MQTT-based IoT devices by analyzing vulnerabilities and implementing cryptographic techniques alongside lightweight blockchain solutions.",
  },
  {
    role: "Practicum Assistant — Operating Systems (SISOP)",
    org: "Informatics Laboratory, Telkom University",
    period: "Sep 2024",
    description:
      "Guided students through OS installation, process and memory management, system calls, shells, and the implementation of concurrent and sequential programs during lab sessions.",
  },
  {
    role: "Network Operation Center (NOC) — Internship",
    org: "PT. Telkom Akses Malang",
    period: "Aug 2022 – Oct 2022",
    description:
      "Documented and validated ODP maintenance activity reports, synchronized OLT port configurations on GPON devices using ORACLE UIM, and managed field technician trouble tickets.",
  },
];

export default function Experience() {
  return (
    <>
      <RetroGrid className="fixed bg-dark bg-opacity-20" />
      <Navbar />

      {/* Experience Section Start */}
      <section id="experience" className="section pt-32 pb-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container">
          <div className="w-full px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h4 className="font-bold uppercase text-primary text-sm tracking-widest mb-3">
                Career Journey
              </h4>
              <h2 className="font-bold text-dark text-3xl mb-5 sm:text-4xl lg:text-5xl">
                Professional Experience
              </h2>
              <p className="font-medium text-base text-secondary md:text-lg leading-relaxed">
                Every role below shaped how I approach DevOps, Cloud Infrastructure, and
                Cybersecurity today — from automating pipelines to securing networks.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col gap-y-10 md:gap-y-12 max-w-3xl mx-auto px-4">
            {experiences.map((exp) => (
              <div
                key={`${exp.role}-${exp.org}`}
                className="rounded-2xl border border-slate-200 bg-white p-7 md:p-9 shadow-sm
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30"
              >
                <div className="flex flex-wrap items-start justify-between gap-y-2 mb-4">
                  <h3 className="text-dark font-semibold text-lg md:text-xl leading-snug pr-4">
                    {exp.role}
                  </h3>
                  <span className="shrink-0 text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                    {exp.period}
                  </span>
                </div>
                <p className="text-primary font-medium text-sm mb-4">{exp.org}</p>
                <p className="font-medium text-base text-secondary leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Experience Section End */}

      <Footer />
      <BackToTop />
      <script src="/script.js" />
    </>
  );
}
