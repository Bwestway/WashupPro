import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { CalendarCheck, User, Clock, Car, Star, LogOut, DollarSign, Map, CheckCircle, Truck, Menu, X } from 'lucide-react';
import Card, { CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

// Mock data for dashboard
const upcomingJobs = [
  {
    id: 'JB1234',
    serviceType: 'Deluxe Wash',
    customerName: 'Michael Johnson',
    date: '2025-05-15',
    time: '10:00',
    location: '123 Main St, San Francisco, CA 94105',
    status: 'assigned',
    payment: 'online',
    amount: 49.99
  },
  {
    id: 'JB1235',
    serviceType: 'Basic Wash',
    customerName: 'Sarah Miller',
    date: '2025-05-15',
    time: '13:30',
    location: '456 Market St, San Francisco, CA 94103',
    status: 'assigned',
    payment: 'cash',
    amount: 29.99
  },
  {
    id: 'JB1236',
    serviceType: 'Premium Detailing',
    customerName: 'David Wilson',
    date: '2025-05-16',
    time: '09:00',
    location: '789 Pine St, San Francisco, CA 94108',
    status: 'assigned',
    payment: 'online',
    amount: 89.99
  }
];

const completedJobs = [
  {
    id: 'JB1230',
    serviceType: 'Basic Wash',
    customerName: 'Emma Brown',
    date: '2025-05-10',
    time: '11:00',
    location: '123 Main St, San Francisco, CA 94105',
    status: 'completed',
    payment: 'online',
    amount: 29.99,
    rating: 5,
    feedback: 'Great service, very thorough!'
  },
  {
    id: 'JB1231',
    serviceType: 'Deluxe Wash',
    customerName: 'James Taylor',
    date: '2025-05-09',
    time: '14:00',
    location: '456 Market St, San Francisco, CA 94103',
    status: 'completed',
    payment: 'cash',
    amount: 49.99,
    rating: 4,
    feedback: 'Good job, but a little late.'
  },
  {
    id: 'JB1232',
    serviceType: 'Premium Detailing',
    customerName: 'Sophia Martinez',
    date: '2025-05-08',
    time: '10:00',
    location: '789 Pine St, San Francisco, CA 94108',
    status: 'completed',
    payment: 'online',
    amount: 89.99,
    rating: 5,
    feedback: 'Exceptional service! Car looks brand new.'
  }
];

// Calculate earnings
const calculateEarnings = () => {
  const totalEarned = completedJobs.reduce((total, job) => total + job.amount, 0);
  const commission = 0.8; // 80% commission
  const technicianEarnings = totalEarned * commission;
  
  return {
    totalEarned,
    technicianEarnings,
    platformFee: totalEarned - technicianEarnings,
    jobsCompleted: completedJobs.length
  };
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, text, isActive }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-50 text-blue-700' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <div className="mr-3">{icon}</div>
      <span className="font-medium">{text}</span>
    </Link>
  );
};

const TechnicianDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentJob, setCurrentJob] = useState<any>(null);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Function to check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname === `/dashboard/technician${path}`;
  };
  
  // Start a job
  const startJob = (job: any) => {
    setCurrentJob({
      ...job,
      status: 'in_progress',
      startTime: new Date().toISOString()
    });
  };
  
  // Complete a job
  const completeJob = () => {
    if (currentJob) {
      // In a real app, you would update the job status in the backend
      alert('Job marked as completed!');
      setCurrentJob(null);
    }
  };
  
  // Dashboard Overview Component
  const Overview: React.FC = () => {
    const earnings = calculateEarnings();
    
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Technician Dashboard</h2>
        
        {currentJob && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Current Job In Progress</h3>
                    <p className="text-gray-600">{currentJob.serviceType} for {currentJob.customerName}</p>
                  </div>
                </div>
                
                <div className="mt-4 ml-13">
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Location:</span> {currentJob.location}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Started at:</span> {new Date(currentJob.startTime).toLocaleTimeString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Payment:</span> {currentJob.payment === 'online' ? 'Paid Online' : 'Cash on Completion'}
                  </p>
                </div>
              </div>
              
              <Button variant="primary" onClick={completeJob}>
                <CheckCircle size={18} className="mr-2" />
                Mark as Completed
              </Button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-semibold">Today's Jobs</h3>
              </div>
              <p className="text-3xl font-bold mb-2">
                {upcomingJobs.filter(job => 
                  new Date(job.date).toDateString() === new Date().toDateString()
                ).length}
              </p>
              <p>Scheduled for today</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <DollarSign className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-semibold">Earnings</h3>
              </div>
              <p className="text-3xl font-bold mb-2">${earnings.technicianEarnings.toFixed(2)}</p>
              <p>From {earnings.jobsCompleted} completed jobs</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-500 to-amber-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Star className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-semibold">Average Rating</h3>
              </div>
              <p className="text-3xl font-bold mb-2">
                {(completedJobs.reduce((acc, job) => acc + job.rating, 0) / completedJobs.length).toFixed(1)}
              </p>
              <p>Based on {completedJobs.length} reviews</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Jobs</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {upcomingJobs.length > 0 ? (
              upcomingJobs.map((job) => (
                <div key={job.id} className="p-6 hover:bg-gray-50">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <Car className="w-6 h-6 text-blue-700" />
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-1">
                          <h3 className="font-semibold text-gray-900 mr-3">{job.serviceType}</h3>
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                            Assigned
                          </span>
                        </div>
                        
                        <p className="text-gray-500">Customer: {job.customerName}</p>
                        <p className="text-gray-500 text-sm">
                          {new Date(job.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric'
                          })} | {job.time}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 lg:mt-0 flex flex-col items-end">
                      <p className="text-lg font-semibold text-gray-900 mb-3">
                        ${job.amount.toFixed(2)}
                        <span className="text-sm font-normal text-gray-500 ml-1">
                          ({job.payment === 'online' ? 'Paid Online' : 'Cash'})
                        </span>
                      </p>
                      
                      <Button 
                        variant="primary" 
                        disabled={!!currentJob}
                        onClick={() => startJob(job)}
                      >
                        Start Job
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-700 mb-2">No Upcoming Jobs</h4>
                <p className="text-gray-500">You don't have any scheduled jobs.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  // Jobs Component
  const Jobs: React.FC = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Jobs</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
            
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'completed'
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
          </div>
          
          <div className="divide-y divide-gray-100">
            {activeTab === 'upcoming' ? (
              upcomingJobs.length > 0 ? (
                upcomingJobs.map((job) => (
                  <div key={job.id} className="p-6 hover:bg-gray-50">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                          <Car className="w-6 h-6 text-blue-700" />
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-1">
                            <h3 className="font-semibold text-gray-900 mr-3">{job.serviceType}</h3>
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                              Assigned
                            </span>
                          </div>
                          
                          <p className="text-gray-500">Customer: {job.customerName}</p>
                          <p className="text-gray-500 text-sm">
                            {new Date(job.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric'
                            })} | {job.time}
                          </p>
                          <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 lg:mt-0 flex flex-col items-end">
                        <div className="flex mb-3">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="mr-2"
                          >
                            <Map size={16} className="mr-2" />
                            Directions
                          </Button>
                          
                          <Button 
                            variant="primary" 
                            size="sm"
                            disabled={!!currentJob}
                            onClick={() => startJob(job)}
                          >
                            Start Job
                          </Button>
                        </div>
                        
                        <p className="text-sm text-gray-500">
                          Est. earnings: <span className="font-semibold text-gray-900">${(job.amount * 0.8).toFixed(2)}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-700 mb-2">No Upcoming Jobs</h4>
                  <p className="text-gray-500">You don't have any scheduled jobs.</p>
                </div>
              )
            ) : (
              completedJobs.length > 0 ? (
                completedJobs.map((job) => (
                  <div key={job.id} className="p-6 hover:bg-gray-50">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
                          <CheckCircle className="w-6 h-6 text-green-700" />
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-1">
                            <h3 className="font-semibold text-gray-900 mr-3">{job.serviceType}</h3>
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                              Completed
                            </span>
                          </div>
                          
                          <p className="text-gray-500">Customer: {job.customerName}</p>
                          <p className="text-gray-500 text-sm">
                            {new Date(job.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric'
                            })} | {job.time}
                          </p>
                          
                          <div className="mt-2 flex items-center">
                            <span className="text-sm mr-2">Rating:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={16} 
                                  className={i < job.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} 
                                />
                              ))}
                            </div>
                          </div>
                          
                          {job.feedback && (
                            <p className="text-gray-600 mt-1 italic text-sm">"{job.feedback}"</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 lg:mt-0 text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ${(job.amount * 0.8).toFixed(2)}
                          <span className="text-sm font-normal text-gray-500 block">
                            (80% of ${job.amount.toFixed(2)})
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-700 mb-2">No Completed Jobs</h4>
                  <p className="text-gray-500">You haven't completed any jobs yet.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  };
  
  // Earnings Component
  const Earnings: React.FC = () => {
    const earnings = calculateEarnings();
    
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Earnings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-3">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Total Earnings</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">${earnings.technicianEarnings.toFixed(2)}</p>
              <p className="text-gray-500">From {earnings.jobsCompleted} completed jobs</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Jobs Completed</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">{earnings.jobsCompleted}</p>
              <p className="text-gray-500">Total services delivered</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mr-3">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Satisfaction</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {(completedJobs.reduce((acc, job) => acc + job.rating, 0) / completedJobs.length).toFixed(1)}/5
              </p>
              <p className="text-gray-500">Average customer rating</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Earnings Breakdown</h3>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Total Job Value</span>
                <span className="font-semibold text-gray-900">${earnings.totalEarned.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Platform Fee (20%)</span>
                <span className="font-semibold text-gray-900">-${earnings.platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-medium text-gray-900">Your Earnings (80%)</span>
                <span className="font-bold text-green-600">${earnings.technicianEarnings.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Payment Schedule</h4>
              <p className="text-gray-600 text-sm">
                Payments are processed every Monday for the previous week's completed jobs.
                Funds will be deposited directly to your linked bank account.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Payouts</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            <div className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">Week of May 1 - May 7, 2025</p>
                  <p className="text-gray-500 text-sm">3 jobs completed</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">$135.98</p>
                  <p className="text-green-600 text-sm">Paid on May 10</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">Week of Apr 24 - Apr 30, 2025</p>
                  <p className="text-gray-500 text-sm">2 jobs completed</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">$95.99</p>
                  <p className="text-green-600 text-sm">Paid on May 3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen pt-16 pb-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold mr-3">
                  {user?.name?.charAt(0).toUpperCase() || 'T'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-gray-500 text-sm">Technician</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <NavItem 
                  to="/dashboard/technician" 
                  icon={<CalendarCheck size={20} />} 
                  text="Dashboard" 
                  isActive={isActive('/dashboard/technician') || isActive('/')}
                />
                <NavItem 
                  to="/dashboard/technician/jobs" 
                  icon={<Car size={20} />} 
                  text="My Jobs" 
                  isActive={isActive('/jobs')}
                />
                <NavItem 
                  to="/dashboard/technician/earnings" 
                  icon={<DollarSign size={20} />} 
                  text="Earnings" 
                  isActive={isActive('/earnings')}
                />
                <hr className="my-4 border-gray-200" />
                <button 
                  onClick={handleLogout}
                  className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 w-full"
                >
                  <LogOut size={20} className="mr-3" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden fixed bottom-6 right-6 z-30">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="bg-blue-600 text-white p-4 rounded-full shadow-lg"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-20 flex items-end">
              <div className="bg-white rounded-t-xl w-full p-6 animate-slide-up">
                <nav className="space-y-4">
                  <NavItem 
                    to="/dashboard/technician" 
                    icon={<CalendarCheck size={20} />} 
                    text="Dashboard" 
                    isActive={isActive('/dashboard/technician') || isActive('/')}
                  />
                  <NavItem 
                    to="/dashboard/technician/jobs" 
                    icon={<Car size={20} />} 
                    text="My Jobs" 
                    isActive={isActive('/jobs')}
                  />
                  <NavItem 
                    to="/dashboard/technician/earnings" 
                    icon={<DollarSign size={20} />} 
                    text="Earnings" 
                    isActive={isActive('/earnings')}
                  />
                  <hr className="my-2 border-gray-200" />
                  <button 
                    onClick={handleLogout}
                    className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 w-full"
                  >
                    <LogOut size={20} className="mr-3" />
                    <span className="font-medium">Logout</span>
                  </button>
                </nav>
              </div>
            </div>
          )}
          
          {/* Main Content */}
          <div className="flex-1 mt-6 md:mt-0">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/earnings" element={<Earnings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;