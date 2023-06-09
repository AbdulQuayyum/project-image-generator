import React from 'react'
import { Link } from 'react-router-dom';
import { Logo } from '../Assets/Index';

const Header = () => {
    return (
        <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
            <Link to="/">
                <img src={Logo} alt="Logo" className="w-16 h-auto object-contain" />
            </Link>

            <Link to="/CreatePost" className="font-inter font-medium bg-[#666e75] text-white px-4 py-2 rounded-md">Create</Link>
        </header>
    )
}

export default Header