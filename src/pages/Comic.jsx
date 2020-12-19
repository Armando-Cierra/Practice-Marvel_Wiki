import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Helmet} from 'react-helmet';

import Loader from '../components/Loader';
import Header from '../components/Header';

export default function Comic(props){

    //States
    const [load, setLoad] = useState(true);
    const [data, setData] = useState([]);

    //Loading character's info
    useEffect(()=>{
        loadInfo();
    },[])

    async function loadInfo(){
        const {data: {data: results}} = await axios.get(`https://gateway.marvel.com:443/v1/public/comics/${props.match.params.id}?ts=1&apikey=6cd68a4b84b42955f0f3bb84dec3f553&hash=b0bb162537de4f6bbebf28a7ac757197`);

        await setData(results.results[0]);
        setLoad(false);
    }

    if(load){
        return( <Loader/> );
    } else {
        return(
            <>
                <Helmet>
                    <title>Marvel Wiki - {data.title}</title>
                </Helmet>
                <Header title1="Marvel" title2="Comic" img={`${data.thumbnail.path}.${data.thumbnail.extension}`}/>
                <section className="description">
                    <div className="container">
                        <button className="btn" onClick={props.history.goBack} data-aos="zoom-in">Go Back</button>
                        </div>
                    <div className="container data">
                        <div className="img" data-aos="zoom-in"><img src={`${data.thumbnail.path}.${data.thumbnail.extension}`} alt=""/></div>
                        <div className="text" data-aos="fade-right">
                            <h2>{data.title}</h2>
                            <h3>Comic ID: <span style={{color: 'red'}}>{data.id}</span></h3>
                            {(data.description != null || data.description === '') && 
                                <p>
                                    <span>Description: </span>
                                    {data.description}
                                </p>
                            }
                            <div className="links" data-aos="fade-up">
                                <div className="characters box">
                                    {data.characters.available === 0 ?
                                        <p>(No characters available)*</p>
                                        :
                                        <>
                                            <h3>Characters</h3>
                                            <ul>
                                                {data.characters.items.map((character, index)=>(
                                                    <li key={`c${index}`}><Link to={`/character/${character.resourceURI.substring(character.resourceURI.lastIndexOf('/')+1, character.resourceURI.length)}`}>{character.name}</Link></li>
                                                ))}
                                            </ul>
                                        </>
                                    }
                                </div>
                                <div className="stories box">
                                    {data.stories.available === 0 ?
                                        <p>(No stories available)*</p>
                                        :
                                        <>
                                        <h3>Stories</h3>
                                        <ul>
                                            {data.stories.items.map((storie, index)=>(
                                                <li key={`s${index}`}><Link to={`/storie/${storie.resourceURI.substring(storie.resourceURI.lastIndexOf('/')+1, storie.resourceURI.length)}`}>{storie.name}</Link></li>
                                            ))}
                                        </ul>
                                    </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <button className="btn" onClick={props.history.goBack} data-aos="zoom-in">Go Back</button>
                    </div>
                </section>
            </>
        )
    }
}