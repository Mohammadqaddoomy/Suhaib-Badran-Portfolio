import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { useEffect } from 'react';

const Lightbox = ({ videoSrc, onClose }) => {

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
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/98 backdrop-blur-sm"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginTop:"40%",
            padding: '2rem'
          }}
        >
          {/* Background Gradient Effect */}
          <div className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-black opacity-50" />

          <Motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-6xl"
          >
            {/* Video Container */}
            <Motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 bg-black w-full"
              initial={{ boxShadow: '0 0 0 0 rgba(255,255,255,0)' }}
              animate={{ 
                boxShadow: '0 0 60px 10px rgba(255,255,255,0.1)',
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Close Button */}
              <Motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-red-500 hover:border-red-500 transition-all duration-300 flex items-center justify-center"
                aria-label="Close"
              >
                <X size={20} />
              </Motion.button>

              {/* Video Player - support both direct video and Google Drive embed */}
              {videoSrc.includes('drive.google.com') ? (
                <div className="relative w-full bg-black" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
                  <iframe
                    src={videoSrc}
                    allow="autoplay; fullscreen"
                    className="absolute top-0 left-0 w-full h-full"
                    allowFullScreen
                    title="Video player"
                  />
                </div>
              ) : (
                <div className="relative w-full bg-black" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
                  <video
                    src={videoSrc}
                    controls
                    autoPlay
                    className="absolute top-0 left-0 w-full h-full object-contain"
                    title="Video player"
                  >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-white/20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-white/20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-white/20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-white/20 pointer-events-none" />
            </Motion.div>
          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
