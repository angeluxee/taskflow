import React from 'react'

function LinkUI({ href, children, ...props }) {
    return (
        <a
            href={href}
            {...props}
            className="relative inline-block transition-all duration-200 hover:text-eco2 hover:font-semibold 
                       before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-eco2 
                       before:scale-x-0 before:origin-left before:transition-transform before:duration-300 
                       hover:before:scale-x-100"
        >
            {children}
        </a>
    );
}

export default LinkUI;
