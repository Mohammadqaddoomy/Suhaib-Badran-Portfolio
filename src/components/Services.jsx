import { motion as Motion } from 'framer-motion';
import { Video, Camera, Palette, Box, Film, Edit, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Services = () => {
  const { isDark } = useTheme();
  
  const services = [
    { 
      title: 'Visual Art', 
      icon: Video,
      color: 'from-black to-gray-700'
    },
    { 
      title: 'Creative VideoGrapher', 
      icon: Camera,
      color: 'from-gray-800 to-gray-600'
    },
    { 
      title: 'Creative Editor', 
      icon: Palette,
      color: 'from-black to-gray-800'
    },
    { 
      title: '3D Animations', 
      icon: Box,
      color: 'from-gray-700 to-black'
    },
    { 
      title: 'Motion Design', 
      icon: Film,
      color: 'from-gray-900 to-gray-700'
    },
    { 
      title: 'photography', 
      icon: Edit,
      color: 'from-black to-gray-900'
    }
  ];

  return (
    <section id="services" className="py-16 px-4 relative overflow-hidden bg-black transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <Motion.div
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          
          
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
            Services
          </h2>
          
         
        </Motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Motion.div
                key={service.title}
                initial={{ opacity: 0, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ y: -4 }}
                className="group relative p-4 md:p-8 rounded-2xl md:rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden"
                style={{ 
                  backgroundColor: '#a855f7',
                  borderColor: isDark ? '#9333ea' : '#a855f7'
                }}
              >
                {/* Hover Background */}
                <Motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Container */}
                  <Motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-10 h-10 md:w-16 md:h-16 mb-3 md:mb-6 rounded-xl md:rounded-2xl flex items-center justify-center transition-colors duration-500 ${
                      isDark ? 'bg-white/5 group-hover:bg-white/20' : 'bg-black/5 group-hover:bg-white/20'
                    }`}
                  >
                    <Icon size={20} className={`md:hidden transition-colors duration-500 ${
                      isDark ? 'text-white group-hover:text-white' : 'text-black group-hover:text-white'
                    }`} />
                    <Icon size={32} className={`hidden md:block transition-colors duration-500 ${
                      isDark ? 'text-white group-hover:text-white' : 'text-black group-hover:text-white'
                    }`} />
                  </Motion.div>
                  
                  <h3 className={`text-sm md:text-2xl font-bold mb-2 md:mb-3 uppercase tracking-tight transition-colors duration-500 ${
                    isDark ? 'text-white group-hover:text-white' : 'text-black group-hover:text-white'
                  }`}>
                    {service.title}
                  </h3>
                  
                  <p className={`text-xs md:text-base leading-relaxed transition-colors duration-500 hidden md:block ${
                    isDark ? 'text-gray-300 group-hover:text-white/90' : 'text-gray-600 group-hover:text-white/90'
                  }`}>
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <Motion.div
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    className="mt-3 md:mt-6 flex items-center gap-2 text-xs md:text-sm font-semibold text-white hidden md:flex"
                  >
                    <span>Learn More</span>
                    <Motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </Motion.span>
                  </Motion.div>
                </div>

                {/* Decorative Elements */}
                <div className={`absolute top-2 right-2 md:top-4 md:right-4 w-12 h-12 md:w-24 md:h-24 border-t-2 border-r-2 rounded-tr-2xl md:rounded-tr-3xl transition-colors duration-500 ${
                  isDark ? 'border-white/5 group-hover:border-white/20' : 'border-black/5 group-hover:border-white/20'
                }`} />
                <div className={`absolute bottom-2 left-2 md:bottom-4 md:left-4 w-12 h-12 md:w-24 md:h-24 border-b-2 border-l-2 rounded-bl-2xl md:rounded-bl-3xl transition-colors duration-500 ${
                  isDark ? 'border-white/5 group-hover:border-white/20' : 'border-black/5 group-hover:border-white/20'
                }`} />
              </Motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="relative group inline-block">
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
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative px-8 py-4 font-semibold text-black rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:brightness-90"
              style={{ backgroundColor: '#ffd4d4' }}
            >
              Discuss Your Project
            </Motion.button>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default Services;
