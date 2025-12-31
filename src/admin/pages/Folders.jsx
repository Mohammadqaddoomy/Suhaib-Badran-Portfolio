import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { supabase } from '../../config/firebase';
import { Folder, Plus, Edit2, Trash2, Video } from 'lucide-react';

const Folders = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderLogo, setNewFolderLogo] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [editingFolder, setEditingFolder] = useState(null);
  const [editLogoFile, setEditLogoFile] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFolders();
  }, []);

  const uploadLogo = async (file) => {
    if (!file) return null;

    try {
      setUploadingLogo(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading logo:', error);
      return null;
    } finally {
      setUploadingLogo(false);
    }
  };

  const fetchFolders = async () => {
    try {
      const { data: foldersData, error: foldersError } = await supabase
        .from('folders')
        .select('*')
        .order('order', { ascending: true });

      if (foldersError) throw foldersError;

      // Get video counts for each folder
      const foldersWithCounts = await Promise.all(
        (foldersData || []).map(async (folder) => {
          const { count } = await supabase
            .from('videos')
            .select('*', { count: 'exact', head: true })
            .eq('folder_id', folder.id);
          
          return {
            ...folder,
            videoCount: count || 0
          };
        })
      );

      setFolders(foldersWithCounts);
    } catch (error) {
      console.error('Error fetching folders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFolder = async (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    try {
      let logoUrl = null;
      if (newFolderLogo) {
        logoUrl = await uploadLogo(newFolderLogo);
        if (!logoUrl) {
          alert('Failed to upload logo. Please try again.');
          return;
        }
      }

      const { error } = await supabase
        .from('folders')
        .insert([{
          name: newFolderName,
          logo_url: logoUrl,
          order: folders.length,
          created_at: new Date().toISOString()
        }]);

      if (error) {
        console.error('Supabase error:', error);
        alert('Error adding folder: ' + error.message);
        throw error;
      }

      setNewFolderName('');
      setNewFolderLogo(null);
      setShowAddModal(false);
      fetchFolders();
    } catch (error) {
      console.error('Error adding folder:', error);
    }
  };

  const handleUpdateFolder = async (e) => {
    e.preventDefault();
    if (!editingFolder || !editingFolder.name.trim()) return;

    try {
      let logoUrl = editingFolder.logo_url;
      if (editLogoFile) {
        logoUrl = await uploadLogo(editLogoFile);
      }

      const { error } = await supabase
        .from('folders')
        .update({ 
          name: editingFolder.name,
          logo_url: logoUrl
        })
        .eq('id', editingFolder.id);

      if (error) throw error;

      setEditingFolder(null);
      setEditLogoFile(null);
      fetchFolders();
    } catch (error) {
      console.error('Error updating folder:', error);
    }
  };

  const handleDeleteFolder = async (folderId) => {
    setDeleteConfirm(folderId);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;

    try {
      const { error } = await supabase
        .from('folders')
        .delete()
        .eq('id', deleteConfirm);

      if (error) throw error;

      setDeleteConfirm(null);
      fetchFolders();
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-white text-xl">Loading folders...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">
            Folders
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">Manage your portfolio folders</p>
        </div>
        <Motion.button
          onClick={() => setShowAddModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-colors text-sm sm:text-base"
        >
          <Plus size={20} />
          Add Folder
        </Motion.button>
      </Motion.div>

      {/* Folders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">{folders.map((folder, index) => (
          <Motion.div
            key={folder.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-white/5 border-2 border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:border-white/20 transition-all"
          >
            <div
              onClick={() => navigate(`/admin/videos/${folder.id}`)}
              className="cursor-pointer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-white/20 transition-colors">
                <Folder size={28} className="text-white sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-white font-bold text-lg sm:text-xl mb-2 truncate">{folder.name}</h3>
              <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                <Video size={14} className="sm:w-4 sm:h-4" />
                <span>{folder.videoCount} videos</span>
              </div>
            </div>

            <div className="flex gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
              <Motion.button
                onClick={() => setEditingFolder(folder)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors text-xs sm:text-sm"
              >
                <Edit2 size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Edit</span>
              </Motion.button>
              <Motion.button
                onClick={() => handleDeleteFolder(folder.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-2 sm:px-3 py-2 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors"
              >
                <Trash2 size={14} className="sm:w-4 sm:h-4" />
              </Motion.button>
            </div>
          </Motion.div>
        ))}
      </div>

      {/* Add Folder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border-2 border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Add New Folder</h2>
            <form onSubmit={handleAddFolder}>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Folder name"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base placeholder-gray-500 focus:border-white/30 focus:outline-none mb-4"
                autoFocus
              />
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-semibold text-gray-400 mb-2">Logo Image (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewFolderLogo(e.target.files[0])}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-white text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 focus:border-white/30 focus:outline-none"
                />
                {newFolderLogo && (
                  <p className="text-xs sm:text-sm text-gray-400 mt-2 truncate">Selected: {newFolderLogo.name}</p>
                )}
              </div>
              <div className="flex gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 text-white text-sm sm:text-base rounded-xl sm:rounded-2xl hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingLogo}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white text-black font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingLogo ? 'Uploading...' : 'Add Folder'}
                </button>
              </div>
            </form>
          </Motion.div>
        </div>
      )}

      {/* Edit Folder Modal */}
      {editingFolder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border-2 border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Edit Folder</h2>
            <form onSubmit={handleUpdateFolder}>
              <input
                type="text"
                value={editingFolder.name}
                onChange={(e) => setEditingFolder({ ...editingFolder, name: e.target.value })}
                placeholder="Folder name"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base placeholder-gray-500 focus:border-white/30 focus:outline-none mb-4"
                autoFocus
              />
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-semibold text-gray-400 mb-2">Logo Image (optional)</label>
                {editingFolder.logo_url && !editLogoFile && (
                  <div className="mb-3 flex items-center gap-3">
                    <img src={editingFolder.logo_url} alt="Current logo" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white/20" />
                    <span className="text-xs sm:text-sm text-gray-400">Current logo</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditLogoFile(e.target.files[0])}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-white text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 focus:border-white/30 focus:outline-none"
                />
                {editLogoFile && (
                  <p className="text-xs sm:text-sm text-gray-400 mt-2 truncate">New file: {editLogoFile.name}</p>
                )}
              </div>
              <div className="flex gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setEditingFolder(null)}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 text-white text-sm sm:text-base rounded-xl sm:rounded-2xl hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingLogo}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white text-black font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingLogo ? 'Uploading...' : 'Save'}
                </button>
              </div>
            </form>
          </Motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-zinc-900 border-2 border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full"
          >
            {/* Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center">
              <Trash2 size={28} className="text-red-400 sm:w-8 sm:h-8" />
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 text-center">Delete Folder?</h2>
            
            {/* Message */}
            <p className="text-gray-400 text-sm sm:text-base text-center mb-6 sm:mb-8">
              Are you sure you want to delete this folder? This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex gap-2 sm:gap-3">
              <Motion.button
                onClick={cancelDelete}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 border-2 border-white/20 text-white text-sm sm:text-base rounded-xl sm:rounded-2xl hover:bg-white/20 transition-all font-semibold"
              >
                Cancel
              </Motion.button>
              <Motion.button
                onClick={confirmDelete}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-red-500 text-white text-sm sm:text-base rounded-xl sm:rounded-2xl hover:bg-red-600 transition-all font-semibold"
              >
                Delete
              </Motion.button>
            </div>
          </Motion.div>
        </div>
      )}
    </div>
  );
};

export default Folders;
