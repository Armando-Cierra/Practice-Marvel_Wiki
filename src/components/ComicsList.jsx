import React from 'react';
import {Link} from 'react-router-dom';

export default function ComicsList({comics, noResultsUpdate}){

    return(
        <section className="list">
            <div className="container">
                {comics.length === 0 ? 
                    <>
                        <Link className="element" onClick={()=>{noResultsUpdate()}}>
                            <div className="img" style={{background: `url('../img/not-available.jpg')`}}></div>
                            <span className="name">← No Results, go back</span>
                        </Link>
                    </>
                    :
                    <>
                        {comics.map(comic=>{
                            const creators = comic.creators.items;
                            const lastElement = creators.length - 1;
                            let listCreators = '';
        
                            if(creators.length){
                                creators.forEach((e, index)=>{
                                    switch(index){
                                        case 0:
                                            listCreators = e.name;
                                            break;
                                        case lastElement:
                                            listCreators += `${e.name}.`;
                                            break;
                                        default:
                                            listCreators += `, ${e.name}`;
                                            break;
                                    }
                                })
                            }
                            return(
                                <Link className="element" to={`/comic/${comic.id}`} key={comic.id}>
                                    <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt=""/>
                                    <span className="name">{comic.title}</span>
                                    <span>{listCreators}</span>
                                </Link>
                            )
                        })}
                    </>
                }
            </div>
        </section>
    )
}