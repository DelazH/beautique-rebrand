import founder from "@/assets/founder-katherine.jpg";
import salon from "@/assets/salon-interior.jpg";

const values = [
  "Excellence in every service",
  "Personalized approach",
  "Continuous innovation",
  "Sustainable beauty",
];

const About = () => {
  return (
    <>
      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={salon}
              alt="KC Beautique salon interior"
              className="w-full h-auto rounded-lg shadow-lg grayscale"
            />
            <div className="absolute -bottom-8 -right-4 md:-right-8 bg-card p-6 rounded-lg shadow-xl border border-border max-w-xs">
              <h3 className="font-serif-display text-xl mb-3 text-gold">Our Values</h3>
              <ul className="space-y-2">
                {values.map((v) => (
                  <li key={v} className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="text-gold tracking-[0.3em] text-sm font-medium mb-4">
              OUR STORY
            </p>
            <h1 className="font-serif-display text-4xl md:text-5xl mb-6 leading-tight">
              Beautifying the World One Client at a Time
            </h1>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded with a simple vision — to create a sanctuary where beauty,
                wellness, and self-care converge. KC Beautique has grown from a small
                boutique into a premier beauty destination.
              </p>
              <p>
                At KC Beautique, we believe that true beauty emerges when you feel your
                best inside and out. Our team of skilled Beauticians is dedicated to
                helping you discover and enhance your natural beauty through personalized
                services and treatments.
              </p>
              <p>
                What sets us apart is our commitment to excellence, attention to detail,
                and dedication to creating a warm, welcoming environment for every client
                who walks through our doors.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-10 pt-8 border-t border-border">
              <img
                src={founder}
                alt="Katherine Collins, Founder"
                className="h-16 w-16 rounded-full object-cover border-2 border-gold"
              />
              <div>
                <p className="font-serif-display text-lg">Katherine Collins</p>
                <p className="text-sm text-gold italic">Founder & Creative Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
