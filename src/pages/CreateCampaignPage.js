import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCampaignPage = () => {
  const [campaignData, setCampaignData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    deadline: '',
    category: ''
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampaignData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement campaign creation logic
    console.log('Campaign data:', campaignData);
    // Navigate back to campaigns list after creation
    navigate('/campaigns');
  };

  return (
    <div className="create-campaign-page">
      <div className="container">
        <h1>Create New Campaign</h1>
        
        <form onSubmit={handleSubmit} className="campaign-form">
          <div className="form-group">
            <label htmlFor="title">Campaign Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={campaignData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={campaignData.description}
              onChange={handleInputChange}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="targetAmount">Target Amount ($)</label>
            <input
              type="number"
              id="targetAmount"
              name="targetAmount"
              value={campaignData.targetAmount}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={campaignData.deadline}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={campaignData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              <option value="technology">Technology</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
              <option value="environment">Environment</option>
              <option value="arts">Arts & Culture</option>
              <option value="community">Community</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/campaigns')}>
              Cancel
            </button>
            <button type="submit" className="primary">
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaignPage;
