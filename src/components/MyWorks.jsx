import { useEffect, useState, useRef } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Grid3x3, X, Play } from 'lucide-react';
import { supabase } from '../config/firebase';
import FileCard from './FileCard';

const MyWorks = ({ setLightboxVideo }) => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchFolders();
  }, []);

  // Update current slide based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.offsetWidth;
        
        // Find which card is most visible in the center
        const cards = container.querySelectorAll('.folder-card');
        let closestIndex = 0;
        let minDistance = Infinity;
        
        cards.forEach((card, index) => {
          const cardLeft = card.offsetLeft;
          const cardCenter = cardLeft + (card.offsetWidth / 2);
          const containerCenter = scrollLeft + (containerWidth / 2);
          const distance = Math.abs(cardCenter - containerCenter);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        });
        
        if (closestIndex !== currentSlide) {
          setCurrentSlide(closestIndex);
        }
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement && folders.length > 0) {
      // Initial call to set the first slide
      handleScroll();
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [folders, currentSlide]);

  const scrollToSlide = (index) => {
    if (scrollRef.current) {
      const cards = scrollRef.current.querySelectorAll('.folder-card');
      if (cards[index]) {
        cards[index].scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  };

  const fetchFolders = async () => {
    try {
      const { data, error } = await supabase
        .from('folders')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      setFolders(data || []);
    } catch (error) {
      console.error('Error fetching folders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideos = async (folderId) => {
    setLoadingVideos(true);
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('folder_id', folderId)
        .order('order', { ascending: true });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoadingVideos(false);
    }
  };

  const handleFolderClick = async (folder) => {
    setSelectedFolder(folder);
    await fetchVideos(folder.id);
  };

  const handleCloseModal = () => {
    setSelectedFolder(null);
    setVideos([]);
  };

  const handleVideoClick = (videoUrl) => {
    // Convert Google Drive link to embeddable format
    let embedUrl = videoUrl;
    if (videoUrl.includes('drive.google.com')) {
      const fileId = videoUrl.match(/\/d\/([^/]+)/)?.[1];
      if (fileId) {
        embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    setLightboxVideo(embedUrl);
    handleCloseModal();
  };

  return (
    <section id="my-work" className="py-32 px-4 bg-black relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-black" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
         
          
          <h2 className=" text-4xl md:text-6xl font-black mb-6 text-white">
            My Work
          </h2>
        
        </Motion.div>

        {/* Folders Grid */}
        <div className="max-w-[1800px] mx-auto">
          {loading ? (
            <p className="text-center text-gray-400 py-20">Loading...</p>
          ) : folders.length === 0 ? (
            <p className="text-center text-gray-400 py-20">No projects yet</p>
          ) : (
            <>
              {/* Mobile Slider */}
              <div className="sm:hidden relative">
                <div 
                  ref={scrollRef}
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-8 px-4"
                  style={{ 
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {folders.map((folder) => (
                    <div 
                      key={folder.id}
                      className="folder-card flex-shrink-0 snap-center"
                      style={{ width: '80vw', maxWidth: '320px' }}
                    >
                      <FileCard
                        title={folder.name}
                        logoUrl={folder.logo_url}
                        onClick={() => handleFolderClick(folder)}
                      />
                    </div>
                  ))}
                </div>

                {/* Dot Indicators */}
                {folders.length > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {folders.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => scrollToSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentSlide === index 
                            ? 'w-8 bg-white' 
                            : 'w-2 bg-white/30'
                        }`}
                        aria-label={`Go to folder ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop Grid */}
              <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12 sm:gap-x-16 sm:gap-y-20 md:gap-x-24 md:gap-y-32 lg:gap-x-32 lg:gap-y-40 px-4 sm:px-8 md:px-12">
                {folders.map((folder) => (
                  <FileCard
                    key={folder.id}
                    title={folder.name}
                    logoUrl={folder.logo_url}
                    onClick={() => handleFolderClick(folder)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* CTA */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
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
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 text-black font-semibold rounded-full hover:brightness-90 transition-all cursor-pointer"
              style={{ backgroundColor: '#ffd4d4' }}
            >
              Let's Work Together
            </Motion.button>
          </div>
        </Motion.div>
      </div>

      {/* Videos Modal */}
      <AnimatePresence>
        {selectedFolder && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto"
          >
            <div className="min-h-screen flex items-start md:items-center justify-center p-4 md:p-8">
              <Motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-zinc-900 border-2 border-white/10 rounded-2xl md:rounded-3xl p-4 sm:p-8 max-w-6xl w-full my-8"
              >
                {/* Close */}
                <button
                  onClick={handleCloseModal}
                  className="sticky top-4 md:absolute md:top-6 md:right-6 ml-auto mb-4 md:mb-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center z-20 transition-colors"
                >
                <X size={20} />
              </button>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{selectedFolder.name}</h2>
              <p className="text-gray-400 mb-8">{videos.length} videos</p>

              {/* Videos Grid */}
              {loadingVideos ? (
                <p className="text-center text-gray-400 py-12">Loading...</p>
              ) : videos.length === 0 ? (
                <p className="text-center text-gray-400 py-12">No videos yet</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {videos.map((video, i) => (
                    <Motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleVideoClick(video.video_url)}
                      className="group cursor-pointer bg-white/5 border-2 border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all"
                    >
                      {/* Thumbnail */}
                      <div className="aspect-video bg-zinc-800 relative">
                        {video.thumbnail_url ? (
                          <img
                            src={video.thumbnail_url}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Play size={48} className="text-white/20" />
                          </div>
                        )}
                        
                        {/* Play Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Play size={24} className="text-white ml-1" />
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <div className="p-4">
                        <h3 className="text-white font-semibold truncate">{video.title}</h3>
                      </div>
                    </Motion.div>
                  ))}
                </div>
              )}
              </Motion.div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default MyWorks;
