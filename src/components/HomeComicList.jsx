import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Loader from './Loader';


export default function HomeComicList(){

    const [load, setLoad] = useState(true);
    const [comics, setComics] = useState([]);

    useEffect(()=>{
        loadComics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    async function loadComics(){
        const {data: {data: {results}}} = await axios.get('https://gateway.marvel.com/v1/public/comics?&limit=5&formatType=comic&hasDigitalIssue=true&ts=1&apikey=6cd68a4b84b42955f0f3bb84dec3f553&hash=b0bb162537de4f6bbebf28a7ac757197');

        await setComics(results);
        setLoad(false);
    }

    if(load){
        return(<Loader/>);
    } else {
        return(
            <div className="list">
                <div className="container">
                    {comics.map((comic, index)=>{
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
                            <Link className="element" to={`/comic/${comic.id}`} key={comic.id} data-aos="zoom-in" data-aos-delay={index * 100}>
                                <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt=""/>
                                <span className="name">{comic.title}</span>
                                <span>{listCreators}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
}