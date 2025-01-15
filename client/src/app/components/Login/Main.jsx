import React, { useState } from 'react'
import { SignUp } from './SignUp'
import { SignIn } from './SignIn'

export const Main = () => {
    const[Mode,SetMode] = useState(true)
  return (
    Mode?<SignIn setMode={SetMode}/>:<SignUp setMode={SetMode}/>
  )
}
