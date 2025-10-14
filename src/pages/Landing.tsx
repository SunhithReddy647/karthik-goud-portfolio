import { motion } from "framer-motion";
import { ExternalLink, Mail, Phone, Youtube, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import LightboxModal from "@/components/LightboxModal";

interface Profile {
  name: string;
  role: string;
  about: string;
  education: Array<{ degree: string; institute: string; years: string }>;
  phone: string;
  email: string;
  profileImage: string;
  backgroundImage: string;
  buttons?: {
    viewWork: string;
    resume: string;
    contact: string;
  };
  resumeUrl?: string;
}

interface Skills {
  skills: string[];
}

interface ProjectDetail {
  id: string;
  title: string;
  coverImage: string;
  images: string[];
  description?: string;
}

interface ProjectDetails {
  projects: ProjectDetail[];
}

export default function Landing() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skills | null>(null);
  const [projects, setProjects] = useState<ProjectDetails | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/data/profile.json").then((r) => r.json()),
      fetch("/data/skills.json").then((r) => r.json()),
      fetch("/data/project-details.json").then((r) => r.json()),
    ]).then(([profileData, skillsData, projectsData]) => {
      setProfile(profileData);
      setSkills(skillsData);
      setProjects(projectsData);
    });
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (!profile || !skills || !projects) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#FF0080] border-t-[#00FF80] rounded-lg shadow-[4px_4px_0px_#000000]"
        />
      </div>
    );
  }

  return (
    <div className="bg-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-white shadow-[0_4px_0px_#FF0080]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.h1
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="text-xl sm:text-2xl font-black text-[#00FF80] cursor-pointer"
              onClick={() => scrollToSection("hero")}
            >
              {profile.name}
            </motion.h1>
            <div className="flex gap-2 sm:gap-4 md:gap-6 items-center">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("about")}
                className="text-xs sm:text-sm md:text-base font-bold text-white hover:text-[#FF0080] transition-colors"
              >
                About
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("education")}
                className="text-xs sm:text-sm md:text-base font-bold text-white hover:text-[#FF0080] transition-colors"
              >
                Education
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("skills")}
                className="text-xs sm:text-sm md:text-base font-bold text-white hover:text-[#FF0080] transition-colors"
              >
                Skills
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("portfolio")}
                className="text-xs sm:text-sm md:text-base font-bold text-white hover:text-[#FF0080] transition-colors"
              >
                Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
                className="text-xs sm:text-sm md:text-base font-bold text-white hover:text-[#FF0080] transition-colors"
              >
                Contact
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen relative flex items-center justify-center py-24 px-8 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${profile.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl w-full flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center justify-start md:justify-center relative z-10">
          {/* Profile Image - First on mobile, second on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center order-1 md:order-2 mb-6 sm:mb-8 md:mb-0"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full border-6 sm:border-8 border-black shadow-[8px_8px_0px_#FF0080] sm:shadow-[12px_12px_0px_#FF0080] object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ rotate: -2 }}
                animate={{ rotate: 2 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="absolute -bottom-4 -left-4 bg-[#00FF80] text-black px-4 py-2 border-4 border-black shadow-[4px_4px_0px_#000000] font-bold text-sm"
              >
                CREATIVE DESIGNER
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content - Second on mobile, first on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1 text-center md:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 leading-tight">
              {profile.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8 text-[#00FF80] font-bold">
              {profile.role}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start items-stretch sm:items-center max-w-2xl">
              <motion.button
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("portfolio")}
                className="flex-1 sm:flex-none bg-gradient-to-br from-[#00FF80] via-[#00DD70] to-[#00BB60] text-black px-8 py-4 border-4 border-[#CCFF99] shadow-[8px_8px_0px_#CCFF99] font-bold text-lg hover:shadow-[4px_4px_0px_#CCFF99] transition-all cursor-pointer whitespace-nowrap"
              >
                {profile.buttons?.viewWork || "VIEW WORK"}
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                href={profile.resumeUrl || "https://i.ibb.co/svNwmMrt/Black-Modern-Graphic-Designer-Creative-Resume-page-0001.jpg"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none bg-gradient-to-br from-[#FF0080] via-[#FF0099] to-[#CC0066] text-white px-8 py-4 border-4 border-[#CCFF99] shadow-[8px_8px_0px_#CCFF99] font-bold text-lg hover:shadow-[4px_4px_0px_#CCFF99] transition-all cursor-pointer whitespace-nowrap text-center"
              >
                {profile.buttons?.resume || "RESUME"}
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
                className="flex-1 sm:flex-none bg-gradient-to-br from-[#0080FF] via-[#0099FF] to-[#0066CC] text-white px-8 py-4 border-4 border-[#CCFF99] shadow-[8px_8px_0px_#CCFF99] font-bold text-lg hover:shadow-[4px_4px_0px_#CCFF99] transition-all cursor-pointer whitespace-nowrap"
              >
                {profile.buttons?.contact || "CONTACT ME"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-8 bg-[#00FF80]">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-black text-center transform -rotate-2"
          >
            ABOUT ME
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-black leading-relaxed bg-white p-4 sm:p-6 md:p-8 border-4 border-black shadow-[8px_8px_0px_#000000] font-bold"
          >
            {profile.about}
          </motion.p>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 sm:py-24 px-4 sm:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 md:mb-12 text-white text-center transform rotate-2"
          >
            EDUCATION
          </motion.h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {profile.education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -8, rotate: index % 2 === 0 ? 2 : -2 }}
                className="bg-[#0080FF] p-4 sm:p-6 md:p-8 border-4 border-black shadow-[8px_8px_0px_#000000] hover:shadow-[12px_12px_0px_#000000] transition-all cursor-pointer"
              >
                <h3 className="text-xl sm:text-2xl font-black mb-2 text-white">{edu.degree}</h3>
                <p className="text-base sm:text-lg font-bold text-black mb-1">{edu.institute}</p>
                <p className="text-sm sm:text-md font-bold text-white">{edu.years}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FF0080]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 md:mb-12 text-white text-center transform -rotate-2"
          >
            SKILLS
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {skills.skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-black text-[#00FF80] px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-4 border-white shadow-[6px_6px_0px_#000000] font-bold text-center text-sm sm:text-base md:text-lg cursor-pointer"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section id="portfolio" className="py-16 sm:py-24 px-4 sm:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 md:mb-12 text-white text-center transform rotate-2"
          >
            MY WORK
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {projects.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: index % 2 === 0 ? 3 : -3,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedProject(project)}
                className="relative group cursor-pointer overflow-hidden border-4 border-white shadow-[8px_8px_0px_#FF0080] hover:shadow-[12px_12px_0px_#00FF80] transition-shadow duration-300"
              >
                <motion.img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end justify-center pb-6">
                  <h3 className="text-2xl font-black text-white text-center px-4">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#0080FF]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 md:mb-12 text-white transform -rotate-2"
          >
            CONTACT
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-12">
            <motion.a
              href={`tel:${profile.phone}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="bg-white text-black p-4 sm:p-6 border-4 border-black shadow-[8px_8px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] transition-all flex items-center justify-center gap-3 sm:gap-4 font-bold text-sm sm:text-base md:text-lg cursor-pointer"
            >
              <Phone size={24} strokeWidth={3} />
              {profile.phone}
            </motion.a>
            <motion.a
              href={`mailto:${profile.email}`}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-white text-black p-4 sm:p-6 border-4 border-black shadow-[8px_8px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] transition-all flex items-center justify-center gap-3 sm:gap-4 font-bold text-sm sm:text-base md:text-lg cursor-pointer break-all sm:break-normal"
            >
              <Mail size={24} strokeWidth={3} />
              {profile.email}
            </motion.a>
          </div>
          <div className="flex justify-center gap-4 sm:gap-6">
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: 10 }}
              className="bg-[#FF0080] p-4 border-4 border-black shadow-[6px_6px_0px_#000000] hover:shadow-[3px_3px_0px_#000000] transition-all cursor-pointer"
            >
              <Youtube size={32} strokeWidth={3} className="text-white" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: -10 }}
              className="bg-[#00FF80] p-4 border-4 border-black shadow-[6px_6px_0px_#000000] hover:shadow-[3px_3px_0px_#000000] transition-all cursor-pointer"
            >
              <Instagram size={32} strokeWidth={3} className="text-black" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 bg-black border-t-4 border-white">
        <p className="text-center text-white font-bold text-sm sm:text-base md:text-lg">
          © 2025 {profile.name} - ALL RIGHTS RESERVED
        </p>
      </footer>

      {/* Lightbox Modal */}
      {selectedProject && (
        <LightboxModal
          title={selectedProject.title}
          images={selectedProject.images}
          description={selectedProject.description}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}