'use client'

import React from 'react'
import Logo from '../Logo/Logo'
import HeaderInfo from './HeaderInfo'

function Header() {
  return (
    <div className='flex items-center justify-between px-16 py-5 border-b-primary-5 border border-solid'>
      <Logo />
      <HeaderInfo />
    </div>
  )
}

export default Header