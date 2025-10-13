import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface LightboxModalProps {
  title: string;
  images: string[];
  description?: string;
  onClose: () => void;
}

export default function LightboxModal({ title, images, description, onClose }: LightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") onClose();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
            className="absolute -top-10 sm:-top-12 right-0 text-white hover:text-[#FF0080] transition-colors z-10"
          >
            <X size={28} strokeWidth={3} className="sm:w-8 sm:h-8" />
          </button>

          <div className="relative flex items-center justify-center" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            <img
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              className="max-w-full max-h-full h-auto object-contain rounded-lg border-4 border-black shadow-[8px_8px_0px_#000000]"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-[#00FF80] hover:bg-[#FF0080] text-black p-2 sm:p-3 border-4 border-black shadow-[4px_4px_0px_#000000] transition-all"
                >
                  <ChevronLeft size={24} strokeWidth={3} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-[#00FF80] hover:bg-[#FF0080] text-black p-2 sm:p-3 border-4 border-black shadow-[4px_4px_0px_#000000] transition-all"
                >
                  <ChevronRight size={24} strokeWidth={3} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 px-4 py-2 border-2 border-white rounded-lg">
                  <p className="text-white text-sm font-bold">
                    {currentIndex + 1} / {images.length}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {title}
            </h3>
            {description && (
              <p className="text-white/80 text-sm sm:text-base mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {description}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}