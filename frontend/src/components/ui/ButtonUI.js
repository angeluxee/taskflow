import React from 'react'

function ButtonUI({props, children}) {
    return (
        <button
            {...props}
            className="flex w-full justify-center rounded-md bg-eco2.1 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-eco2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            {children}
        </button>
    )
}

export default ButtonUI