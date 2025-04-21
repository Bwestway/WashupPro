import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, CheckSquare, FileText, Upload, CreditCard, Shield } from 'lucide-react';
import Card, { CardContent, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const TechnicianApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [experience, setExperience] = useState('');
  const [availability, setAvailability] = useState<string[]>([]);
  const [hasVehicle, setHasVehicle] = useState<boolean | null>(null);
  const [hasEquipment, setHasEquipment] = useState<boolean | null>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationComplete, setApplicationComplete] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  
  // Validation state
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    experience: '',
    availability: '',
    hasVehicle: '',
    hasEquipment: '',
  });
  
  // Handle availability toggle
  const toggleAvailability = (day: string) => {
    if (availability.includes(day)) {
      setAvailability(availability.filter(d => d !== day));
    } else {
      setAvailability([...availability, day]);
    }
  };
  
  // Validate step 1
  const validateStep1 = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      experience: '',
      availability: '',
      hasVehicle: '',
      hasEquipment: '',
    };
    let isValid = true;
    
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }
    
    if (!address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }
    
    if (!city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }
    
    if (!zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Validate step 2
  const validateStep2 = () => {
    const newErrors = { ...errors };
    let isValid = true;
    
    if (!experience.trim()) {
      newErrors.experience = 'Please describe your experience';
      isValid = false;
    }
    
    if (availability.length === 0) {
      newErrors.availability = 'Please select at least one day of availability';
      isValid = false;
    }
    
    if (hasVehicle === null) {
      newErrors.hasVehicle = 'Please indicate if you have a vehicle';
      isValid = false;
    }
    
    if (hasEquipment === null) {
      newErrors.hasEquipment = 'Please indicate if you have equipment';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo(0, 0);
      return;
    }
    
    if (step === 2 && validateStep2()) {
      setIsSubmitting(true);
      
      try {
        // In a real app, you would make an API call here
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate a fake application ID
        const appId = `TA${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
        setApplicationId(appId);
        setApplicationComplete(true);
      } catch (error) {
        console.error('Application submission failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  // Days of the week for availability selection
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  
  // Render step 1 form
  const renderPersonalInfo = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={errors.firstName}
              leftIcon={<User size={18} />}
              required
            />
            
            <Input
              label="Last Name"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={errors.lastName}
              required
            />
          </div>
          
          <Input
            label="Email Address"
            type="email"
            placeholder="john.doe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            leftIcon={<Mail size={18} />}
            required
          />
          
          <Input
            label="Phone Number"
            placeholder="(123) 456-7890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={errors.phone}
            leftIcon={<Phone size={18} />}
            required
          />
          
          <Input
            label="Street Address"
            placeholder="123 Main St"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={errors.address}
            required
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City"
              placeholder="San Francisco"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              error={errors.city}
              required
            />
            
            <Input
              label="Zip Code"
              placeholder="94105"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              error={errors.zipCode}
              required
            />
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button
            type="submit"
            variant="primary"
          >
            Next Step
          </Button>
        </div>
      </form>
    );
  };
  
  // Render step 2 form
  const renderProfessionalInfo = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Describe your car washing/detailing experience
            </label>
            <textarea
              className={`w-full rounded-md border ${errors.experience ? 'border-red-300' : 'border-gray-300'} shadow-sm p-3 text-gray-900 placeholder-gray-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-200`}
              placeholder="Tell us about your experience, skills, and any certifications you have"
              rows={5}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
            {errors.experience && (
              <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability (select all that apply)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  onClick={() => toggleAvailability(day)}
                  className={`cursor-pointer p-3 rounded-md border ${
                    availability.includes(day)
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'border-gray-200 hover:border-blue-200'
                  } transition-colors`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-sm border mr-2 flex-shrink-0 ${
                      availability.includes(day)
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-400'
                    }`}>
                      {availability.includes(day) && (
                        <CheckSquare size={16} className="text-white" />
                      )}
                    </div>
                    <span>{day}</span>
                  </div>
                </div>
              ))}
            </div>
            {errors.availability && (
              <p className="mt-1 text-sm text-red-600">{errors.availability}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Do you have your own vehicle?
            </label>
            <div className="flex space-x-4">
              <div
                onClick={() => setHasVehicle(true)}
                className={`cursor-pointer p-3 rounded-md border flex-1 ${
                  hasVehicle === true
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'border-gray-200 hover:border-blue-200'
                } transition-colors`}
              >
                <div className="flex items-center justify-center">
                  <div className={`w-4 h-4 rounded-full border mr-2 ${
                    hasVehicle === true
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-400'
                  }`}>
                    {hasVehicle === true && (
                      <div className="w-2 h-2 rounded-full bg-white mx-auto" />
                    )}
                  </div>
                  <span>Yes</span>
                </div>
              </div>
              
              <div
                onClick={() => setHasVehicle(false)}
                className={`cursor-pointer p-3 rounded-md border flex-1 ${
                  hasVehicle === false
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'border-gray-200 hover:border-blue-200'
                } transition-colors`}
              >
                <div className="flex items-center justify-center">
                  <div className={`w-4 h-4 rounded-full border mr-2 ${
                    hasVehicle === false
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-400'
                  }`}>
                    {hasVehicle === false && (
                      <div className="w-2 h-2 rounded-full bg-white mx-auto" />
                    )}
                  </div>
                  <span>No</span>
                </div>
              </div>
            </div>
            {errors.hasVehicle && (
              <p className="mt-1 text-sm text-red-600">{errors.hasVehicle}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Do you have your own car washing equipment?
            </label>
            <div className="flex space-x-4">
              <div
                onClick={() => setHasEquipment(true)}
                className={`cursor-pointer p-3 rounded-md border flex-1 ${
                  hasEquipment === true
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'border-gray-200 hover:border-blue-200'
                } transition-colors`}
              >
                <div className="flex items-center justify-center">
                  <div className={`w-4 h-4 rounded-full border mr-2 ${
                    hasEquipment === true
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-400'
                  }`}>
                    {hasEquipment === true && (
                      <div className="w-2 h-2 rounded-full bg-white mx-auto" />
                    )}
                  </div>
                  <span>Yes</span>
                </div>
              </div>
              
              <div
                onClick={() => setHasEquipment(false)}
                className={`cursor-pointer p-3 rounded-md border flex-1 ${
                  hasEquipment === false
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'border-gray-200 hover:border-blue-200'
                } transition-colors`}
              >
                <div className="flex items-center justify-center">
                  <div className={`w-4 h-4 rounded-full border mr-2 ${
                    hasEquipment === false
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-400'
                  }`}>
                    {hasEquipment === false && (
                      <div className="w-2 h-2 rounded-full bg-white mx-auto" />
                    )}
                  </div>
                  <span>No</span>
                </div>
              </div>
            </div>
            {errors.hasEquipment && (
              <p className="mt-1 text-sm text-red-600">{errors.hasEquipment}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Documents (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload size={24} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600 mb-2">Driver's license, certifications, or portfolio</p>
              <Button variant="outline" size="sm">
                Choose Files
              </Button>
              <p className="mt-2 text-sm text-gray-500">PDF, JPG, or PNG files up to 5MB each</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(1)}
          >
            Back
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
          >
            Submit Application
          </Button>
        </div>
      </form>
    );
  };
  
  // Render application confirmation
  const renderConfirmation = () => {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <CheckSquare size={32} className="text-green-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
        <p className="text-xl text-gray-600 mb-6">Thank you for applying to join our team.</p>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md mx-auto mb-8">
          <p className="text-gray-500 mb-2">Application Reference</p>
          <p className="text-2xl font-bold text-blue-700 mb-6">{applicationId}</p>
          
          <div className="text-left space-y-2">
            <p className="text-gray-700"><span className="font-medium">Name:</span> {firstName} {lastName}</p>
            <p className="text-gray-700"><span className="font-medium">Email:</span> {email}</p>
            <p className="text-gray-700"><span className="font-medium">Phone:</span> {phone}</p>
          </div>
        </div>
        
        <div className="space-y-4 max-w-lg mx-auto mb-8">
          <div className="flex items-start">
            <FileText size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
            <p className="text-gray-700 text-left">
              Our team will review your application and reach out to you within 2-3 business days.
            </p>
          </div>
          
          <div className="flex items-start">
            <Mail size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
            <p className="text-gray-700 text-left">
              A confirmation email has been sent to <span className="font-medium">{email}</span> with your application details.
            </p>
          </div>
          
          <div className="flex items-start">
            <CreditCard size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
            <p className="text-gray-700 text-left">
              If selected, you'll receive information about our onboarding process, payment setup, and training schedule.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {!applicationComplete && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Join Our Team</h1>
            <p className="text-gray-600">Apply to become a SplashWash technician</p>
          </div>
        )}
        
        <div className="max-w-3xl mx-auto">
          {!applicationComplete && (
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4">
                <div className={`flex items-center justify-center ${step === 1 ? 'text-white bg-blue-600' : 'text-blue-600 bg-blue-100'} rounded-full w-8 h-8 font-bold`}>
                  1
                </div>
                <div className={`flex-1 h-1 ${step === 1 ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                <div className={`flex items-center justify-center ${step === 2 ? 'text-white bg-blue-600' : 'text-blue-600 bg-blue-100'} rounded-full w-8 h-8 font-bold`}>
                  2
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm font-medium text-gray-700">Personal Info</span>
                <span className="text-sm font-medium text-gray-700">Professional Info</span>
              </div>
            </div>
          )}
          
          <Card>
            <CardContent>
              {applicationComplete ? renderConfirmation() : (
                <>
                  {step === 1 ? renderPersonalInfo() : renderProfessionalInfo()}
                </>
              )}
            </CardContent>
            
            {!applicationComplete && (
              <CardFooter className="bg-blue-50 flex items-start border-t border-blue-100">
                <Shield size={24} className="text-blue-700 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-800 mb-1">Join our Professional Network</h4>
                  <p className="text-gray-700 text-sm">
                    As a SplashWash technician, you'll enjoy flexible hours, competitive pay (up to 80% commission), 
                    and the opportunity to build your own client base. We provide training, support, and all the 
                    tools you need to succeed.
                  </p>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TechnicianApplicationPage;