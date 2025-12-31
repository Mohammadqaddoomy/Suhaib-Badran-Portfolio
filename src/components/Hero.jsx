import { motion as Motion } from 'framer-motion';
import { ArrowDown, Image, Sparkles, Star } from 'lucide-react';

const Hero = () => {
  
  const scrollToWork = () => {
    document.getElementById('my-work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 px-4 overflow-hidden bg-black transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <Motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl bg-white/5"
        />
        <Motion.div
          animate={{ 
            y: [0, 30, 0],
            x: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl bg-white/5"
        />
      </div>
      {/* Static background for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none md:hidden">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl bg-white/5" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl bg-white/5" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <Motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 md:space-y-8 text-center lg:text-left"
          >
            {/* Badge */}
           

            <Motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-4 md:mb-6 text-white">
                Sohaib
                
                <span className="gradient-text">Badran</span>
                
                
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight mb-4 md:mb-6 text-white">Visual Artist</h2>
            </Motion.div>
            
            <Motion.p
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl font-light mx-auto lg:mx-0 text-gray-300"
            >
              I Don't Chase Trends.<br></br>
              <span className="font-semibold text-white"> I Craft visuals that feel <br></br> </span>timeless.
            </Motion.p>
            
            <Motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
               <div className="relative group">
                {/* Animated Rainbow Border */}
                <div className="absolute -inset-[2px] opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none rounded-full">
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 via-purple-500 via-blue-500 to-orange-400"
                      style={{ 
                        backgroundSize: '600% 100%', 
                        animation: 'smoothRainbow 40s linear infinite',
                        WebkitAnimation: 'smoothRainbow 40s linear infinite',
                        willChange: 'background-position'
                      }} 
                    />
                  </div>
                </div>
                {/* Glow Effect */}
                <div className="absolute -inset-[3px] opacity-0 group-hover:opacity-50 transition-all duration-1000 pointer-events-none blur-md rounded-full">
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 via-purple-500 via-blue-500 to-orange-400"
                    style={{ 
                      backgroundSize: '600% 100%', 
                      animation: 'smoothRainbow 40s linear infinite',
                      WebkitAnimation: 'smoothRainbow 40s linear infinite',
                      willChange: 'background-position'
                    }} 
                  />
                </div>
                <Motion.button
                 
                  onClick={scrollToWork}
                  className="relative px-6 sm:px-8 py-3 sm:py-4 border-2 border-black font-semibold text-base sm:text-lg rounded-full transition-all duration-300 text-black hover:brightness-90"
                  style={{ backgroundColor: '#ffd4d4' }}
                >
                  View My Work
                </Motion.button>
              </div>

              
            </Motion.div>

            {/* Stats */}
     
          </Motion.div>

          {/* Right Side - Profile Image */}
          <Motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Main Image Container */}
              <Motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative z-10 group"
              >
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]">
                  
                  {/* Apple Intelligence Rainbow Border */}
                  <div className="absolute -inset-0.5 opacity-100 transition-all duration-1000 pointer-events-none">
                    <div className="absolute inset-0 rounded-[40px] overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 via-purple-500 via-blue-500 to-orange-400" 
                        style={{ 
                          backgroundSize: '600% 100%',
                          animation: 'smoothRainbow 40s linear infinite',
                          WebkitAnimation: 'smoothRainbow 40s linear infinite',
                          willChange: 'background-position'
                        }} 
                      />
                    </div>
                  </div>

                  {/* Animated Glow */}
                  <div className="absolute -inset-1 opacity-70 transition-all duration-1000 pointer-events-none blur-xl">
                    <div className="absolute inset-0 rounded-[40px] overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 via-purple-500 via-blue-500 to-orange-400"
                        style={{ 
                          backgroundSize: '600% 100%',
                          animation: 'smoothRainbow 40s linear infinite',
                          WebkitAnimation: 'smoothRainbow 40s linear infinite',
                          willChange: 'background-position'
                        }} 
                      />
                    </div>
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
                  
                  {/* Decorative frame */}
                  <div className="absolute -inset-4 border-2 rounded-[50px] -z-10 border-white/10" />
                </div>
              </Motion.div>

              {/* Floating Elements */}
             
            </div>
            
          </Motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <Motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={20} />
        </Motion.div>
      </Motion.div>
    </section>
  );
};

export default Hero;
