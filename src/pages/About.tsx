import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Sprout, Users, Target, Heart } from "lucide-react";

const team = [
  { name: "Laura Okonkwo", role: "Founder & CEO", bio: "20+ years in agribusiness and sustainable farming." },
  { name: "David Mensah", role: "Head of Investments", bio: "Former portfolio manager with expertise in alternative assets." },
  { name: "Amina Bello", role: "Operations Director", bio: "Agricultural engineer ensuring farm projects run seamlessly." },
  { name: "James Adeyemi", role: "CTO", bio: "Fintech veteran building secure investment platforms." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Sprout className="h-12 w-12 text-primary-foreground mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground font-display mb-4">
              About Laura Farms
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              We're on a mission to democratize agricultural investment, connecting everyday investors with verified, sustainable farm projects across the continent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <h2 className="text-3xl font-bold text-foreground font-display mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Laura Farms was founded in 2021 with a simple idea: agriculture is one of the world's most reliable investments, yet it remains inaccessible to most people. We set out to change that.
                </p>
                <p>
                  Starting with just three farm partnerships, we've grown to manage over 120 agricultural projects, helping more than 2,400 investors earn consistent, transparent returns while supporting sustainable farming communities.
                </p>
                <p>
                  Every investment on our platform is backed by real agricultural assets, comprehensive crop insurance, and rigorous due diligence — so you can invest with confidence.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { icon: Target, title: "Our Mission", text: "Make agricultural investment accessible, transparent, and profitable for everyone." },
                { icon: Heart, title: "Our Values", text: "Integrity, sustainability, and community-driven growth guide everything we do." },
                { icon: Users, title: "Our Impact", text: "2,400+ investors, 120+ farm projects, and $4.8M in returns distributed." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i + 1}
                  className="bg-card rounded-2xl p-6 border border-border shadow-[var(--shadow-card)]"
                >
                  <item.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-bold text-foreground font-display mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display mb-4">Meet the Team</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Passionate professionals combining agriculture, finance, and technology expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                className="bg-card rounded-2xl p-6 border border-border shadow-[var(--shadow-card)] text-center"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary font-display">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-bold text-foreground font-display">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-secondary" />
              <span className="font-display text-lg font-bold text-primary-foreground">Laura Farms</span>
            </div>
            <p className="text-primary-foreground/50 text-sm">© 2026 Laura Farms. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
