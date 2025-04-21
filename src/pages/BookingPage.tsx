import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, MapPin, CreditCard, Car, Info, Check } from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';
import Card, { CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

// Mock services data
const services = [
  {
    id: 'basic-wash',
    title: 'Basic Wash',
    description: 'Quick exterior wash with hand drying and wheel cleaning.',
    price: 29.99,
    duration: '30 mins',
    image: 'https://images.pexels.com/photos/372810/pexels-photo-372810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'deluxe-wash',
    title: 'Deluxe Wash',
    description: 'Complete exterior wash plus interior vacuum and dashboard cleaning.',
    price: 49.99,
    duration: '45 mins',
    image: 'https://images.pexels.com/photos/6873089/pexels-photo-6873089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'premium-detailing',
    title: 'Premium Detailing',
    description: 'Comprehensive interior and exterior detailing with premium products.',
    price: 89.99,
    duration: '90 mins',
    image: 'https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'ceramic-coating',
    title: 'Ceramic Coating',
    description: 'Long-lasting protection with advanced ceramic coating technology.',
    price: 199.99,
    duration: '3 hours',
    image: 'https://images.pexels.com/photos/4027638/pexels-photo-4027638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'headlight-restoration',
    title: 'Headlight Restoration',
    description: 'Restore cloudy, yellowed headlights to like-new condition.',
    price: 59.99,
    duration: '45 mins',
    image: 'https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'interior-detailing',
    title: 'Interior Detailing',
    description: 'Deep cleaning and conditioning of all interior surfaces.',
    price: 79.99,
    duration: '90 mins',
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  }
];

// Generate available time slots
const generateTimeSlots = () => {
  const slots = [];
  const now = new Date();
  const startHour = 8; // 8 AM
  const endHour = 18; // 6 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      slots.push(time);
    }
  }
  
  return slots;
};

// Booking steps enum
enum BookingStep {
  Service = 1,
  DateTime = 2,
  Location = 3,
  VehicleInfo = 4,
  Payment = 5,
  Confirmation = 6
}

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const timeSlots = generateTimeSlots();
  
  // Get service ID from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const preselectedServiceId = queryParams.get('service');
  
  // State
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.Service);
  const [selectedService, setSelectedService] = useState<string | null>(preselectedServiceId);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('10:00');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [vehicleMake, setVehicleMake] = useState<string>('');
  const [vehicleModel, setVehicleModel] = useState<string>('');
  const [vehicleYear, setVehicleYear] = useState<string>('');
  const [vehicleColor, setVehicleColor] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('credit_card');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookingComplete, setBookingComplete] = useState<boolean>(false);
  const [bookingReference, setBookingReference] = useState<string>('');
  
  // Set preselected service on load
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedService(preselectedServiceId);
      setCurrentStep(BookingStep.DateTime);
    }
  }, [preselectedServiceId]);
  
  // Get selected service object
  const getServiceDetails = () => {
    return services.find(service => service.id === selectedService);
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return format(date, 'EEEE, MMMM d, yyyy');
  };
  
  // Generate next 7 days for date selection
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(new Date(), i));
    }
    return dates;
  };
  
  // Handle step navigation
  const goToNextStep = () => {
    if (currentStep < BookingStep.Confirmation) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > BookingStep.Service) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const reference = `BK${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setBookingReference(reference);
      setBookingComplete(true);
      setCurrentStep(BookingStep.Confirmation);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Render functions for each step
  const renderServiceSelection = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Service</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Card 
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedService === service.id ? 'ring-2 ring-blue-500 transform scale-[1.02]' : 'hover:shadow-lg'
              }`}
              hoverable
            >
              <div className="h-32 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                  <span className="text-lg font-bold text-blue-700">${service.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock size={14} className="mr-1" />
                  <span>{service.duration}</span>
                </div>
                
                {selectedService === service.id && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                    <Check size={16} />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button 
            variant="primary" 
            onClick={goToNextStep}
            disabled={!selectedService}
          >
            Continue
          </Button>
        </div>
      </div>
    );
  };
  
  const renderDateTimeSelection = () => {
    const dates = generateDates();
    
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Time</h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Select Date</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {dates.map((date, index) => (
              <div
                key={index}
                className={`cursor-pointer p-3 rounded-md border text-center transition-all duration-200 ${
                  isSameDay(date, selectedDate)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <p className="text-xs uppercase font-medium mb-1">
                  {format(date, 'EEE')}
                </p>
                <p className="text-lg font-bold">{format(date, 'd')}</p>
                <p className="text-xs">{format(date, 'MMM')}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Select Time</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {timeSlots.map((time, index) => (
              <div
                key={index}
                className={`cursor-pointer p-2 rounded-md border text-center transition-all duration-200 ${
                  time === selectedTime
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedTime(time)}
              >
                <p className="font-medium">{time}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-8">
          <div className="flex items-start">
            <Info size={20} className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Your Selected Appointment</h4>
              <p className="text-gray-700">
                <span className="font-medium">{getServiceDetails()?.title}</span> on {formatDate(selectedDate)} at {selectedTime}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={goToPreviousStep}>
            Back
          </Button>
          <Button variant="primary" onClick={goToNextStep}>
            Continue
          </Button>
        </div>
      </div>
    );
  };
  
  const renderLocationInfo = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Location</h2>
        
        <div className="space-y-4 mb-8">
          <Input
            label="Street Address"
            placeholder="Enter your street address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            leftIcon={<MapPin size={18} />}
            required
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            
            <Input
              label="Zip Code"
              placeholder="Enter zip code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Instructions
            </label>
            <textarea
              className="w-full rounded-md border border-gray-300 shadow-sm p-3 text-gray-900 placeholder-gray-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
              placeholder="Parking instructions, gate codes, or any special notes for our technician"
              rows={3}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
            />
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-8">
          <div className="flex items-start">
            <Info size={20} className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Service Address Information</h4>
              <p className="text-gray-700">
                Please provide the exact address where you want our technician to perform the service. 
                Include any relevant details such as parking instructions or access codes.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={goToPreviousStep}>
            Back
          </Button>
          <Button 
            variant="primary" 
            onClick={goToNextStep}
            disabled={!address || !city || !zipCode}
          >
            Continue
          </Button>
        </div>
      </div>
    );
  };
  
  const renderVehicleInfo = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Vehicle Information</h2>
        
        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Make"
              placeholder="e.g., Toyota, Honda, BMW"
              value={vehicleMake}
              onChange={(e) => setVehicleMake(e.target.value)}
              leftIcon={<Car size={18} />}
              required
            />
            
            <Input
              label="Model"
              placeholder="e.g., Camry, Civic, 3 Series"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Year"
              placeholder="e.g., 2020"
              value={vehicleYear}
              onChange={(e) => setVehicleYear(e.target.value)}
              required
            />
            
            <Input
              label="Color"
              placeholder="e.g., Black, Silver, White"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-8">
          <div className="flex items-start">
            <Info size={20} className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Why We Need This Information</h4>
              <p className="text-gray-700">
                Your vehicle details help our technicians prepare the right equipment and products 
                for your specific car. It also helps them identify your vehicle upon arrival.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={goToPreviousStep}>
            Back
          </Button>
          <Button 
            variant="primary" 
            onClick={goToNextStep}
            disabled={!vehicleMake || !vehicleModel || !vehicleYear || !vehicleColor}
          >
            Continue
          </Button>
        </div>
      </div>
    );
  };
  
  const renderPaymentInfo = () => {
    const serviceDetails = getServiceDetails();
    const subtotal = serviceDetails?.price || 0;
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + tax;
    
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment & Confirmation</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded overflow-hidden mr-4">
                    <img 
                      src={serviceDetails?.image} 
                      alt={serviceDetails?.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{serviceDetails?.title}</h4>
                    <p className="text-gray-500 text-sm">{serviceDetails?.duration}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 mt-2">
                  <span className="text-gray-800 font-semibold">Total</span>
                  <span className="text-blue-700 font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h4 className="font-medium text-gray-900">Appointment Details</h4>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start">
                  <Calendar size={18} className="text-gray-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="text-gray-900">{formatDate(selectedDate)} at {selectedTime}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin size={18} className="text-gray-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900">{address}</p>
                    <p className="text-gray-900">{city}, {zipCode}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Car size={18} className="text-gray-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Vehicle</p>
                    <p className="text-gray-900">{vehicleYear} {vehicleMake} {vehicleModel}, {vehicleColor}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
            
            <div className="space-y-3 mb-6">
              <div className="relative">
                <label className="flex items-center p-4 border rounded-lg bg-white cursor-pointer hover:border-blue-400 transition-colors">
                  <input
                    type="radio"
                    name="payment-method"
                    value="credit_card"
                    checked={paymentMethod === 'credit_card'}
                    onChange={() => setPaymentMethod('credit_card')}
                    className="h-5 w-5 text-blue-600"
                  />
                  <div className="ml-3">
                    <span className="font-medium text-gray-900">Credit Card</span>
                    <p className="text-sm text-gray-500">Pay securely with your credit card</p>
                  </div>
                  <CreditCard size={24} className="absolute right-4 text-gray-400" />
                </label>
              </div>
              
              <div className="relative">
                <label className="flex items-center p-4 border rounded-lg bg-white cursor-pointer hover:border-blue-400 transition-colors">
                  <input
                    type="radio"
                    name="payment-method"
                    value="pay_later"
                    checked={paymentMethod === 'pay_later'}
                    onChange={() => setPaymentMethod('pay_later')}
                    className="h-5 w-5 text-blue-600"
                  />
                  <div className="ml-3">
                    <span className="font-medium text-gray-900">Pay After Service</span>
                    <p className="text-sm text-gray-500">Pay in cash or card when service is complete</p>
                  </div>
                </label>
              </div>
            </div>
            
            {paymentMethod === 'credit_card' && (
              <div className="space-y-4 mb-6">
                <Input
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  leftIcon={<CreditCard size={18} />}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiration Date"
                    placeholder="MM/YY"
                  />
                  
                  <Input
                    label="CVV"
                    placeholder="123"
                  />
                </div>
                
                <Input
                  label="Cardholder Name"
                  placeholder="Name as it appears on card"
                />
              </div>
            )}
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-6">
              <div className="flex items-start">
                <Info size={20} className="text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-1">Demo Mode</h4>
                  <p className="text-gray-700">
                    This is a demo application. No actual payment will be processed, and no services will be scheduled.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={goToPreviousStep}>
            Back
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    );
  };
  
  const renderConfirmation = () => {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <Check size={32} className="text-green-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="text-xl text-gray-600 mb-6">Your appointment has been successfully scheduled.</p>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md mx-auto mb-8">
          <p className="text-gray-500 mb-2">Booking Reference</p>
          <p className="text-2xl font-bold text-blue-700 mb-6">{bookingReference}</p>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start">
              <Calendar size={18} className="text-gray-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="text-gray-900 font-medium">{formatDate(selectedDate)} at {selectedTime}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Car size={18} className="text-gray-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Service</p>
                <p className="text-gray-900 font-medium">{getServiceDetails()?.title}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin size={18} className="text-gray-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-900 font-medium">{address}</p>
                <p className="text-gray-900 font-medium">{city}, {zipCode}</p>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8">
          A confirmation email has been sent to your email address.<br />
          You can view your booking details in your dashboard.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
          
          <Button
            variant="primary"
            onClick={() => navigate('/dashboard/customer')}
          >
            View My Bookings
          </Button>
        </div>
      </div>
    );
  };
  
  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case BookingStep.Service:
        return renderServiceSelection();
      case BookingStep.DateTime:
        return renderDateTimeSelection();
      case BookingStep.Location:
        return renderLocationInfo();
      case BookingStep.VehicleInfo:
        return renderVehicleInfo();
      case BookingStep.Payment:
        return renderPaymentInfo();
      case BookingStep.Confirmation:
        return renderConfirmation();
      default:
        return renderServiceSelection();
    }
  };
  
  // Render booking progress
  const renderBookingProgress = () => {
    const steps = [
      { num: 1, label: 'Service' },
      { num: 2, label: 'Date & Time' },
      { num: 3, label: 'Location' },
      { num: 4, label: 'Vehicle' },
      { num: 5, label: 'Payment' }
    ];
    
    return (
      <div className="hidden md:block mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.num}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    step.num < currentStep
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : step.num === currentStep
                      ? 'border-blue-500 text-blue-500'
                      : 'border-gray-300 text-gray-300'
                  }`}
                >
                  {step.num < currentStep ? <Check size={16} /> : step.num}
                </div>
                <span
                  className={`text-xs mt-1 ${
                    step.num <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step.num < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {!bookingComplete && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Book Your Car Wash</h1>
              <p className="text-gray-600">Follow the steps below to schedule your service</p>
            </div>
            
            {renderBookingProgress()}
          </>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;