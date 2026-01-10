import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

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

  if (!videoSrc) return null;

  // Use Portal to render outside any transformed parents
  return createPortal(
    <div className="lightbox-portal">
      <AnimatePresence>
        {videoSrc && (
          <>
            {/* Dark Overlay */}
            <Motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95"
              onClick={onClose}
            />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-red-500 hover:border-red-500 transition-all duration-300 flex items-center justify-center"
            >
              <X size={24} />
            </button>

            {/* Video Container - Centered */}
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 pointer-events-none">
              <Motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-5xl pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
              {/* Video Wrapper */}
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/20">
                
                {/* Video Player - 16:9 Aspect Ratio */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  {videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be') || videoSrc.includes('youtube-nocookie.com') ? (
                    <iframe
                      src={videoSrc}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      className="absolute top-0 left-0 w-full h-full"
                      allowFullScreen
                      title="YouTube video player"
                      frameBorder="0"
                      loading="lazy"
                    />
                  ) : videoSrc.includes('drive.google.com') ? (
                    <iframe
                      src={videoSrc}
                      allow="autoplay; fullscreen"
                      className="absolute top-0 left-0 w-full h-full"
                      allowFullScreen
                      title="Video player"
                    />
                  ) : (
                    <video
                      src={videoSrc}
                      controls
                      autoPlay
                      playsInline
                      className="absolute top-0 left-0 w-full h-full object-contain bg-black"
                    >
                      <source src={videoSrc} type="video/mp4" />
                    </video>
                  )}
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 border-white/40 rounded-tl-xl pointer-events-none" />
                <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 border-t-2 border-r-2 border-white/40 rounded-tr-xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 md:w-12 md:h-12 border-b-2 border-l-2 border-white/40 rounded-bl-xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 border-white/40 rounded-br-xl pointer-events-none" />
              </div>
            </Motion.div>
          </div>
          </>
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export default Lightbox;
