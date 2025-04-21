import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { CalendarCheck, User, Clock, Car, Star, LogOut, Settings, FileText, Bell, Menu, X } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

// Mock data
const upcomingBookings = [
  {
    id: 'BK1234',
    serviceType: 'Deluxe Wash',
    date: '2025-05-15',
    time: '10:00',
    location: '123 Main St, San Francisco, CA 94105',
    status: 'confirmed',
    price: 49.99
  },
  {
    id: 'BK1235',
    serviceType: 'Premium Detailing',
    date: '2025-05-22',
    time: '14:30',
    location: '123 Main St, San Francisco, CA 94105',
    status: 'pending',
    price: 89.99
  }
];

const pastBookings = [
  {
    id: 'BK1230',
    serviceType: 'Basic Wash',
    date: '2025-04-01',
    time: '09:00',
    location: '123 Main St, San Francisco, CA 94105',
    status: 'completed',
    price: 29.99,
    rating: 5
  },
  {
    id: 'BK1231',
    serviceType: 'Deluxe Wash',
    date: '2025-04-10',
    time: '13:00',
    location: '123 Main St, San Francisco, CA 94105',
    status: 'completed',
    price: 49.99,
    rating: 4
  },
  {
    id: 'BK1232',
    serviceType: 'Basic Wash',
    date: '2025-04-20',
    time: '11:30',
    location: '123 Main St, San Francisco, CA 94105',
    status: 'completed',
    price: 29.99,
    rating: 5
  }
];

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

const CustomerDashboard: React.FC = () => {
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
    return location.pathname === path || location.pathname === `/dashboard/customer${path}`;
  };
  
  // Overview component
  const Overview: React.FC = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <CalendarCheck className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-semibold">Upcoming Bookings</h3>
              </div>
              <p className="text-3xl font-bold mb-2">{upcomingBookings.length}</p>
              <p>Next: {upcomingBookings.length > 0 ? upcomingBookings[0].serviceType : 'None'}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-teal-500 to-teal-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-semibold">Past Bookings</h3>
              </div>
              <p className="text-3xl font-bold mb-2">{pastBookings.length}</p>
              <p>Total services completed</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-500 to-amber-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Star className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-semibold">Average Rating</h3>
              </div>
              <p className="text-3xl font-bold mb-2">
                {pastBookings.length > 0 
                  ? (pastBookings.reduce((acc, booking) => acc + (booking.rating || 0), 0) / pastBookings.length).toFixed(1)
                  : 'N/A'
                }
              </p>
              <p>Based on {pastBookings.length} reviews</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Bookings</h3>
          </div>
          
          {upcomingBookings.length > 0 ? (
            <div>
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">{booking.serviceType}</h4>
                      <p className="text-gray-600 text-sm">
                        {new Date(booking.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric'
                        })} | {booking.time}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">{booking.location}</p>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </span>
                      
                      <Button variant="outline" size="sm" className="ml-3">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-700 mb-2">No Upcoming Bookings</h4>
              <p className="text-gray-500 mb-4">You don't have any scheduled car washes.</p>
              <Link to="/booking">
                <Button variant="primary">Book a Wash</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Bookings component
  const Bookings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
        
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
                activeTab === 'past'
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('past')}
            >
              Past
            </button>
          </div>
          
          <div className="divide-y divide-gray-100">
            {activeTab === 'upcoming' ? (
              upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => (
                  <div key={booking.id} className="p-6 hover:bg-gray-50">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                          <Car className="w-6 h-6 text-blue-700" />
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-1">
                            <h3 className="font-semibold text-gray-900 mr-3">{booking.serviceType}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                            </span>
                          </div>
                          
                          <p className="text-gray-500 text-sm">Booking ID: {booking.id}</p>
                          <p className="text-gray-500 text-sm">
                            {new Date(booking.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric'
                            })} | {booking.time}
                          </p>
                          <p className="text-gray-500 text-sm mt-1">{booking.location}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 lg:mt-0">
                        <p className="text-lg font-semibold text-gray-900 mb-3">${booking.price.toFixed(2)}</p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="danger" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-700 mb-2">No Upcoming Bookings</h4>
                  <p className="text-gray-500 mb-4">You don't have any scheduled car washes.</p>
                  <Link to="/booking">
                    <Button variant="primary">Book a Wash</Button>
                  </Link>
                </div>
              )
            ) : (
              pastBookings.length > 0 ? (
                pastBookings.map((booking) => (
                  <div key={booking.id} className="p-6 hover:bg-gray-50">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mr-4 flex-shrink-0">
                          <Car className="w-6 h-6 text-gray-700" />
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-1">
                            <h3 className="font-semibold text-gray-900 mr-3">{booking.serviceType}</h3>
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                              Completed
                            </span>
                          </div>
                          
                          <p className="text-gray-500 text-sm">Booking ID: {booking.id}</p>
                          <p className="text-gray-500 text-sm">
                            {new Date(booking.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric'
                            })} | {booking.time}
                          </p>
                          
                          <div className="mt-2 flex items-center">
                            <span className="text-sm mr-2">Your Rating:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={16} 
                                  className={i < (booking.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 lg:mt-0">
                        <p className="text-lg font-semibold text-gray-900 mb-3">${booking.price.toFixed(2)}</p>
                        <Button variant="outline" size="sm">
                          Book Again
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-700 mb-2">No Past Bookings</h4>
                  <p className="text-gray-500">You haven't completed any car washes yet.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  };
  
  // Profile component
  const Profile: React.FC = () => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
      name: user?.name || '',
      email: user?.email || '',
      phone: '(555) 123-4567',
      address: '123 Main St',
      city: 'San Francisco',
      zipCode: '94105',
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // In a real app, you would save the profile data to the backend
      setEditMode(false);
    };
    
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-blue-50 border-b border-blue-100">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold mr-4">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                
                {!editMode ? (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="sm"
                    >
                      Save
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.phone}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Home Address</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.address}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.city}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.zipCode}</p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
          </div>
          
          <div className="p-6">
            <Button variant="outline">Change Password</Button>
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
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-gray-500 text-sm">{user?.email}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <NavItem 
                  to="/dashboard/customer" 
                  icon={<CalendarCheck size={20} />} 
                  text="Overview" 
                  isActive={isActive('/dashboard/customer') || isActive('/')}
                />
                <NavItem 
                  to="/dashboard/customer/bookings" 
                  icon={<Clock size={20} />} 
                  text="My Bookings" 
                  isActive={isActive('/bookings')}
                />
                <NavItem 
                  to="/dashboard/customer/profile" 
                  icon={<User size={20} />} 
                  text="My Profile" 
                  isActive={isActive('/profile')}
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
                    to="/dashboard/customer" 
                    icon={<CalendarCheck size={20} />} 
                    text="Overview" 
                    isActive={isActive('/dashboard/customer') || isActive('/')}
                  />
                  <NavItem 
                    to="/dashboard/customer/bookings" 
                    icon={<Clock size={20} />} 
                    text="My Bookings" 
                    isActive={isActive('/bookings')}
                  />
                  <NavItem 
                    to="/dashboard/customer/profile" 
                    icon={<User size={20} />} 
                    text="My Profile" 
                    isActive={isActive('/profile')}
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
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;