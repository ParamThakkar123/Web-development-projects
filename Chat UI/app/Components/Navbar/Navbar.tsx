import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-5 text-lg tracking-wide'>
        <div>
            Logo
        </div>
        <div>
            <ul className='flex items-center justify-center'>
                <li className='mr-8'>
                    <Link href='/'>Home</Link>
                </li>
                <li className='mr-8'>
                    <Link href='/about'>About</Link>
                </li>
                <li className='mr-8'>
                    <Link href='/blog'>Blog</Link>
                </li>
            </ul>
        </div>
        <div className='flex items-center gap-5'>
            <Button variant="outline" className='rounded'>Log In</Button>
            <Button variant="outline" className='rounded'>Sign up</Button>
        </div>
    </div>
  )
}

export default Navbar
