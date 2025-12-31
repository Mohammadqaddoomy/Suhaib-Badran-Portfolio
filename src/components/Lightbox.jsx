import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const Lightbox = ({ videoSrc, onClose }) => {
  const [isFullscreen] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (videoSrc) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [videoSrc, onClose]);



  return (
    <AnimatePresence>
      {videoSrc && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-100 bg-black/98 backdrop-blur-sm flex items-center justify-center p-4"
        >
          {/* Background Gradient Effect */}
          <div className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-black opacity-50" />

          <Motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative ${isFullscreen ? 'w-full h-full' : 'w-full max-w-6xl'}`}
          >
            {/* Controls Bar */}
            <Motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-16 left-0 right-0 flex items-center justify-between px-4 z-10"
            >
              <div className="text-white text-sm font-semibold uppercase tracking-wider">
                Video Preview
              </div>
              
              <div className="flex items-center gap-3">
                {/* Fullscreen Toggle */}
              

                {/* Close Button */}
                <Motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-red-500 hover:border-red-500 transition-all duration-300 flex items-center justify-center"
                  aria-label="Close"
                >
                  <X size={24} />
                </Motion.button>
              </div>
            </Motion.div>

            {/* Video Container */}
            <Motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
              initial={{ boxShadow: '0 0 0 0 rgba(255,255,255,0)' }}
              animate={{ 
                boxShadow: '0 0 60px 10px rgba(255,255,255,0.1)',
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Video Player - support both direct video and Google Drive embed */}
              {videoSrc.includes('drive.google.com') ? (
                <iframe
                  src={videoSrc}
                  allow="autoplay"
                  className="w-full h-full bg-black"
                  style={{ maxHeight: isFullscreen ? '100vh' : '80vh', aspectRatio: '16/9' }}
                  allowFullScreen
                />
              ) : (
                <video
                  src={videoSrc}
                  controls
                  autoPlay
                  className="w-full h-full object-contain bg-black"
                  style={{ maxHeight: isFullscreen ? '100vh' : '80vh' }}
                >
                  <source src={videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-white/20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-white/20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-white/20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-white/20 pointer-events-none" />
            </Motion.div>

            {/* Keyboard Hint */}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-12 left-0 right-0 text-center text-white/50 text-sm"
            >
              Press <kbd className="px-2 py-1 bg-white/10 rounded">ESC</kbd> to close
            </Motion.div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
