import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
  return (
    <div className='relative mt-24'>
      {/* Background Image */}
      <img src={assets.bottom_banner_image} alt="banner" className='w-full hidden md:block z-0' />
      <img src={assets.bottom_banner_image_sm} alt="banner" className='w-full md:hidden z-0' />

      {/* Features Overlay */}
      <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24 z-10'>
        <div>
          <h1 className='text-2xl md:text-3xl font-semibold text-primary mb-4'>
            Why We Are The Best?
          </h1>
{features.map((feature, index) => {
  return (
    <div key={index} className='flex items-center gap-3 mt-4'>
      <img src={feature.icon} alt={feature.title} className='md:w-11 w-10 z-0' />
      <div>
        <h3 className='text-xl md:text-lg font-semibold'>{feature.title}</h3>
        <p className='text-gray-500/70 text-base md:text-sm'>{feature.description}</p>
      </div>
    </div>
  )
})}




        </div>
      </div>
    </div>
  )
}

export default BottomBanner
