import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Star, CheckCircle, Calendar, Users, Shield } from 'lucide-react';
import Button from '../components/ui/Button';
import ServiceCard from '../components/ServiceCard';

const services = [
  {
    id: 'basic-wash',
    title: 'Basic Wash',
    description: 'Quick exterior wash with hand drying and wheel cleaning.',
    price: 29.99,
    duration: '30 mins',
    image: 'https://images.pexels.com/photos/372810/pexels-photo-372810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: [
      { text: 'Hand wash exterior' },
      { text: 'Wheel cleaning' },
      { text: 'Hand drying' },
      { text: 'Windows cleaning' }
    ]
  },
  {
    id: 'deluxe-wash',
    title: 'Deluxe Wash',
    description: 'Complete exterior wash plus interior vacuum and dashboard cleaning.',
    price: 49.99,
    duration: '45 mins',
    image: 'https://images.pexels.com/photos/6873089/pexels-photo-6873089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: [
      { text: 'Everything in Basic Wash' },
      { text: 'Interior vacuum' },
      { text: 'Dashboard cleaning' },
      { text: 'Door jambs wiping' },
      { text: 'Tire dressing' }
    ],
    popular: true
  },
  {
    id: 'premium-detailing',
    title: 'Premium Detailing',
    description: 'Comprehensive interior and exterior detailing with premium products.',
    price: 89.99,
    duration: '90 mins',
    image: 'https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: [
      { text: 'Everything in Deluxe Wash' },
      { text: 'Clay bar treatment' },
      { text: 'Wax application' },
      { text: 'Leather conditioning' },
      { text: 'Complete interior detailing' }
    ]
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Michael Johnson',
    role: 'Regular Customer',
    comment: 'SplashWash has transformed how I maintain my car. Their mobile service is so convenient, and the quality is outstanding every time.',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'Business Owner',
    comment: 'I use SplashWash for my entire company fleet. Their scheduling system is efficient, and the technicians are professional and thorough.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5
  },
  {
    id: 3,
    name: 'James Rodriguez',
    role: 'Car Enthusiast',
    comment: 'As someone who loves cars, I\'m particular about who touches my vehicles. SplashWash technicians are knowledgeable and detail-oriented.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4
  }
];

const features = [
  {
    icon: <Calendar className="h-8 w-8 text-blue-700" />,
    title: 'Convenient Booking',
    description: 'Schedule car washes at your preferred time with our easy online booking system.'
  },
  {
    icon: <Car className="h-8 w-8 text-blue-700" />,
    title: 'Mobile Service',
    description: 'We come to your location - home, office, or anywhere else convenient for you.'
  },
  {
    icon: <Users className="h-8 w-8 text-blue-700" />,
    title: 'Professional Technicians',
    description: 'Experienced and vetted car wash specialists who take pride in their work.'
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-700" />,
    title: 'Satisfaction Guaranteed',
    description: 'Not happy with the service? We\'ll re-clean your car at no additional cost.'
  }
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
            filter: 'brightness(0.4)'
          }}
        ></div>
        
        <div className="container mx-auto px-4 z-10 pt-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Premium Car Wash & Detailing Services
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Professional cleaning services that come to you. Experience the convenience of mobile car washing with exceptional quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/booking">
                <Button size="lg" variant="primary">
                  Book a Wash Now
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our range of professional car washing and detailing services, 
              all designed to keep your vehicle looking its best.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="secondary">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting your car washed has never been easier. Our simple process ensures 
              a seamless experience from booking to completion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-blue-700" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Book Online</h3>
              <p className="text-gray-600">
                Schedule a service from our website or mobile app. Choose your package, date, and time.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Car className="h-8 w-8 text-blue-700" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">We Come To You</h3>
              <p className="text-gray-600">
                Our professional technician arrives at your location with all equipment needed.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-700" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enjoy Your Clean Car</h3>
              <p className="text-gray-600">
                We\'ll clean your car to perfection while you go about your day. No waiting in lines!
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/booking">
              <Button variant="primary">Get Started Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SplashWash</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              We\'re committed to providing exceptional car washing services with convenience and quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-blue-800 p-6 rounded-lg hover:bg-blue-700 transition-colors">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don\'t just take our word for it. Here\'s what our satisfied customers have to say about 
              our services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      className={i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for a Professional Car Wash?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your appointment today and experience the SplashWash difference. 
            Your car deserves it!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/booking">
              <Button size="lg" variant="primary" className="bg-white text-blue-700 hover:bg-gray-100">
                Book a Wash Now
              </Button>
            </Link>
            <Link to="/apply">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
                Join Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;