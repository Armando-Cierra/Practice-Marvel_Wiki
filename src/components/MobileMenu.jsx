import React, {useState} from 'react';
import {NavLink, Link} from 'react-router-dom';

export default function MobileMenu(){

    const [menu, setMenu] = useState(false);

    function toggle(e){
        !menu ? setMenu(true) : setMenu(false);
    }

    function eraseCharacterInfo(){
        localStorage.removeItem('charactersFilters');
    }

    function eraseComicsInfo() {
        localStorage.removeItem('comicsFilters');
    }

    function eraseStoriesInfo() {
        localStorage.removeItem('storiesFilters');
    }

    const year = new Date().getFullYear();

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
                <NavLink to="/characters/1" onClick={toggle} onClick={eraseCharacterInfo}>Characters</NavLink>
                <NavLink to="/comics/1" onClick={toggle} onClick={eraseComicsInfo}>Comics</NavLink>
                <NavLink to="/stories/1" onClick={toggle} onClick={eraseStoriesInfo}>Stories</NavLink>
                <span>Copyright {year} © marvel-wiki.com</span>
            </nav>
        </>
    )
}