import React from 'react'

function LabelUI({props, children}) {
  return (
    <label 
        className="block text-sm font-medium leading-6 text-gray-900"
        {...props}
        >
        {children}
    </label>
  )
}

export default LabelUI