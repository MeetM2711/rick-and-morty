import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Images/logo.png'; // Make sure this path is correct

const Header = () => {
    return (
        <header className="header fixed top-0 w-full z-20 flex justify-between items-center bg-[#ffffff14] backdrop-blur-[20px] text-[white] px-5 py-2.5">
            <Link to="/">
                <div className="logo flex items-center">
                    <a>
                        <img src={Logo} alt="The Rick and Morty" className=' h-14 w-full mr-2.5' />
                    </a>
                </div>
            </Link>
            <nav className="nav flex gap-5">
                <Link to="/"> <a href="" className='text-[white] no-underline text-lg transition-[color] duration-[0.3s] hover:text-[#93f373]'>
                    Home
                </a>
                </Link>
                <Link to="/location"> <a href="" className='text-[white] no-underline text-lg transition-[color] duration-[0.3s] hover:text-[#93f373]'>
                    Location
                </a>
                </Link>
                <Link to="/episodes"> <a href="" className='text-[white] no-underline text-lg transition-[color] duration-[0.3s] hover:text-[#93f373]'>
                    Episodes
                </a>
                </Link>
                <Link to="/contactus"> <a href="" className='text-[white] no-underline text-lg transition-[color] duration-[0.3s] hover:text-[#93f373]'>
                    Contact us
                </a>
                </Link>
                <Link to="/aboutus"> <a href="" className='text-[white] no-underline text-lg transition-[color] duration-[0.3s] hover:text-[#93f373]'>
                    About us
                </a>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
