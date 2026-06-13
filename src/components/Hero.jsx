import { motion as Motion } from 'framer-motion';
import { ArrowDown, Image, Sparkles, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Delay animations until after initial render
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const scrollToWork = () => {
    document.getElementById('my-work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 px-4 overflow-hidden bg-black transition-colors duration-300">
      {/* Static Background Elements - removed infinite animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full blur-2xl bg-white/5" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-2xl bg-white/5" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <div
            className={`space-y-6 md:space-y-8 text-center lg:text-left transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Badge */}
           

            <div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-4 md:mb-6 text-white">
                Sohaib
                
                <span className="text-white">Badran</span>
                
                
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight mb-4 md:mb-6 text-white">Visual Artist</h2>
            </div>
            
            <p
              className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl font-light mx-auto lg:mx-0 text-white"
            >
              I don't chase trends.<br></br>
              <span className=" text-white"> I craft visuals that feel  </span>timeless.
            </p>
            
            <div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
               <div className="relative group">
                {/* Animated Rainbow Border - only on hover */}
                <div className="absolute -inset-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 via-purple-500 via-blue-500 to-orange-400 animate-rainbow-slow"
                  />
                </div>
                {/* Glow Effect - reduced blur */}
                <div className="absolute -inset-[3px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none blur-sm rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 via-purple-500 via-blue-500 to-orange-400 animate-rainbow-slow"
                  />
                </div>
                <button
                  onClick={scrollToWork}
                  className="relative px-6 sm:px-8 py-3 sm:py-4 border-2 border-black font-semibold text-base sm:text-lg rounded-full transition-all duration-300 text-black hover:brightness-90"
                  style={{ backgroundColor: '#C368FC' }}
                >
                  View My Work
                </button>
              </div>

              
            </div>

            {/* Stats */}
     
          </div>

          {/* Right Side - Profile Image */}
          <div
            className={`flex justify-center lg:justify-end transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="relative">
              {/* Main Image Container */}
              <div
                className="relative z-10 group"
              >
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]">
                  
                  {/* Rainbow Border - static gradient on mobile, animated on desktop */}
                  <div className="absolute -inset-0.5 pointer-events-none rounded-[40px] overflow-hidden">
                    <div className="absolute inset-0 " />
                  </div>

                  {/* Glow - hidden on mobile */}
                  <div className="hidden sm:block absolute -inset-1 opacity-50 pointer-events-none blur-lg rounded-[40px] overflow-hidden">
                    <div className="absolute inset-0 " />
                  </div>
                  
                  {/* Image with modern border */}
                  <div className="absolute inset-0 rounded-[40px] overflow-hidden shadow-2xl border-2 border-white/20">
                    <img
                      src="/assets/profile1.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                  </div>
                  
                  {/* Decorative frame - hidden on mobile */}
                  <div className="hidden sm:block absolute -inset-4 border-2 rounded-[50px] -z-10 border-white/10" />
                </div>
              </div>

              {/* Floating Elements */}
             
            </div>
            
          </div>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile */}
      <div
        className="hidden sm:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown size={20} />
      </div>
    </section>
  );
};

export default Hero;
