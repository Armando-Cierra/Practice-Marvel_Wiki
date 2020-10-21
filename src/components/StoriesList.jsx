import React from 'react';
import {Link} from 'react-router-dom';

export default function StoriesList({stories, noResultsUpdate}){

    return(
        <section className="list">
            <div className="container">
                {stories.length === 0 ?
                    <>
                        <Link className="element" onClick={()=>{noResultsUpdate()}}>
                            <div className="img" style={{background: `url('../img/not-available.jpg')`, backgroundSize: "cover"}}></div>
                            <span className="name">← No Results, go back</span>
                        </Link>
                    </>
                    :
                    <>
                        {stories.map(storie=>(
                            <Link className="element storie" to={`/storie/${storie.id}`} key={storie.id}>
                                <span>{storie.title}</span>
                            </Link>
                        ))}
                    </>
                }
            </div>
        </section>
    )
}