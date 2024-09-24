'use client'

import React from 'react';
import LogoImg from '../../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';

function Logo() {
  return (
    <>
      <Link href="/">
        <Image src={LogoImg} alt='Logo' />
      </Link>
    </>
  )
}

export default Logo