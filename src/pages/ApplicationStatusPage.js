import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ApplicationStatusPage.css';

const ApplicationStatusPage = () => {
  const { applicationId } = useParams();
  const [applicationData, setApplicationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        setLoading(true);
        // Simulate API call
        const response = await fetch(`/api/applications/${applicationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch application status');
        }
        const data = await response.json();
        setApplicationData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (applicationId) {
      fetchApplicationStatus();
    }
  }, [applicationId]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'status-approved';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      case 'under review':
        return 'status-review';
      default:
        return 'status-default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="application-status-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading application status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="application-status-page">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  if (!applicationData) {
    return (
      <div className="application-status-page">
        <div className="not-found-container">
          <h2>Application Not Found</h2>
          <p>The application with ID {applicationId} could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="application-status-page">
      <div className="container">
        <header className="page-header">
          <h1>Application Status</h1>
          <p className="application-id">Application ID: {applicationId}</p>
        </header>

        <div className="status-card">
          <div className="status-header">
            <h2>Current Status</h2>
            <span className={`status-badge ${getStatusColor(applicationData.status)}`}>
              {applicationData.status}
            </span>
          </div>
          
          <div className="status-details">
            <div className="detail-row">
              <span className="label">Application Type:</span>
              <span className="value">{applicationData.type}</span>
            </div>
            <div className="detail-row">
              <span className="label">Submitted:</span>
              <span className="value">{formatDate(applicationData.submittedAt)}</span>
            </div>
            <div className="detail-row">
              <span className="label">Last Updated:</span>
              <span className="value">{formatDate(applicationData.updatedAt)}</span>
            </div>
            {applicationData.estimatedCompletion && (
              <div className="detail-row">
                <span className="label">Estimated Completion:</span>
                <span className="value">{formatDate(applicationData.estimatedCompletion)}</span>
              </div>
            )}
          </div>
        </div>

        {applicationData.timeline && applicationData.timeline.length > 0 && (
          <div className="timeline-card">
            <h2>Application Timeline</h2>
            <div className="timeline">
              {applicationData.timeline.map((event, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h3>{event.title}</h3>
                    <p className="timeline-date">{formatDate(event.date)}</p>
                    {event.description && (
                      <p className="timeline-description">{event.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {applicationData.documents && applicationData.documents.length > 0 && (
          <div className="documents-card">
            <h2>Related Documents</h2>
            <div className="documents-list">
              {applicationData.documents.map((doc, index) => (
                <div key={index} className="document-item">
                  <span className="document-name">{doc.name}</span>
                  <span className="document-date">{formatDate(doc.uploadedAt)}</span>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="document-link">
                    View
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {applicationData.notes && (
          <div className="notes-card">
            <h2>Additional Notes</h2>
            <p>{applicationData.notes}</p>
          </div>
        )}

        <div className="actions-card">
          <h2>Actions</h2>
          <div className="action-buttons">
            <button className="btn-primary" onClick={() => window.print()}>
              Print Status
            </button>
            <button className="btn-secondary" onClick={() => window.history.back()}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatusPage;
