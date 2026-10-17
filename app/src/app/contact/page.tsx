import RetroGrid from "@/components/magicui/retro-grid";
import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Contact() {
  return (
    <>
      <RetroGrid className="fixed bg-dark bg-opacity-20" />
      <Navbar />

      {/* Contact Section Start */}
      <section id="contact" className="section pt-32 pb-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container">
          <div className="w-full px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h4 className="font-bold uppercase text-primary text-sm tracking-widest mb-3">
                Get In Touch
              </h4>
              <h2 className="font-bold text-dark text-3xl mb-5 sm:text-4xl lg:text-5xl">
                Let&apos;s Build Something Reliable
              </h2>
              <p className="font-medium text-base text-secondary md:text-lg leading-relaxed">
                Have a project, an opportunity, or just want to talk DevOps &amp; Security? Drop me
                a message below — I usually reply within a day.
              </p>
            </div>
            <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-10
            transition-all duration-300 hover:shadow-lg">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section End */}

      <Footer />
      <BackToTop />
      <script src="/script.js" />
    </>
  );
}
