import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Helmet} from 'react-helmet'
import CharactersContext from '../context/CharactersContext'

import Loader from '../components/Loader'
import Header from '../components/Header'
import CharacterSearchBar from '../components/CharacterSearchBar'
import CharactersList from '../components/CharactersList'
import Pagination from '../components/Pagination'

export default function Characters(props){

    //Verifying localStorage
    if(!localStorage.getItem('charactersFilters')){
        localStorage.setItem('charactersFilters', JSON.stringify({
            characters: [],
            offset: (props.match.params.page - 1) * 30,
            nameStartsWith: '',
            comicID: '',
            storieID: '',
            limit: 30,
            totalResults: 0,
            currentPage: props.match.params.page
        }))
    }

    //States
    const [load, setLoad] = useState(true)
    const [info, setInfo] = useState(JSON.parse(localStorage.getItem('charactersFilters')))
    const {offset, nameStartsWith, comicID, storieID, limit, totalResults, currentPage} = info;

    //Getting characters information
    useEffect(()=>{
        document.documentElement.scrollTop = 0;
        loadCharacters();
    },[nameStartsWith, comicID, storieID, currentPage])


    async function loadCharacters(){
        setLoad(true);

        //Generating url string
        const mainStructure = `https://gateway.marvel.com:443/v1/public/characters?&limit=${limit}&`;

        let url = mainStructure;
        if(offset){url += `offset=${offset}&`}
        if(nameStartsWith){url += `nameStartsWith=${nameStartsWith}&`}
        if(comicID){url += `comics=${comicID}&`}
        if(storieID){url += `stories=${storieID}&`}

        url += 'ts=1&apikey=6cd68a4b84b42955f0f3bb84dec3f553&hash=b0bb162537de4f6bbebf28a7ac757197';

        //Requesting info to marvel api
        try{
            const {data: {data}} = await axios.get(url);
            await setInfo({
                ...info,
                characters: data.results,
                totalResults: data.total
            });
            setLoad(false);
        } catch(err){
            console.log(err);
        }

        //Saving localstorage info for filters
        localStorage.setItem('charactersFilters', JSON.stringify(info));
    }

    return(
        <>
            <Helmet>
                <title>Marvel Wiki - Characters</title>
            </Helmet>

            <Header title1="marvel" title2="characters" img="../img/characters.jpg"/>
            <CharactersContext.Provider value={{info, setInfo}}>
                <CharacterSearchBar/>
                {load ? 
                    <Loader/>
                    :
                    <CharactersList />
                }
                {totalResults > 0 && <Pagination url="characters" />}
            </CharactersContext.Provider>
        </>
    )
}