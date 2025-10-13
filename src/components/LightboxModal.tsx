import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface LightboxModalProps {
  image: string;
  title: string;
  onClose: () => void;
}

export default function LightboxModal({ image, title, onClose }: LightboxModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4 cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl w-full cursor-default"
        >
          <button
            onClick={onClose}
            className="absolute -top-10 sm:-top-12 right-0 text-white hover:text-[#FF0080] transition-colors"
          >
            <X size={28} strokeWidth={3} className="sm:w-8 sm:h-8" />
          </button>
          <img
            src={image}
            alt={title}
            className="w-full h-auto rounded-lg border-4 border-black shadow-[8px_8px_0px_#000000]"
          />
          <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mt-4 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {title}
          </h3>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
