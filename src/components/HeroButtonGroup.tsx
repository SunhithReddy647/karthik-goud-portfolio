import { motion } from "framer-motion";

interface HeroButtonGroupProps {
  viewWorkText: string;
  resumeText: string;
  contactText: string;
  resumeUrl: string;
  onViewWorkClick: () => void;
  onContactClick: () => void;
}

export default function HeroButtonGroup({
  viewWorkText,
  resumeText,
  contactText,
  resumeUrl,
  onViewWorkClick,
  onContactClick,
}: HeroButtonGroupProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start items-stretch sm:items-center max-w-2xl">
      <motion.button
        whileHover={{ scale: 1.05, rotate: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onViewWorkClick}
        className="flex-1 sm:flex-none bg-gradient-to-br from-[#006B3D] via-[#005030] to-[#003D24] text-white px-8 py-4 border-4 border-[#CCFF99] shadow-[8px_8px_0px_#CCFF99] font-bold text-lg hover:shadow-[4px_4px_0px_#CCFF99] transition-all cursor-pointer whitespace-nowrap"
      >
        {viewWorkText}
      </motion.button>
      <motion.a
        whileHover={{ scale: 1.05, rotate: -1 }}
        whileTap={{ scale: 0.95 }}
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 sm:flex-none bg-gradient-to-br from-[#FF0080] via-[#FF0099] to-[#CC0066] text-white px-8 py-4 border-4 border-[#CCFF99] shadow-[8px_8px_0px_#CCFF99] font-bold text-lg hover:shadow-[4px_4px_0px_#CCFF99] transition-all cursor-pointer whitespace-nowrap text-center"
      >
        {resumeText}
      </motion.a>
      <motion.button
        whileHover={{ scale: 1.05, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onContactClick}
        className="flex-1 sm:flex-none bg-gradient-to-br from-[#0080FF] via-[#0099FF] to-[#0066CC] text-white px-8 py-4 border-4 border-[#CCFF99] shadow-[8px_8px_0px_#CCFF99] font-bold text-lg hover:shadow-[4px_4px_0px_#CCFF99] transition-all cursor-pointer whitespace-nowrap"
      >
        {contactText}
      </motion.button>
    </div>
  );
}
