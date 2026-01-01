import { motion as Motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Instagram, MessageCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { isDark } = useTheme();
  
  const socialLinks = [
    { icon: Instagram, url: 'https://www.instagram.com/sohebadran/', label: 'Instagram' }
  ];

  return (
    <section id="contact" className="py-32 px-4 relative overflow-hidden bg-black transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl bg-white" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl bg-white" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white/5"
          >
            
          </Motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white">
            Let's Create
            <br />
            <span className="gradient-text">Something Amazing</span>
          </h2>
          
          <p className="text-xl max-w-2xl mx-auto font-light text-gray-300">
          </p>
        </Motion.div>

        {/* Contact Cards */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16 px-4">
          {/* Phone Card */}
          <div className="relative group w-full sm:w-auto">
            {/* Animated Rainbow Border */}
            <div className="absolute -inset-[2px] opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none rounded-2xl">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 via-purple-500 via-blue-500 to-orange-400"
                  style={{
                    backgroundSize: '400% 100%',
                    animation: 'smoothRainbow 8s ease-in-out infinite',
                    WebkitAnimation: 'smoothRainbow 8s ease-in-out infinite',
                    willChange: 'background-position'
                  }}
                />
              </div>
            </div>
            {/* Glow Effect */}
            <div className="absolute -inset-[3px] opacity-0 group-hover:opacity-50 transition-all duration-1000 pointer-events-none blur-md rounded-2xl">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 via-purple-500 via-blue-500 to-orange-400"
                style={{
                  backgroundSize: '400% 100%',
                  animation: 'smoothRainbow 8s ease-in-out infinite',
                  WebkitAnimation: 'smoothRainbow 8s ease-in-out infinite',
                  willChange: 'background-position'
                }}
              />
            </div>
            <Motion.a
              href="https://wa.me/962786282052"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative flex items-center gap-3 sm:gap-4 px-4 sm:px-8 py-4 sm:py-6 rounded-2xl transition-all duration-300 hover:shadow-2xl border-2 bg-white/5 hover:bg-white/10 border-white/20 hover:border-transparent"
            >
              <div className="p-3 sm:p-4 rounded-xl transition-colors duration-300 flex-shrink-0 bg-white/10 group-hover:bg-white/20">
                <MessageCircle size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm uppercase tracking-wider font-semibold mb-1 text-gray-400">
                </p>
                <p className="text-sm sm:text-lg font-semibold text-white">
Whatsapp
                </p>
              </div>
            </Motion.a>
          </div>

          {/* Email Card */}
          <div className="relative group w-full sm:w-auto">
            {/* Animated Rainbow Border */}
            <div className="absolute -inset-[2px] opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none rounded-2xl">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
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
            <div className="absolute -inset-[3px] opacity-0 group-hover:opacity-50 transition-all duration-1000 pointer-events-none blur-md rounded-2xl">
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
            <Motion.a
              href="mailto:Suhaibbadran40@gmail.com"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative flex items-center gap-3 sm:gap-4 px-4 sm:px-8 py-4 sm:py-6 rounded-2xl transition-all duration-300 hover:shadow-2xl border-2 bg-white/5 hover:bg-white/10 border-white/20 hover:border-transparent"
            >
              <div className="p-3 sm:p-4 rounded-xl transition-colors duration-300 flex-shrink-0 bg-white/10 group-hover:bg-white/20">
                <Mail size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm uppercase tracking-wider font-semibold mb-1 text-gray-400">
                  Email
                </p>
                <p className="text-sm sm:text-lg font-semibold break-all text-white">
                  Suhaibbadran40@gmail.com
                </p>
              </div>
            </Motion.a>
          </div>
        </div>

        {/* Social Links */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
         
          
          <div className="flex justify-center gap-4 mb-16 ">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <div key={social.label} className="relative group">
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
                  <Motion.a
                    href={social.url}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.01 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-2xl bg-white text-black hover:bg-gray-200"
                    aria-label={social.label}
                  >
                    <Icon size={24} />
                  </Motion.a>
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <Motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={`w-full h-px mb-12 ${
              isDark ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          />

          {/* Footer */}
          <Motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <p className={`text-l ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
               Best regards
            </p>
            <p className={`text-l ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
                Sohaib Badran
            </p>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
};

export default Contact;
