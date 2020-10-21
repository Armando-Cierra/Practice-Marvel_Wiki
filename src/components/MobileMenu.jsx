import React, {useState} from 'react';
import {NavLink, Link} from 'react-router-dom';

export default function MobileMenu(){

    const [menu, setMenu] = useState(false);

    function toggle(e){
        !menu ? setMenu(true) : setMenu(false);
    }

    return(
        <>
            <div className="mobileBar">
                <div className={`toggleBtn ${menu ? 'active' : ''}`} onClick={toggle}>
                    <div></div>
                </div>
                <Link to="/"><img src="../img/logo.png" alt=""/></Link>
            </div>
            <div className={`backgroundMenu ${menu ? 'active' : ''}`} onClick={toggle}></div>
            <nav className={`mobileMenu ${menu ? 'active' : ''}`}>
                <NavLink to="/" exact onClick={toggle}>Home</NavLink>
                <NavLink to="/characters/1" onClick={toggle}>Characters</NavLink>
                <NavLink to="/comics/1" onClick={toggle}>Comics</NavLink>
                <NavLink to="/stories/1" onClick={toggle}>Stories</NavLink>
                <span>Copyright 2020 © marvel-wiki.com</span>
            </nav>
        </>
    )
}