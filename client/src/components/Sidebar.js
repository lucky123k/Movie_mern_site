import React, { useState } from 'react';
import './index.css';
import { Link} from 'react-router-dom';

const Sidebar = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            <main className={show ? 'space-toggle' : null}>
                <div> 
                    <header className={`header ${show ? 'space-toggle' : null}`}>
                        <div className='header-toggle' onClick={() => setShow(!show)}>
                            <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
                        </div>
                        <div className='nav_links'>
                            <Link className='logo_text' to="/">Moviefy</Link>
                            <div>
                            <Link className='Signin' to="/login">Log in</Link>
                            <Link className='Signin' to="/register">Create Account</Link>
                            </div>
                        </div>
                    </header> 
                </div> 

                <aside className={`sidebar ${show ? 'show' : null}`}> 
                    <nav className='nav'>
                        <div>
                            <Link to='/' className='nav-logo'>
                                <i className={`fas fa-home-alt nav-logo-icon`}></i>
                                <span className='nav-logo-name'>Homepage</span>
                            </Link>

                            <div className='nav-list'>
                                <Link to='/trending' className='nav-link '>
                                    <i class="fa-solid fa-arrow-trend-up nav-link-icon"></i>
                                    <span className='nav-link-name'>Trending</span>
                                </Link>
                                <Link to='/movies' className='nav-link'>   
                                    <i class="fa-regular fa-film nav-link-icon"></i>
                                    <span className='nav-link-name'>Movies</span>
                                </Link>
                                <Link to='/series' className='nav-link'>
                                    <i class="fa-solid fa-tv nav-link-icon"></i>
                                    <span className='nav-link-name'>Tv/Series</span>
                                </Link>
                                <Link to='/search' className='nav-link'>
                                    <i class="fa-solid fa-magnifying-glass nav-link-icon"></i>
                                    <span className='nav-link-name'>Search</span>
                                </Link>
                            </div>
                        </div>

                        <Link to='/logout' className='nav-link'>
                            <i className='fas fa-sign-out nav-link-icon'></i>
                            <span className='nav-link-name'>Logout</span>
                        </Link>
                    </nav>
                </aside>
                {/* <Container /> */}
            </main>
            {/* <Container /> */}
           
        </>

    );
};

export default Sidebar;
