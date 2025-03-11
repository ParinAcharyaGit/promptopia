'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  // const isUserLoggedIn = true // for testing purposes
  const  { data: session } = useSession()

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false) // dropdown menu for the profile button

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    fetchProviders()
  }, [])

  return (
    <nav className='flex-between flex-full mb-16 w-full pt-3'>
      <div className='flex items-center gap-2'>
        <Link href='/' className='flex gap-2 flex-center'>
          <Image src='/assets/images/logo.svg' width={40} height={40} alt='logo' className='object-contain' />
        </Link>
        <p className='logo_text'>Promptopia</p>
      </div>

      {/* {alert(session?.user)}

      {alert(providers)} */}

      {session?.user ? (
        <div className='sm:flex hidden justify-end flex-grow'>
          <div className='flex gap-3 md:gap-5'>
            <Link href='create/post' className='black-btn'>Create post</Link>
            <button type='button' onClick={signOut} className='outline_btn'>Sign out</button>
            <Link href='/profile'>
              <Image className='rounded-full' width={40} height={40} src={session?.user.image} alt = 'profile' />
            </Link>
          </div>
        </div>
      ) : (
        <>
          {providers && 
            Object.values(providers).map(provider => (
              <button type='button' key={provider.name} onClick={() => signIn(provider.id)}
              className='black_btn'>
                Sign in 
              </button>
            ))}
        </>
      )}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image className='rounded-full' width={40} height={40} src={session?.user.image} alt='profile' onClick={() => {
              console.log("Dropdown toggled:", !toggleDropdown); // Debugging line
              setToggleDropdown((prev) => !prev);
            }} />
            {toggleDropdown && (
              <div className='dropdown' style={{ zIndex: 10, backgroundColor: 'white' }}> {/* Added background color for visibility */}
                <Link href='/profile' className='dropdown_link' onClick={() => setToggleDropdown(false)}>Go to profile</Link>
                <Link href='/create-prompt' className='dropdown_link' onClick={() => setToggleDropdown(false)}>Create prompt</Link>
                <button type = 'button' onClick = {() => {
                  setToggleDropdown(false)
                  signOut()
                }} className='mt-5 w-full black_btn'>
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && 
              Object.values(providers).map(provider => (
                <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                  Sign in 
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav
