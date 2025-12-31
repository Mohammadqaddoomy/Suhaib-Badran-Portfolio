import { motion as Motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useState, useRef } from 'react';

const FileCard = ({ title, onClick, logoUrl }) => {
  const { isDark } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };
  
  return (
    <Motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group flex flex-col items-center justify-center"
    >
      <div className="relative">
        <div 
          onClick={onClick}
          className="file relative w-60 h-40 cursor-pointer origin-bottom [perspective-1500px] z-10"
        >
          {/* Animated border that follows folder shape */}
          <div className="absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
            <div className="absolute inset-0 rounded-2xl rounded-tl-none overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-orange-400 via-pink-500 via-purple-500 via-blue-500 to-orange-500 `bg-size-[200%_100%] animate-[linear_3s_linear_infinite]" />
            </div>
            {/* Tab border */}
            <div className="absolute bottom-full left-0 w-20 h-4 overflow-hidden rounded-t-2xl">
              <div className="absolute inset-0 bg-linear-to-r from-orange-400 via-pink-500 via-purple-500 via-blue-500 to-orange-500 `bg-size-[200%_100%] animate-[linear_3s_linear_infinite]" />
            </div>
          </div>
          
          {/* Animated glow */}
          <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none blur-lg">
            <div className="absolute inset-0 rounded-2xl rounded-tl-none overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-orange-400 via-pink-500 via-purple-500 via-blue-500 to-orange-500 bg-size-[200%_100%] animate-[linear_3s_linear_infinite]" />
            </div>
          </div>
          
          <div className="work-5 bg-zinc-900 w-full h-full origin-top rounded-2xl rounded-tl-none group-hover:shadow-[0_20px_40px_rgba(0,0,0,.4)] transition-all ease duration-300 relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:bg-zinc-900 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px] before:w-4 before:h-4 before:bg-zinc-900 before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]" />
          <div className="work-4 absolute inset-1 bg-zinc-800 rounded-2xl transition-all ease duration-300 origin-bottom select-none group-hover:transform-[rotateX(-20deg)]" />
          <div className="work-3 absolute inset-1 bg-zinc-700 rounded-2xl transition-all ease duration-300 origin-bottom group-hover:transform-[rotateX(-30deg)]" />
          <div className="work-2 absolute inset-1 bg-zinc-600 rounded-2xl transition-all ease duration-300 origin-bottom group-hover:transform-[rotateX(-38deg)]" />
          <div className="work-1 absolute bottom-0 bg-linear-to-t from-black to-white w-full h-[156px] rounded-2xl rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[146px] after:h-4 after:bg-white after:rounded-t-2xl before:absolute before:content-[''] before:-top-2.5 before:right-[142px] before:size-3 before:bg-white before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] transition-all ease duration-300 origin-bottom flex items-center justify-center group-hover:shadow-[inset_0_20px_40px_rgba(255,255,255,0.3),inset_0_-20px_40px_rgba(0,0,0,0.2)] group-hover:transform-[rotateX(-46deg)_translateY(1px)]">
            {/* Circular Logo with Advanced Animations */}
            {logoUrl && (
              <Motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: mousePosition.x,
                  y: mousePosition.y,
                }}
                transition={{ 
                  delay: 0.2, 
                  duration: 0.4,
                  x: { type: "spring", damping: 25, stiffness: 150 },
                  y: { type: "spring", damping: 25, stiffness: 150 },
                }}
                className="relative z-10"
              >
                <div className="relative">
                  {/* Holographic rotating ring */}
                  <Motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    <div className="absolute inset-0 rounded-full bg-linear-to-r from-cyan-400 via-pink-500 via-purple-500 via-blue-500 to-cyan-400 blur-lg" 
                         style={{ backgroundSize: '200% 200%' }} />
                  </Motion.div>

                  {/* Pulsing outer glow */}
                  <Motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -inset-4 rounded-full bg-linear-to-r from-orange-400 via-pink-500 to-purple-500 blur-2xl opacity-0 group-hover:opacity-60"
                  />
                  
                  {/* Shimmer effect overlay */}
                  <Motion.div
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      backgroundSize: '200% 100%',
                    }}
                  />

                  {/* Logo container with micro-interactions */}
                  <Motion.div
                    whileHover={{ 
                      scale: 1.15,
                      rotate: [0, -3, 3, -3, 0],
                    }}
                    transition={{ 
                      scale: { type: "spring", stiffness: 300, damping: 20 },
                      rotate: { duration: 0.5 }
                    }}
                    className="relative"
                  >
                    {/* Inner glow ring */}
                    <div className="absolute -inset-1 rounded-full bg-white/50 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Logo image */}
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/40 group-hover:border-white/90 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.8)]">
                      <Motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        src={logoUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      
                      {/* Glass reflection overlay */}
                      <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                    </div>
                  </Motion.div>
                </div>
              </Motion.div>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-base sm:text-lg pt-4 font-semibold text-white text-center px-2">
        {title}
      </p>
      
      <style>{`
        @keyframes linear {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </Motion.div>
  );
};

export default FileCard;
