import React from 'react'

let year = new Date().getFullYear()

export default function Footer() {
  return (
    <div className="bg-primary">
      <div className="container">
        <div className="row">
          <div className="col ">
            <p className='mb-0 text-white text-center' >&copy; {year} All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
