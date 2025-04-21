import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  className?: string;
  inputClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  fullWidth = true,
  className = '',
  inputClassName = '',
  leftIcon,
  rightIcon,
  ...props
}, ref) => {
  // Base width classes
  const widthClasses = fullWidth ? 'w-full' : '';

  // Container classes
  const containerClasses = `${widthClasses} ${className}`;

  // Input base classes
  const inputBaseClasses = 'rounded-md border shadow-sm focus:ring-2 focus:ring-offset-0 transition-colors px-3 py-2 text-gray-900 placeholder-gray-400 outline-none';
  
  // Input state classes
  const inputStateClasses = error 
    ? 'border-red-300 focus:border-red-300 focus:ring-red-200'
    : 'border-gray-300 focus:border-blue-300 focus:ring-blue-200';
  
  // Input icon classes
  const inputIconClasses = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '';
  
  // Combine input classes
  const inputClasses = `${inputBaseClasses} ${inputStateClasses} ${inputIconClasses} ${widthClasses} ${inputClassName}`;

  return (
    <div className={containerClasses}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
      
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

export default Input;