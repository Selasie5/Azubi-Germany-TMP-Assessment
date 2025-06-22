import Link from 'next/link';
import React from 'react'

interface ButtonProps {
  bgColor?:string;
  textColor?:string;
  label?:string;
  href?:string;
  onClick?:()=> void
}
const Button:React.FC<ButtonProps> = (
  {bgColor, textColor,label, href, onClick}
) => {
  return (
   <button className={`${bgColor} ${textColor} px-4 py-3 font-medium text-sm`} onClick={onClick}>
      {href ? (
        <Link href={href}>
          {label}
        </Link>
      ) : (
        label
      )}
   </button>
  )
}

export default Button
