import React from 'react';
import {Link} from 'react-router-dom';

export default function CharacterList({characters, noResultsUpdate}){

    return(
        <section className="list">
            <div className="container">
                {characters.length === 0 ?
                    <>
                        <Link className="element" onClick={()=>{noResultsUpdate()}}>
                            <div className="img" style={{background: `url('../img/not-available.jpg')`}}></div>
                            <span className="name">← No Results, go back</span>
                        </Link>
                    </>
                    :
                    <>
                        {characters.map(character=>(
                            <Link className="element" to={`/character/${character.id}`} key={character.id}>
                                <div className="img" style={{background: `url('${character.thumbnail.path}.${character.thumbnail.extension}')`}}></div>
                                <span className="name">{character.name}</span>
                            </Link>
                        ))}
                    </>
                }
            </div>
        </section>
    )
}