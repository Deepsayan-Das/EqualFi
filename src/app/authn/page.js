'use client'
import LoginSignupPage from '@/components/Auth'
import { CursorFollower } from '@/components/ui/CustomCursor'
import { CustomScrollbar } from '@/components/ui/CustomScrollbar'
import { useLenis } from '@/hooks/useLenis';
import React from 'react'


function Page() {
  useLenis();
  return (

    <>
     <CustomScrollbar />
          <CursorFollower />
          <LoginSignupPage/>
    </>
    
  )
}

export default Page