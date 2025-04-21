import React from 'react';
import { Car, Droplet, Wrench, Sparkles, DollarSign, Clock } from 'lucide-react';
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
  },
  {
    id: 'ceramic-coating',
    title: 'Ceramic Coating',
    description: 'Long-lasting protection with advanced ceramic coating technology.',
    price: 199.99,
    duration: '3 hours',
    image: 'https://images.pexels.com/photos/4027638/pexels-photo-4027638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: [
      { text: 'Professional paint correction' },
      { text: 'Premium ceramic coating application' },
      { text: 'Up to 12 months of protection' },
      { text: 'Enhanced gloss and shine' },
      { text: 'Hydrophobic surface treatment' }
    ]
  },
  {
    id: 'headlight-restoration',
    title: 'Headlight Restoration',
    description: 'Restore cloudy, yellowed headlights to like-new condition.',
    price: 59.99,
    duration: '45 mins',
    image: 'https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: [
      { text: 'Headlight cleaning and sanding' },
      { text: 'UV protection coating' },
      { text: 'Improved visibility and safety' },
      { text: 'Both headlights included' }
    ]
  },
  {
    id: 'interior-detailing',
    title: 'Interior Detailing',
    description: 'Deep cleaning and conditioning of all interior surfaces.',
    price: 79.99,
    duration: '90 mins',
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: [
      { text: 'Complete vacuum including trunk' },
      { text: 'Upholstery shampooing' },
      { text: 'Leather conditioning' },
      { text: 'Dashboard and console cleaning' },
      { text: 'All interior surfaces sanitized' }
    ]
  }
];

const ServiceBenefits = () => {
  const benefits = [
    {
      icon: <Clock className="h-8 w-8 text-blue-700" />,
      title: 'Time-Saving',
      description: 'No more waiting in long lines at car washes. We work around your schedule.'
    },
    {
      icon: <Droplet className="h-8 w-8 text-blue-700" />,
      title: 'Eco-Friendly',
      description: 'Our techniques and products are designed to minimize environmental impact.'
    },
    {
      icon: <Sparkles className="h-8 w-8 text-blue-700" />,
      title: 'Premium Quality',
      description: 'Expert techniques and professional-grade products for superior results.'
    },
    {
      icon: <DollarSign className="h-8 w-8 text-blue-700" />,
      title: 'Great Value',
      description: 'Competitive pricing with exceptional service and attention to detail.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {benefits.map((benefit, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            {benefit.icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
          <p className="text-gray-600">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
};

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      {/* Header Section */}
      <section className="py-10 bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-blue-100">
              Discover our range of professional car washing and detailing services,
              all delivered with exceptional quality and convenience.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Benefits */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              When you choose SplashWash, you're not just getting a clean car. You're investing in a premium experience with multiple benefits.
            </p>
          </div>
          
          <ServiceBenefits />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about our services? Find answers to our most commonly asked questions below.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">How does the mobile car wash work?</h3>
                <p className="text-gray-600">
                  Our technicians come to your location with all necessary equipment and water. We just need access to your vehicle and enough space to work safely around it.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">How long does each service take?</h3>
                <p className="text-gray-600">
                  Service times vary depending on the package and vehicle size. Basic Wash takes about 30 minutes, while Premium Detailing can take 90 minutes or more.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">What happens if it rains after my wash?</h3>
                <p className="text-gray-600">
                  If it rains within 24 hours of your wash, we offer a complimentary rinse and dry. Just contact customer service to schedule it.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Are your products safe for my car's paint?</h3>
                <p className="text-gray-600">
                  Absolutely! We use only high-quality, pH-balanced products that are safe for all vehicle surfaces. Our products are specifically designed for automotive use.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Do I need to be present during the service?</h3>
                <p className="text-gray-600">
                  Not necessarily. As long as our technicians have access to your vehicle, you can go about your day. We'll notify you when the service is complete.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Services CTA */}
      <section className="py-12 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Car size={48} className="mx-auto mb-6 text-blue-300" />
            <h2 className="text-3xl font-bold mb-4">Need a Custom Service?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Don't see exactly what you need? We offer custom packages tailored to your specific requirements.
            </p>
            <div className="flex justify-center">
              <a href="tel:+15551234567" className="bg-white text-blue-700 hover:bg-blue-50 transition-colors px-6 py-3 rounded-md font-semibold text-lg">
                Call Us at (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;