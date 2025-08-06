import React from 'react'

const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  return (
    <>
      <h2 className="h2-bold text-gray-700">{title}</h2>
      {subtitle && <p className="mt-4 text-gray-600">{subtitle}</p>}
    </>
  )
}

export default Header