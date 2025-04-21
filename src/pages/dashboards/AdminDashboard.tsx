import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { CalendarCheck, Users, Clock, DollarSign, User, LogOut, CheckCircle, XCircle, Plus, Menu, X, BarChart, Car, UserCheck, Settings, AlignJustify } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useAuth } from '../../contexts/AuthContext';

// Mock data
const dashboard = {
  stats: {
    totalBookings: 124,
    pendingBookings: 18,
    totalTechnicians: 32,
    pendingApplicants: 5,
    totalCustomers: 89,
    totalRevenue: 5823.45
  }
};

const technicians = [
  {
    id: 'T001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    rating: 4.8,
    joinDate: '2025-01-15',
    completedJobs: 56,
    status: 'active'
  },
  {
    id: 'T002',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '(555) 234-5678',
    location: 'Oakland, CA',
    rating: 4.9,
    joinDate: '2025-02-10',
    completedJobs: 43,
    status: 'active'
  },
  {
    id: 'T003',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '(555) 345-6789',
    location: 'San Jose, CA',
    rating: 4.6,
    joinDate: '2025-03-05',
    completedJobs: 32,
    status: 'active'
  }
];

const techniciansApplications = [
  {
    id: 'APP001',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    phone: '(555) 456-7890',
    location: 'Berkeley, CA',
    experience: '3 years at CarWash Express',
    applyDate: '2025-05-01',
    status: 'pending'
  },
  {
    id: 'APP002',
    name: 'Sarah Martinez',
    email: 'sarah.martinez@example.com',
    phone: '(555) 567-8901',
    location: 'San Francisco, CA',
    experience: '5 years of detailing experience',
    applyDate: '2025-05-03',
    status: 'pending'
  },
  {
    id: 'APP003',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '(555) 678-9012',
    location: 'Daly City, CA',
    experience: '2 years as mobile detailer',
    applyDate: '2025-05-05',
    status: 'pending'
  }
];

const bookings = [
  {
    id: 'BK1234',
    customerName: 'Emma Wilson',
    customerEmail: 'emma.wilson@example.com',
    serviceType: 'Deluxe Wash',
    date: '2025-05-15',
    time: '10:00',
    location: '123 Main St, San Francisco, CA 94105',
    technician: 'John Smith',
    status: 'confirmed',
    payment: 'paid',
    amount: 49.99
  },
  {
    id: 'BK1235',
    customerName: 'James Taylor',
    customerEmail: 'james.taylor@example.com',
    serviceType: 'Basic Wash',
    date: '2025-05-15',
    time: '13:30',
    location: '456 Market St, San Francisco, CA 94103',
    technician: 'Maria Garcia',
    status: 'confirmed',
    payment: 'paid',
    amount: 29.99
  },
  {
    id: 'BK1236',
    customerName: 'Sophia Martinez',
    customerEmail: 'sophia.martinez@example.com',
    serviceType: 'Premium Detailing',
    date: '2025-05-16',
    time: '09:00',
    location: '789 Pine St, San Francisco, CA 94108',
    technician: 'Pending Assignment',
    status: 'pending',
    payment: 'paid',
    amount: 89.99
  }
];

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, text, isActive, badge }) => {
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
      {badge !== undefined && badge > 0 && (
        <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
};

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Function to check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname === `/dashboard/admin${path}`;
  };
  
  // Overview Component
  const Overview: React.FC = () => {
    const recentBookings = bookings.slice(0, 5);
    
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-semibold">Bookings</h3>
              </div>
              <p className="text-3xl font-bold mb-2">{dashboard.stats.totalBookings}</p>
              <p className="flex items-center">
                <span className="bg-yellow-400 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full mr-2">
                  {dashboard.stats.pendingBookings}
                </span>
                Pending assignments
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-semibold">Technicians</h3>
              </div>
              <p className="text-3xl font-bold mb-2">{dashboard.stats.totalTechnicians}</p>
              <p className="flex items-center">
                <span className="bg-yellow-400 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full mr-2">
                  {dashboard.stats.pendingApplicants}
                </span>
                New applications
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <DollarSign className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-semibold">Revenue</h3>
              </div>
              <p className="text-3xl font-bold mb-2">${dashboard.stats.totalRevenue.toFixed(2)}</p>
              <p>From {dashboard.stats.totalBookings} bookings</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-gray-100">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{booking.serviceType}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(booking.date).toLocaleDateString()} | {booking.time}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/dashboard/admin/bookings">
                  <Button variant="outline" fullWidth>View All Bookings</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Technician Applications</h3>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-gray-100">
                {techniciansApplications.slice(0, 3).map((application) => (
                  <div key={application.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{application.name}</p>
                      <p className="text-gray-500 text-sm">
                        {application.location} | Applied: {new Date(application.applyDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <CheckCircle size={16} className="text-green-600" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <XCircle size={16} className="text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/dashboard/admin/technicians">
                  <Button variant="outline" fullWidth>Manage Technicians</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" fullWidth className="flex-col py-6">
                <Plus size={24} className="mb-2 text-blue-700" />
                <span>Add New Service</span>
              </Button>
              
              <Button variant="outline" fullWidth className="flex-col py-6">
                <UserCheck size={24} className="mb-2 text-blue-700" />
                <span>Review Applications</span>
              </Button>
              
              <Button variant="outline" fullWidth className="flex-col py-6">
                <Car size={24} className="mb-2 text-blue-700" />
                <span>Assign Technicians</span>
              </Button>
              
              <Button variant="outline" fullWidth className="flex-col py-6">
                <BarChart size={24} className="mb-2 text-blue-700" />
                <span>View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // Bookings Management Component
  const BookingsManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    
    // Filter bookings based on active tab
    const filteredBookings = activeTab === 'all' 
      ? bookings 
      : bookings.filter(booking => booking.status === activeTab);
    
    const handleViewDetails = (booking: any) => {
      setSelectedBooking(booking);
      setShowModal(true);
    };
    
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Bookings Management</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === 'all'
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Bookings
            </button>
            
            <button
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === 'pending'
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('pending')}
            >
              Pending
            </button>
            
            <button
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === 'confirmed'
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('confirmed')}
            >
              Confirmed
            </button>
            
            <button
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === 'completed'
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
            
            <button
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === 'cancelled'
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('cancelled')}
            >
              Cancelled
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technician
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.customerName}</div>
                      <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.serviceType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(booking.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.technician}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : booking.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${booking.amount.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.payment === 'paid' ? 'Paid' : 'Pending'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(booking)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Booking Details Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Booking Details"
          size="lg"
        >
          {selectedBooking && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Booking Information</h4>
                  <p className="text-gray-900"><span className="font-medium">ID:</span> {selectedBooking.id}</p>
                  <p className="text-gray-900"><span className="font-medium">Service:</span> {selectedBooking.serviceType}</p>
                  <p className="text-gray-900"><span className="font-medium">Date:</span> {new Date(selectedBooking.date).toLocaleDateString()}</p>
                  <p className="text-gray-900"><span className="font-medium">Time:</span> {selectedBooking.time}</p>
                  <p className="text-gray-900"><span className="font-medium">Status:</span> {selectedBooking.status}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Customer Information</h4>
                  <p className="text-gray-900"><span className="font-medium">Name:</span> {selectedBooking.customerName}</p>
                  <p className="text-gray-900"><span className="font-medium">Email:</span> {selectedBooking.customerEmail}</p>
                  <p className="text-gray-900"><span className="font-medium">Location:</span> {selectedBooking.location}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Payment Information</h4>
                <p className="text-gray-900"><span className="font-medium">Amount:</span> ${selectedBooking.amount.toFixed(2)}</p>
                <p className="text-gray-900"><span className="font-medium">Status:</span> {selectedBooking.payment === 'paid' ? 'Paid' : 'Pending'}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Assigned Technician</h4>
                
                {selectedBooking.technician === 'Pending Assignment' ? (
                  <div>
                    <p className="text-yellow-600 mb-2">No technician assigned yet</p>
                    <Button variant="primary">Assign Technician</Button>
                  </div>
                ) : (
                  <p className="text-gray-900">{selectedBooking.technician}</p>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                
                {selectedBooking.status === 'pending' && (
                  <Button variant="primary">
                    Confirm Booking
                  </Button>
                )}
                
                {(selectedBooking.status === 'pending' || selectedBooking.status === 'confirmed') && (
                  <Button variant="danger">
                    Cancel Booking
                  </Button>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    );
  };
  
  // Technician Management Component
  const TechnicianManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState('active');
    const [selectedApplication, setSelectedApplication] = useState<any>(null);
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    
    // View application details
    const handleViewApplication = (application: any) => {
      setSelectedApplication(application);
      setShowApplicationModal(true);
    };
    
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Technician Management</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'active'
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('active')}
            >
              Active Technicians
            </button>
            
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('applications')}
            >
              Applications
              <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {techniciansApplications.length}
              </span>
            </button>
          </div>
          
          {activeTab === 'active' ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jobs
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {technicians.map((technician) => (
                    <tr key={technician.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                            {technician.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{technician.name}</div>
                            <div className="text-sm text-gray-500">ID: {technician.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{technician.email}</div>
                        <div className="text-sm text-gray-500">{technician.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{technician.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="text-sm text-gray-900">{technician.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{technician.completedJobs}</div>
                        <div className="text-xs text-gray-500">completed</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {techniciansApplications.map((application) => (
                <div key={application.id} className="p-6 hover:bg-gray-50">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0 text-blue-700 font-semibold">
                        {application.name.charAt(0)}
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-1">
                          <h3 className="font-semibold text-gray-900 mr-3">{application.name}</h3>
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                            New Application
                          </span>
                        </div>
                        
                        <p className="text-gray-500">{application.email} | {application.phone}</p>
                        <p className="text-gray-500 text-sm">Location: {application.location}</p>
                        <p className="text-gray-500 text-sm mt-1">Applied: {new Date(application.applyDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 lg:mt-0 flex space-x-2">
                      <Button 
                        variant="outline"
                        onClick={() => handleViewApplication(application)}
                      >
                        View Details
                      </Button>
                      <Button variant="primary">Approve</Button>
                      <Button variant="danger">Reject</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Application Details Modal */}
        <Modal
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
          title="Application Details"
          size="lg"
        >
          {selectedApplication && (
            <div>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-2xl mr-4">
                    {selectedApplication.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedApplication.name}</h3>
                    <p className="text-gray-500">{selectedApplication.location}</p>
                    <p className="text-sm text-gray-500">Applied on {new Date(selectedApplication.applyDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h4>
                  <p className="text-gray-900"><span className="font-medium">Email:</span> {selectedApplication.email}</p>
                  <p className="text-gray-900"><span className="font-medium">Phone:</span> {selectedApplication.phone}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Application Details</h4>
                  <p className="text-gray-900"><span className="font-medium">ID:</span> {selectedApplication.id}</p>
                  <p className="text-gray-900"><span className="font-medium">Status:</span> Pending Review</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Experience</h4>
                <p className="text-gray-900">{selectedApplication.experience}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Documents</h4>
                <p className="text-gray-500 italic">No documents uploaded.</p>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setShowApplicationModal(false)}>
                  Close
                </Button>
                <Button variant="danger">
                  Reject
                </Button>
                <Button variant="primary">
                  Approve
                </Button>
              </div>
            </div>
          )}
        </Modal>
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
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-gray-500 text-sm">Administrator</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <NavItem 
                  to="/dashboard/admin" 
                  icon={<BarChart size={20} />} 
                  text="Dashboard" 
                  isActive={isActive('/dashboard/admin') || isActive('/')}
                />
                <NavItem 
                  to="/dashboard/admin/bookings" 
                  icon={<Calendar size={20} />} 
                  text="Bookings" 
                  isActive={isActive('/bookings')}
                  badge={dashboard.stats.pendingBookings}
                />
                <NavItem 
                  to="/dashboard/admin/technicians" 
                  icon={<Users size={20} />} 
                  text="Technicians" 
                  isActive={isActive('/technicians')}
                  badge={techniciansApplications.length}
                />
                <NavItem 
                  to="/dashboard/admin/customers" 
                  icon={<User size={20} />} 
                  text="Customers" 
                  isActive={isActive('/customers')}
                />
                <NavItem 
                  to="/dashboard/admin/services" 
                  icon={<AlignJustify size={20} />} 
                  text="Services" 
                  isActive={isActive('/services')}
                />
                <NavItem 
                  to="/dashboard/admin/settings" 
                  icon={<Settings size={20} />} 
                  text="Settings" 
                  isActive={isActive('/settings')}
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
                    to="/dashboard/admin" 
                    icon={<BarChart size={20} />} 
                    text="Dashboard" 
                    isActive={isActive('/dashboard/admin') || isActive('/')}
                  />
                  <NavItem 
                    to="/dashboard/admin/bookings" 
                    icon={<Calendar size={20} />} 
                    text="Bookings" 
                    isActive={isActive('/bookings')}
                    badge={dashboard.stats.pendingBookings}
                  />
                  <NavItem 
                    to="/dashboard/admin/technicians" 
                    icon={<Users size={20} />} 
                    text="Technicians" 
                    isActive={isActive('/technicians')}
                    badge={techniciansApplications.length}
                  />
                  <NavItem 
                    to="/dashboard/admin/customers" 
                    icon={<User size={20} />} 
                    text="Customers" 
                    isActive={isActive('/customers')}
                  />
                  <NavItem 
                    to="/dashboard/admin/services" 
                    icon={<AlignJustify size={20} />} 
                    text="Services" 
                    isActive={isActive('/services')}
                  />
                  <NavItem 
                    to="/dashboard/admin/settings" 
                    icon={<Settings size={20} />} 
                    text="Settings" 
                    isActive={isActive('/settings')}
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
              <Route path="/bookings" element={<BookingsManagement />} />
              <Route path="/technicians" element={<TechnicianManagement />} />
              <Route path="*" element={<Overview />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;