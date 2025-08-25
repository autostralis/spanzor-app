import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/api';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const profileData = await getUserProfile(user.id);
      setProfile(profileData);
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(user.id, profile);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>User Profile</h1>
        {!isEditing && (
          <button 
            className="edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="profile-content">
        <div className="profile-avatar">
          <img 
            src={profile.avatar || '/default-avatar.png'} 
            alt="Profile Avatar"
            className="avatar-image"
          />
        </div>

        <div className="profile-fields">
          <div className="field-group">
            <label htmlFor="name">Name:</label>
            {isEditing ? (
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-value">{profile.name}</span>
            )}
          </div>

          <div className="field-group">
            <label htmlFor="email">Email:</label>
            {isEditing ? (
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-value">{profile.email}</span>
            )}
          </div>

          <div className="field-group">
            <label htmlFor="bio">Bio:</label>
            {isEditing ? (
              <textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                className="profile-textarea"
                rows="4"
              />
            ) : (
              <p className="profile-value">{profile.bio || 'No bio added yet.'}</p>
            )}
          </div>

          {isEditing && (
            <div className="profile-actions">
              <button 
                className="save-btn"
                onClick={handleSave}
              >
                Save Changes
              </button>
              <button 
                className="cancel-btn"
                onClick={() => {
                  setIsEditing(false);
                  fetchProfile(); // Reset to original values
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
