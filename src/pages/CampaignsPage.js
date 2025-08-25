import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Plus, Search, Filter, MoreVertical } from 'lucide-react';

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Fetch campaigns from Firestore
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaignsCollection = collection(db, 'campaigns');
        const campaignSnapshot = await getDocs(campaignsCollection);
        const campaignList = campaignSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCampaigns(campaignList);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Filter campaigns based on search term and status
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search campaigns..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredCampaigns.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-gray-500">No campaigns found</p>
            </CardContent>
          </Card>
        ) : (
          filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{campaign.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium">{campaign.startDate || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-medium">{campaign.endDate || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="font-medium">${campaign.budget?.toLocaleString() || '0'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Spent</p>
                    <p className="font-medium">${campaign.spent?.toLocaleString() || '0'}</p>
                  </div>
                </div>
                {campaign.impressions !== undefined && (
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-500">Impressions</p>
                      <p className="font-medium">{campaign.impressions?.toLocaleString() || '0'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Clicks</p>
                      <p className="font-medium">{campaign.clicks?.toLocaleString() || '0'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Conversions</p>
                      <p className="font-medium">{campaign.conversions?.toLocaleString() || '0'}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CampaignsPage;
