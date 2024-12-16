import React from 'react';
import { z } from 'zod';

const ButtonVariantSchema = z.enum(['green', 'red', 'yellow']);

type ButtonProps = {
  variant: z.infer<typeof ButtonVariantSchema>;
  text : string;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const MyButton: React.FC<ButtonProps> = ({ variant, text, onClick, ...props }) => {
  const baseStyles = `px-8 min-w-28 h-10 font-semibold rounded focus:outline-none transition duration-200 ease-in-out`;

  const variantStyles: Record<typeof ButtonVariantSchema['_def']['values'][number], string> = {
    green: 'bg-green-500 text-white hover:bg-green-600',
    red: 'bg-red-500 text-white hover:bg-red-600',
    yellow: 'bg-yellow-400 text-black hover:bg-yellow-500',
  };

  
  ButtonVariantSchema.parse(variant);

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]}`}
      onClick={onClick}
      {...props}
    >
      {text} 
    </button>
  );
};

export default MyButton;
