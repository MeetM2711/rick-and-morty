import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Images/blog.webp'; // Make sure this path is correct

const Header = () => {
    return (
        <header className="header fixed top-0 w-full z-20 flex justify-between items-center bg-[black] text-[white] px-5 py-2.5">
            <Link to="/">
                <div className="logo flex items-center">
                    <a>
                        <img src={Logo} alt="The Rick and Morty" className=' h-10 mr-2.5' />
                    </a>
                    <h1 className='text-2xl text-[#ff4500]'>The Rick and Morty</h1>
                </div>
            </Link>
            <nav className="nav flex gap-5">
                <Link to="/"> <a href="" className='text-[white] no-underline text-lg transition-[color] duration-[0.3s] hover:text-[#ff4500]'>
                    Home
                </a>
                </Link>
                <Link to="/location"> <a href="" className='text-[white] no-underline text-lg transition-[color] duration-[0.3s] hover:text-[#ff4500]'>
                    Location
                </a>
                </Link>
                <Link to="/episodes"> <a href="" className='text-[white] no-underline text-lg transition-[color] duration-[0.3s] hover:text-[#ff4500]'>
                    Episodes
                </a>
                </Link>
                <Link to="/contactus"> <a href="" className='text-[white] no-underline text-lg transition-[color] duration-[0.3s] hover:text-[#ff4500]'>
                    Contact us
                </a>
                </Link>
                <Link to="/aboutus"> <a href="" className='text-[white] no-underline text-lg transition-[color] duration-[0.3s] hover:text-[#ff4500]'>
                    About us
                </a>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
