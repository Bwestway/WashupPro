import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Check } from 'lucide-react';
import Card, { CardContent, CardFooter } from './ui/Card';
import Button from './ui/Button';

interface ServiceFeature {
  text: string;
}

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  features: ServiceFeature[];
  popular?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  price,
  duration,
  image,
  features,
  popular = false,
}) => {
  return (
    <Card 
      className={`h-full flex flex-col ${popular ? 'border-2 border-blue-500' : ''}`}
      hoverable
    >
      {popular && (
        <div className="bg-blue-500 text-white text-sm font-medium py-1 px-4 text-center">
          Most Popular
        </div>
      )}
      
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full py-2 px-4">
          <p className="text-white font-medium flex items-center">
            <Clock size={16} className="mr-1" />
            {duration}
          </p>
        </div>
      </div>
      
      <CardContent className="flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-700 text-sm">{feature.text}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-3 sm:mb-0">
          <span className="text-2xl font-bold text-gray-900">${price}</span>
        </div>
        <Link to={`/booking?service=${id}`}>
          <Button variant="primary">Book Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;