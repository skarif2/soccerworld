import React, { Component } from 'react'
import AccountsUI from '../accounts/AccountsUI.jsx'

export const MainLayout = ({content}) => (
  <div className='main-layout'>
    <header>
      <h2>Soccer World</h2>
      <nav>
        <a href="/">Players</a>
        <a href='/about'>About</a>
        <AccountsUI />
      </nav>
    </header>
    <main>
      {content}
    </main>
  </div>
)
