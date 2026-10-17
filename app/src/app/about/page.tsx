import RetroGrid from "@/components/magicui/retro-grid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SocialLinks from "@/components/SocialLinks";

export default function About() {
  return (
    <>
      <RetroGrid className="fixed bg-dark bg-opacity-20" />
      <Navbar />

      {/* About Section Start */}
      <section id="about" className="pt-32 pb-32">
        <div className="container">
          <div className="flex flex-wrap gap-y-10">
            <div className="w-full px-4 lg:w-1/2">
              <h4 className="font-bold uppercase text-primary text-sm tracking-widest mb-3">
                About Me
              </h4>
              <h2 className="font-bold text-dark text-3xl mb-5 max-w-md leading-tight lg:text-4xl">
                Building reliable systems, one{" "}
                <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
                  pipeline
                </span>{" "}
                at a time.
              </h2>
              <p className="font-medium text-base text-secondary max-w-xl leading-relaxed lg:text-lg">
                In today&apos;s digital landscape, reliability and security aren&apos;t optional —
                they&apos;re the foundation every product is built on. As a DevOps, Infrastructure
                &amp; Security Engineer, I design automation, cloud infrastructure, and secure
                network architecture that keep systems running smoothly, scale confidently, and stay
                protected against evolving threats.
              </p>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <h3 className="font-semibold text-dark text-2xl mb-4 lg:text-3xl">
                Let&apos;s Connect
              </h3>
              <p className="font-medium text-base text-secondary mb-8 leading-relaxed">
                I&apos;m Kanjeng Dhimas Cahyoherlina — you can just call me Kanjeng. Based in
                Probolinggo, East Java, Indonesia. I&apos;m always glad to connect and exchange
                ideas around DevOps, Cloud Infrastructure, Networking, and Cybersecurity.
              </p>
              <div className="flex items-center">
                <SocialLinks />
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  <p className="text-3xl font-bold text-primary">3.91</p>
                  <p className="text-sm font-medium text-secondary">GPA · B.Comp (S.Kom)</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  <p className="text-3xl font-bold text-primary">5+</p>
                  <p className="text-sm font-medium text-secondary">
                    Internships &amp; research roles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Section End */}

      <Footer />
      <BackToTop />
      <script src="/script.js" />
    </>
  );
}
