import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Plus, Search, Filter, MoreVertical } from 'lucide-react';

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for campaigns
  useEffect(() => {
    const mockCampaigns = [
      {
        id: 1,
        name: 'Summer Sale 2024',
        status: 'active',
        startDate: '2024-06-01',
        endDate: '2024-08-31',
        budget: 50000,
        spent: 32500,
        impressions: 1250000,
        clicks: 25000,
        conversions: 850
      },
      {
        id: 2,
        name: 'Back to School',
        status: 'scheduled',
        startDate: '2024-08-15',
        endDate: '2024-09-30',
        budget: 30000,
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0
      },
      {
        id: 3,
        name: 'Holiday Promotions',
        status: 'draft',
        startDate: '2024-11-01',
        endDate: '2024-12-31',
        budget: 75000,
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0
      },
      {
        id: 4,
        name: 'Q2 Product Launch',
        status: 'completed',
        startDate: '2024-04-01',
        endDate: '2024-06-30',
        budget: 40000,
        spent: 38500,
        impressions: 980000,
        clicks: 19600,
        conversions: 720
      }
    ];

    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid gap-6">
        {filteredCampaigns.map(campaign => (
          <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">{campaign.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(campaign.status)}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </Badge>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{new Date(campaign.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">{new Date(campaign.endDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium">{formatCurrency(campaign.budget)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Spent</p>
                  <p className="font-medium">{formatCurrency(campaign.spent)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Impressions</p>
                  <p className="font-medium">{formatNumber(campaign.impressions)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Clicks</p>
                  <p className="font-medium">{formatNumber(campaign.clicks)}</p>
                </div>
              </div>
              
              {/* Progress Bar for Budget */}
              {campaign.budget > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Budget Usage</span>
                    <span>{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Performance Metrics */}
              {campaign.clicks > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">CTR</p>
                    <p className="font-medium">{((campaign.clicks / campaign.impressions) * 100).toFixed(2)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Conversion Rate</p>
                    <p className="font-medium">{((campaign.conversions / campaign.clicks) * 100).toFixed(2)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">CPC</p>
                    <p className="font-medium">{formatCurrency(campaign.spent / campaign.clicks)}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No campaigns found</h3>
          <p className="mt-2 text-gray-500">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Get started by creating your first campaign.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default CampaignsPage;
