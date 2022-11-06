import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='logo'> Lama Chat</span>
      <div className='user'>
        <img alt='avatar' src='https://www.absoluteanime.com/avatar_the_last_airbender/aang[2].jpg' />
        <span className="name">Cornel</span>
        <button>logout</button>
      </div>
    </div>
  )
}

export default Navbar