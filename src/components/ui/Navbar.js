import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <div className="nav__container">
            <Link className="nav__link ml-5" to="/movies"> Movies </Link>
            <FontAwesomeIcon className="nav__brand ml-5" icon={faFilm} />
            <Link className="nav__link ml-5" to="/clasification"> Classification </Link>
        </div>
    )
}
