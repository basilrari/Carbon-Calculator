import React from 'react';
import { z } from 'zod';

const ButtonVariantSchema = z.enum(['green', 'red', 'yellow']);

type ButtonProps = {
  variant: z.infer<typeof ButtonVariantSchema>;
  text : string;
  
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const MyButton: React.FC<ButtonProps> = ({ variant, text, ...props }) => {
  const baseStyles = `px-12 min-w-28 h-8 text-sm font-semibold rounded focus:outline-none transition duration-200 ease-in-out`;

  const variantStyles: Record<typeof ButtonVariantSchema['_def']['values'][number], string> = {
    green: 'bg-[#2F4F4F] text-white hover:bg-green-600',
    red: 'bg-[#E04848] text-white hover:bg-red-600',
    yellow: 'bg-[#FFE2AD] text-black hover:bg-yellow-500',
  };

  
  ButtonVariantSchema.parse(variant);

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]}`}
      {...props}
    >
      {text} 
    </button>
  );
};

export default MyButton;
