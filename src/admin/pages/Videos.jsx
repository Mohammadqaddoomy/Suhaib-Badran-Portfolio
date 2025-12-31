import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { supabase } from '../../config/firebase';
import { Plus, Edit2, Trash2, Upload, ArrowLeft, Image as ImageIcon } from 'lucide-react';

const Videos = () => {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const [folder, setFolder] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    videoUrl: '',
    thumbnail: null
  });
  const [uploading, setUploading] = useState(false);

  const fetchFolderAndVideos = async () => {
    try {
      // Fetch folder details
      const { data: folderData, error: folderError } = await supabase
        .from('folders')
        .select('*')
        .eq('id', folderId)
        .single();

      if (folderError) throw folderError;
      setFolder(folderData);

      // Fetch videos
      const { data: videosData, error: videosError } = await supabase
        .from('videos')
        .select('*')
        .eq('folder_id', folderId)
        .order('order', { ascending: true });

      if (videosError) throw videosError;
      setVideos(videosData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolderAndVideos();
  }, [folderId]);

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, thumbnail: e.target.files[0] });
    }
  };

  const uploadThumbnail = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `thumbnails/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('thumbnails')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('thumbnails')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.videoUrl.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setUploading(true);
    try {
      let thumbnailUrl = '';
      if (formData.thumbnail) {
        thumbnailUrl = await uploadThumbnail(formData.thumbnail);
      }

      const { error } = await supabase
        .from('videos')
        .insert([{
          folder_id: folderId,
          title: formData.title,
          video_url: formData.videoUrl,
          thumbnail_url: thumbnailUrl,
          order: videos.length,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      setFormData({ title: '', videoUrl: '', thumbnail: null });
      setShowAddModal(false);
      fetchFolderAndVideos();
    } catch (error) {
      console.error('Error adding video:', error);
      alert('Error adding video. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateVideo = async (e) => {
    e.preventDefault();
    if (!editingVideo || !editingVideo.title.trim() || !editingVideo.video_url.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setUploading(true);
    try {
      let updateData = {
        title: editingVideo.title,
        video_url: editingVideo.video_url
      };

      if (formData.thumbnail) {
        const thumbnailUrl = await uploadThumbnail(formData.thumbnail);
        updateData.thumbnail_url = thumbnailUrl;
      }

      const { error } = await supabase
        .from('videos')
        .update(updateData)
        .eq('id', editingVideo.id);

      if (error) throw error;

      setEditingVideo(null);
      setFormData({ title: '', videoUrl: '', thumbnail: null });
      fetchFolderAndVideos();
    } catch (error) {
      console.error('Error updating video:', error);
      alert('Error updating video. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', videoId);

      if (error) throw error;

      fetchFolderAndVideos();
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const openEditModal = (video) => {
    setEditingVideo(video);
    setFormData({ title: '', videoUrl: '', thumbnail: null });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-white text-xl">Loading videos...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={() => navigate('/admin/folders')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Folders
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-2">
              {folder?.name || 'Folder'}
            </h1>
            <p className="text-gray-400">{videos.length} videos</p>
          </div>
          <Motion.button
            onClick={() => setShowAddModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-colors"
          >
            <Plus size={20} />
            Add Video
          </Motion.button>
        </div>
      </Motion.div>

      {/* Videos Grid */}
      {videos.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-xl mb-4">No videos yet</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-colors"
          >
            Add Your First Video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <Motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 border-2 border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-white/5 relative">
                {video.thumbnail_url ? (
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={48} className="text-white/20" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2 truncate">{video.title}</h3>
                <p className="text-gray-400 text-sm truncate mb-4">{video.video_url}</p>

                <div className="flex gap-2">
                  <Motion.button
                    onClick={() => openEditModal(video)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <Edit2 size={16} />
                    Edit
                  </Motion.button>
                  <Motion.button
                    onClick={() => handleDeleteVideo(video.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center px-3 py-2 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 size={16} />
                  </Motion.button>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      )}

      {/* Add Video Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border-2 border-white/10 rounded-3xl p-8 max-w-2xl w-full my-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Add New Video</h2>
            <form onSubmit={handleAddVideo}>
              {/* Title */}
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">
                  Video Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter video title"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:border-white/30 focus:outline-none"
                  required
                />
              </div>

              {/* Google Drive Link */}
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">
                  Google Drive Link *
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:border-white/30 focus:outline-none"
                  required
                />
                <p className="text-gray-500 text-xs mt-1">Paste the shareable Google Drive link</p>
              </div>

              {/* Thumbnail */}
              <div className="mb-6">
                <label className="block text-white text-sm font-semibold mb-2">
                  Thumbnail Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="flex items-center justify-center gap-2 w-full bg-white/5 border-2 border-dashed border-white/10 rounded-2xl px-4 py-8 cursor-pointer hover:border-white/30 transition-colors"
                  >
                    <Upload size={24} className="text-gray-400" />
                    <span className="text-gray-400">
                      {formData.thumbnail ? formData.thumbnail.name : 'Click to upload thumbnail'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({ title: '', videoUrl: '', thumbnail: null });
                  }}
                  className="flex-1 px-4 py-3 bg-white/5 text-white rounded-2xl hover:bg-white/10 transition-colors"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Add Video'}
                </button>
              </div>
            </form>
          </Motion.div>
        </div>
      )}

      {/* Edit Video Modal */}
      {editingVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border-2 border-white/10 rounded-3xl p-8 max-w-2xl w-full my-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Edit Video</h2>
            <form onSubmit={handleUpdateVideo}>
              {/* Title */}
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">
                  Video Title *
                </label>
                <input
                  type="text"
                  value={editingVideo.title}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  placeholder="Enter video title"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:border-white/30 focus:outline-none"
                  required
                />
              </div>

              {/* Google Drive Link */}
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">
                  Google Drive Link *
                </label>
                <input
                  type="url"
                  value={editingVideo.video_url}
                  onChange={(e) => setEditingVideo({ ...editingVideo, video_url: e.target.value })}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:border-white/30 focus:outline-none"
                  required
                />
              </div>

              {/* Current Thumbnail */}
              {editingVideo.thumbnail_url && (
                <div className="mb-4">
                  <label className="block text-white text-sm font-semibold mb-2">
                    Current Thumbnail
                  </label>
                  <img
                    src={editingVideo.thumbnail_url}
                    alt="Current thumbnail"
                    className="w-full max-w-xs rounded-2xl"
                  />
                </div>
              )}

              {/* New Thumbnail */}
              <div className="mb-6">
                <label className="block text-white text-sm font-semibold mb-2">
                  Update Thumbnail (optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                    id="thumbnail-upload-edit"
                  />
                  <label
                    htmlFor="thumbnail-upload-edit"
                    className="flex items-center justify-center gap-2 w-full bg-white/5 border-2 border-dashed border-white/10 rounded-2xl px-4 py-8 cursor-pointer hover:border-white/30 transition-colors"
                  >
                    <Upload size={24} className="text-gray-400" />
                    <span className="text-gray-400">
                      {formData.thumbnail ? formData.thumbnail.name : 'Click to upload new thumbnail'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingVideo(null);
                    setFormData({ title: '', videoUrl: '', thumbnail: null });
                  }}
                  className="flex-1 px-4 py-3 bg-white/5 text-white rounded-2xl hover:bg-white/10 transition-colors"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                  disabled={uploading}
                >
                  {uploading ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </Motion.div>
        </div>
      )}
    </div>
  );
};

export default Videos;
