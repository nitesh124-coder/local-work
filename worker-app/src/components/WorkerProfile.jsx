import React, { useState, useEffect } from 'react';
import WorkerAuthService from '../services/workerAuthService';

const WorkerProfile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    skills: [],
    experience: '',
    availability: '',
    bio: ''
  });
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    
    try {
      const profile = await WorkerAuthService.getProfile();
      setProfileData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
        skills: profile.skills || [],
        experience: profile.experience || '',
        availability: profile.availability || '',
        bio: profile.bio || ''
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddSkill = () => {
    if (newSkill && !profileData.skills.includes(newSkill)) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Prepare profile data for submission
      const profileDataForSubmission = {
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.address,
        skills: [...profileData.skills], // Ensure we're sending a clean array
        experience: profileData.experience,
        availability: profileData.availability,
        bio: profileData.bio
      };
      
      await WorkerAuthService.updateProfile(profileDataForSubmission);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profileData.name) {
    return (
      <div id="main">
        <div className="inner">
          <h1>Worker Profile</h1>
          <p>Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="main">
      <div className="inner">
        <h1>Worker Profile</h1>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form method="post" onSubmit={handleSubmit}>
          <div className="row gtr-uniform">
            <div className="col-6 col-12-xsmall">
              <input
                type="text"
                name="name"
                id="profile-name"
                value={profileData.name}
                onChange={handleProfileChange}
                placeholder="Full Name"
              />
            </div>
            <div className="col-6 col-12-xsmall">
              <input
                type="email"
                name="email"
                id="profile-email"
                value={profileData.email}
                onChange={handleProfileChange}
                placeholder="Email"
              />
            </div>
            <div className="col-6 col-12-xsmall">
              <input
                type="tel"
                name="phone"
                id="profile-phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                placeholder="Phone Number"
              />
            </div>
            <div className="col-6 col-12-xsmall">
              <input
                type="text"
                name="address"
                id="profile-address"
                value={profileData.address}
                onChange={handleProfileChange}
                placeholder="Service Address"
              />
            </div>
            <div className="col-6 col-12-xsmall">
              <input
                type="text"
                name="experience"
                id="profile-experience"
                value={profileData.experience}
                onChange={handleProfileChange}
                placeholder="Years of Experience"
              />
            </div>
            <div className="col-6 col-12-xsmall">
              <input
                type="text"
                name="availability"
                id="profile-availability"
                value={profileData.availability}
                onChange={handleProfileChange}
                placeholder="Availability"
              />
            </div>
            <div className="col-12">
              <textarea
                name="bio"
                id="profile-bio"
                value={profileData.bio}
                onChange={handleProfileChange}
                placeholder="Professional Bio"
                rows="4"
              ></textarea>
            </div>
            <div className="col-12">
              <h3>Skills</h3>
              <div className="skills-container">
                {profileData.skills.map((skill, index) => (
                  <span key={`${skill}-${index}`} className="skill-tag">
                    {skill}
                    <button
                      type="button"
                      className="remove-skill"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="add-skill">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                />
                <button type="button" onClick={handleAddSkill} className="button small">
                  Add Skill
                </button>
              </div>
            </div>
            <div className="col-12">
              <ul className="actions">
                <li><input type="submit" value={loading ? "Updating..." : "Update Profile"} className="primary" disabled={loading} /></li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkerProfile;