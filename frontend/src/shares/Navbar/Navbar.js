import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.scss'

export default function Navbar() {
  return (
    <nav className="Navbar navbar is-transparent">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            alt="Brand"
            width="112"
            height="28"
          />
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/files">Files</Link>
          <Link className="navbar-item" to="/programs">Program</Link>
        </div>
      </div>
    </nav>
  )
}
