import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  ArrowLeft, 
  Search,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface DashboardProps {
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');
  const itemsPerPage = 8;

  // Mock data for metrics
  const metrics = [
    {
      title: 'Revenue',
      value: '$124,350',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-success'
    },
    {
      title: 'Users',
      value: '8,429',
      change: '+5.2%',
      trend: 'up',
      icon: Users,
      color: 'text-info'
    },
    {
      title: 'Conversions',
      value: '2,847',
      change: '+8.1%',
      trend: 'up',
      icon: Activity,
      color: 'text-primary'
    },
    {
      title: 'Growth',
      value: '18.3%',
      change: '+2.4%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-warning'
    }
  ];

  // Mock data for charts
  const lineData = [
    { month: 'Jan', revenue: 4000, users: 2400 },
    { month: 'Feb', revenue: 3000, users: 1398 },
    { month: 'Mar', revenue: 2000, users: 9800 },
    { month: 'Apr', revenue: 2780, users: 3908 },
    { month: 'May', revenue: 1890, users: 4800 },
    { month: 'Jun', revenue: 2390, users: 3800 },
    { month: 'Jul', revenue: 3490, users: 4300 }
  ];

  const barData = [
    { category: 'Desktop', value: 4000, fill: 'hsl(var(--primary))' },
    { category: 'Mobile', value: 3000, fill: 'hsl(var(--secondary))' },
    { category: 'Tablet', value: 2000, fill: 'hsl(var(--accent))' },
    { category: 'Other', value: 1000, fill: 'hsl(var(--info))' }
  ];

  const pieData = [
    { name: 'Organic', value: 45, fill: 'hsl(var(--success))' },
    { name: 'Paid', value: 30, fill: 'hsl(var(--primary))' },
    { name: 'Social', value: 15, fill: 'hsl(var(--secondary))' },
    { name: 'Direct', value: 10, fill: 'hsl(var(--warning))' }
  ];

  // Mock data for table
  const tableData = [
    { id: 1, user: 'john_doe', email: 'john@example.com', status: 'active', revenue: '$1,234', date: '2024-01-15' },
    { id: 2, user: 'jane_smith', email: 'jane@example.com', status: 'pending', revenue: '$2,567', date: '2024-01-14' },
    { id: 3, user: 'mike_wilson', email: 'mike@example.com', status: 'active', revenue: '$899', date: '2024-01-13' },
    { id: 4, user: 'sarah_jones', email: 'sarah@example.com', status: 'inactive', revenue: '$3,456', date: '2024-01-12' },
    { id: 5, user: 'tom_brown', email: 'tom@example.com', status: 'active', revenue: '$1,789', date: '2024-01-11' },
    { id: 6, user: 'lisa_davis', email: 'lisa@example.com', status: 'pending', revenue: '$2,123', date: '2024-01-10' },
    { id: 7, user: 'kevin_miller', email: 'kevin@example.com', status: 'active', revenue: '$4,567', date: '2024-01-09' },
    { id: 8, user: 'emma_taylor', email: 'emma@example.com', status: 'active', revenue: '$1,345', date: '2024-01-08' },
    { id: 9, user: 'david_clark', email: 'david@example.com', status: 'inactive', revenue: '$987', date: '2024-01-07' },
    { id: 10, user: 'anna_white', email: 'anna@example.com', status: 'active', revenue: '$2,890', date: '2024-01-06' }
  ];

  // Filter and sort data
  const filteredData = tableData.filter(item => {
    const matchesSearch = item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortField === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortField === 'revenue') return parseFloat(b.revenue.replace('$', '').replace(',', '')) - parseFloat(a.revenue.replace('$', '').replace(',', ''));
    return a.user.localeCompare(b.user);
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'inactive': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
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
                ▲ arch_004
              </h1>
              <p className="text-muted-foreground font-mono text-sm">
                ~/dashboard - Admin Analytics Panel
              </p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground font-mono hidden md:block">
            {new Date().toLocaleString()}
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="metric-card">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold terminal-text">
                  {metric.value}
                </div>
                <Badge variant="outline" className={`mt-2 ${metric.color}`}>
                  {metric.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Line Chart */}
          <Card className="chart-container lg:col-span-2">
            <CardHeader>
              <CardTitle className="terminal-text">Revenue & Users Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }} 
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="users" stroke="hsl(var(--secondary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="chart-container">
            <CardHeader>
              <CardTitle className="terminal-text">Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bar Chart */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="terminal-text">Device Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                  }} 
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card className="metric-card">
          <CardHeader>
            <CardTitle className="terminal-text">User Analytics</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 font-mono"
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32 font-mono">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortField} onValueChange={setSortField}>
                  <SelectTrigger className="w-32 font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Sort by Date</SelectItem>
                    <SelectItem value="revenue">Sort by Revenue</SelectItem>
                    <SelectItem value="user">Sort by Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="data-table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-mono">User</TableHead>
                    <TableHead className="font-mono">Email</TableHead>
                    <TableHead className="font-mono">Status</TableHead>
                    <TableHead className="font-mono">Revenue</TableHead>
                    <TableHead className="font-mono">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono font-medium">
                        {item.user}
                      </TableCell>
                      <TableCell className="font-mono text-muted-foreground">
                        {item.email}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono font-semibold text-success">
                        {item.revenue}
                      </TableCell>
                      <TableCell className="font-mono text-muted-foreground">
                        {item.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground font-mono">
                Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} results
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="font-mono"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="font-mono text-sm text-muted-foreground">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="font-mono"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;