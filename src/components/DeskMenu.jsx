import React from 'react';
import {Link, NavLink} from 'react-router-dom';

export default function DeskMenu(){

    function eraseCharacterInfo(){
        localStorage.removeItem('charactersFilters');
    }

    function eraseComicsInfo() {
        localStorage.removeItem('comicsFilters');
    }

    function eraseStoriesInfo() {
        localStorage.removeItem('storiesFilters');
    }

    return(
        <nav className="deskMenu">
            <Link to="/"><img src="../img/logo.png" alt=""/></Link>
            <div className="links">
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/characters/1" onClick={eraseCharacterInfo}>Characters</NavLink>
                <NavLink to="/comics/1" onClick={eraseComicsInfo}>Comics</NavLink>
                <NavLink to="/stories/1" onClick={eraseStoriesInfo}>Stories</NavLink>
            </div>
        </nav>
    )
}