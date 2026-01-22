import { motion as Motion } from 'framer-motion';
import { useState, useRef, useCallback } from 'react';

const FileCard = ({ title, onClick, logoUrl }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Throttled mouse move for better performance
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !isHovered) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setMousePosition({ x, y });
  }, [isHovered]);

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };
  
  return (
    <Motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group flex flex-col items-center justify-center"
    >
      <div className="relative">
        <div 
          onClick={onClick}
          className="file relative w-60 h-40 cursor-pointer origin-bottom z-10"
        >
          {/* Animated hover border - only render when hovered */}
          {isHovered && (
            <div className="absolute -inset-0.5 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl rounded-tl-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 via-purple-500 via-blue-500 to-orange-400 animate-rainbow-slow" />
              </div>
              <div className="absolute bottom-full left-0 w-20 h-4 rounded-t-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 via-purple-500 via-blue-500 to-orange-400 animate-rainbow-slow" />
              </div>
            </div>
          )}
          
          {/* Animated glow - reduced blur */}
          {isHovered && (
            <div className="absolute -inset-1 pointer-events-none blur-md opacity-40 overflow-hidden">
              <div className="absolute inset-0 rounded-2xl rounded-tl-none bg-gradient-to-r from-orange-400 via-pink-500 via-purple-500 via-blue-500 to-orange-400 animate-rainbow-slow" />
            </div>
          )}
          
          <div className="work-5 bg-zinc-900 w-full h-full origin-top rounded-2xl rounded-tl-none group-hover:shadow-lg transition-shadow duration-200 relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:bg-zinc-900 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px] before:w-4 before:h-4 before:bg-zinc-900 before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]" />
          <div className="work-4 absolute inset-1 bg-zinc-800 rounded-2xl transition-transform duration-200 origin-bottom select-none sm:group-hover:-rotate-x-[20deg]" />
          <div className="work-3 absolute inset-1 bg-zinc-700 rounded-2xl transition-transform duration-200 origin-bottom sm:group-hover:-rotate-x-[30deg]" />
          <div className="work-2 absolute inset-1 bg-zinc-600 rounded-2xl transition-transform duration-200 origin-bottom sm:group-hover:-rotate-x-[38deg]" />
          <div className="work-1 absolute bottom-0 bg-gradient-to-t from-black to-white w-full h-[156px] rounded-2xl rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[146px] after:h-4 after:bg-white after:rounded-t-2xl before:absolute before:content-[''] before:-top-2.5 before:right-[142px] before:size-3 before:bg-white before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] transition-transform duration-200 origin-bottom flex items-center justify-center sm:group-hover:-rotate-x-[46deg] sm:group-hover:translate-y-px">
            {/* Simplified Logo */}
            {logoUrl && (
              <Motion.div
                animate={{ 
                  x: mousePosition.x,
                  y: mousePosition.y,
                }}
                transition={{ 
                  type: "tween",
                  duration: 0.1,
                  ease: "easeOut"
                }}
                className="relative z-10"
              >
                {/* Simple glow on hover */}
                {isHovered && (
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-orange-400 to-purple-500 blur-lg opacity-30" />
                )}
                
                {/* Logo container */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/40 group-hover:border-white/80 transition-colors duration-200 shadow-lg group-hover:shadow-xl">
                  <img
                    src={logoUrl}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  
                  {/* Simple glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </Motion.div>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-base sm:text-lg pt-4 font-semibold text-white text-center px-2">
        {title}
      </p>
    </Motion.div>
  );
};

export default FileCard;
