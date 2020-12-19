import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Helmet} from 'react-helmet';
import StoriesContext from '../context/StoriesContext'

import Header from '../components/Header';
import StoriesSearchBar from '../components/StoriesSearchBar';
import StoriesList from '../components/StoriesList';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

export default function Stories(props){

    //Verifying localStorage
    if(!localStorage.getItem('storiesFilters')){
        localStorage.setItem('storiesFilters', JSON.stringify({
            stories: [],
            offset: (props.match.params.page - 1) * 30,
            characterID: '',
            comicID: '',
            limit: 30,
            totalResults: 0,
            currentPage: props.match.params.page
        }))
    }

    //states
    const [load, setLoad] = useState(true);
    const [info, setInfo] = useState(JSON.parse(localStorage.getItem('storiesFilters')));
    const {offset, characterID, comicID, limit, totalResults} = info;

    //Getting stories information
    useEffect(()=>{
        document.documentElement.scrollTop = 0;
        loadCharacters();
        // eslint-disable-next-line
    },[characterID, comicID])

    async function loadCharacters(){
        setLoad(true);

        //Generate url strings according to filters
        const mainStructure = `https://gateway.marvel.com:443/v1/public/stories?&limit=${limit}&`;

        let url = mainStructure;
        if(offset){url += `offset=${offset}&`}
        if(characterID){ url += `characters=${characterID}&` }
        if(comicID){url += `comics=${comicID}&`}

        url += 'ts=1&apikey=6cd68a4b84b42955f0f3bb84dec3f553&hash=b0bb162537de4f6bbebf28a7ac757197';

        //Request info to the api with the complete url string
        try{
            const {data: {data}} = await axios.get(url);

            await setInfo({
                ...info,
                stories: data.results,
                totalResults: data.total
            })
            setLoad(false);
        } catch(err){
            console.log(err);
        }

        //Saving localStorage info for the filters
        localStorage.setItem('storiesFilters', JSON.stringify(info))
    }

    return(
        <>
            <Helmet>
                <title>Marvel Wiki - Stories</title>
            </Helmet>

            <Header title1="marvel" title2="Stories" img="../img/stories.jpg"/>
            <StoriesContext.Provider value={{info, setInfo}}>
                <StoriesSearchBar/>
                {load ? 
                    <Loader/> 
                    :
                    <StoriesList/>
                }
                {totalResults > 0 && <Pagination url="stories"/>}
            </StoriesContext.Provider>
        </>
    )
}