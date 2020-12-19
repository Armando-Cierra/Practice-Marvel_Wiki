import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Helmet} from 'react-helmet';

import Loader from '../components/Loader';
import Header from '../components/Header';

export default function Storie(props){

    //States
    const [load, setLoad] = useState(true);
    const [data, setData] = useState([]);

    //Loading character's info
    useEffect(()=>{
        loadInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    async function loadInfo(){
        const {data: {data: results}} = await axios.get(`https://gateway.marvel.com:443/v1/public/stories/${props.match.params.id}?ts=1&apikey=6cd68a4b84b42955f0f3bb84dec3f553&hash=b0bb162537de4f6bbebf28a7ac757197`);

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
                <Header title1="Marvel" title2="Stories" img="../img/stories.jpg"/>
                <section className="description">
                    <div className="container">
                        <button className="btn" onClick={props.history.goBack} data-aos="zoom-in">Go Back</button>
                        </div>
                    <div className="container data">
                        <div className="img" data-aos="zoom-in"><img src="../img/not-available.jpg" alt=""/></div>
                        <div className="text" data-aos="fade-right">
                            <h2>{data.title}</h2>
                            <h3>Character ID: <span style={{color: 'red'}}>{data.id}</span></h3>
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
                                <div className="comics box">
                                    {data.comics.available === 0 ?
                                        <p>(No comics available)*</p>
                                        :
                                        <>
                                            <h3>Comics</h3>
                                            <ul>
                                                {data.comics.items.map((comic, index)=>(
                                                    <li key={`c${index}`}><Link to={`/comic/${comic.resourceURI.substring(comic.resourceURI.lastIndexOf('/')+1, comic.resourceURI.length)}`}>{comic.name}</Link></li>
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