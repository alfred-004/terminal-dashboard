import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, 
  Search,
  AlertTriangle,
  Shield,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star
} from 'lucide-react';

interface ImportantProps {
  onBack: () => void;
}

interface ImportantItem {
  id: number;
  title: string;
  description: string;
  type: 'security' | 'maintenance' | 'update' | 'alert' | 'policy';
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'resolved' | 'pending';
  timestamp: string;
  dueDate?: string;
}

const Important: React.FC<ImportantProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const importantItems: ImportantItem[] = [
    {
      id: 1,
      title: 'Security Protocol Update',
      description: 'New authentication requirements have been implemented. All users must update their passwords and enable 2FA within 48 hours.',
      type: 'security',
      priority: 'high',
      status: 'active',
      timestamp: '2024-01-15 14:30:00',
      dueDate: '2024-01-17 23:59:59'
    },
    {
      id: 2,
      title: 'Scheduled Maintenance Window',
      description: 'Database optimization and server updates will be performed tonight. Expected downtime: 30 minutes starting at 2:00 AM UTC.',
      type: 'maintenance',
      priority: 'high',
      status: 'pending',
      timestamp: '2024-01-15 10:15:00',
      dueDate: '2024-01-16 02:00:00'
    },
    {
      id: 3,
      title: 'System Performance Alert',
      description: 'CPU usage has been consistently above 85% for the past hour. Monitoring team is investigating potential causes.',
      type: 'alert',
      priority: 'medium',
      status: 'active',
      timestamp: '2024-01-15 13:45:00'
    },
    {
      id: 4,
      title: 'Privacy Policy Update',
      description: 'Updated privacy policy has been published. Please review changes in data handling procedures and user consent requirements.',
      type: 'policy',
      priority: 'medium',
      status: 'active',
      timestamp: '2024-01-14 09:00:00'
    },
    {
      id: 5,
      title: 'Critical Security Patch',
      description: 'Security vulnerability patched in authentication module. All services have been updated and are running the latest version.',
      type: 'security',
      priority: 'high',
      status: 'resolved',
      timestamp: '2024-01-13 16:20:00'
    },
    {
      id: 6,
      title: 'Backup System Verification',
      description: 'Weekly backup integrity check completed successfully. All backup files verified and accessible.',
      type: 'maintenance',
      priority: 'low',
      status: 'resolved',
      timestamp: '2024-01-13 03:00:00'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'security': return <Shield className="w-4 h-4" />;
      case 'maintenance': return <Calendar className="w-4 h-4" />;
      case 'update': return <FileText className="w-4 h-4" />;
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
      case 'policy': return <FileText className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-info text-info-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending': return <Clock className="w-4 h-4 text-info" />;
      default: return <XCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const filteredItems = importantItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    return matchesSearch && matchesType && matchesPriority;
  });

  const sortedItems = filteredItems.sort((a, b) => {
    // Sort by priority first (high -> medium -> low), then by timestamp (newest first)
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <div className="min-h-screen bg-background p-2 md:p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              onClick={onBack} 
              variant="outline" 
              size="sm"
              className="terminal-border"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Terminal
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold terminal-text">
                <Star className="w-6 h-6 md:w-8 md:h-8 inline mr-2" />
                Important
              </h1>
              <p className="text-muted-foreground font-mono text-sm">
                ~/important - Critical Notifications & Alerts
              </p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground font-mono hidden md:block">
            {new Date().toLocaleString()}
          </div>
        </div>

        {/* Filters */}
        <Card className="metric-card">
          <CardHeader className="pb-3">
            <CardTitle className="terminal-text text-lg">Filters & Search</CardTitle>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search important items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 font-mono"
                />
              </div>
              <div className="flex gap-2">
                <select 
                  value={filterType} 
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 bg-card border border-border rounded font-mono text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="security">Security</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="alert">Alerts</option>
                  <option value="policy">Policy</option>
                </select>
                <select 
                  value={filterPriority} 
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-3 py-2 bg-card border border-border rounded font-mono text-sm"
                >
                  <option value="all">All Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Important Items List */}
        <Card className="metric-card">
          <CardHeader>
            <CardTitle className="terminal-text">
              Important Items ({sortedItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh]">
              <div className="space-y-4">
                {sortedItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded">
                          {getTypeIcon(item.type)}
                        </div>
                        <div>
                          <h3 className="font-mono font-semibold text-foreground">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getPriorityColor(item.priority)} variant="secondary">
                              {item.priority.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {item.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <span className="text-xs text-muted-foreground font-mono capitalize">
                          {item.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground font-mono mb-3 pl-11">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono pl-11">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(item.timestamp).toLocaleString()}</span>
                      </div>
                      {item.dueDate && (
                        <div className="flex items-center gap-1 text-warning">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Due: {new Date(item.dueDate).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {sortedItems.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="font-mono">No important items found</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Important;