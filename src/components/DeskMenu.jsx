import React from 'react';
import {Link, NavLink} from 'react-router-dom';

export default function DeskMenu(){
    return(
        <nav className="deskMenu">
            <Link to="/"><img src="../img/logo.png" alt=""/></Link>
            <div className="links">
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/characters/1">Characters</NavLink>
                <NavLink to="/comics/1">Comics</NavLink>
                <NavLink to="/stories/1">Stories</NavLink>
            </div>
        </nav>
    )
}