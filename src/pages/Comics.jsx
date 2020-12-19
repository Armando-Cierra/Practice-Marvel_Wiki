import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Helmet} from 'react-helmet'
import ComicsContext from '../context/ComicsContext'

import Header from '../components/Header';
import ComicSearchBar from '../components/ComicSearchBar';
import ComicsList from '../components/ComicsList';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

export default function Comic(props){

    //Verifying localStorage
    if(!localStorage.getItem('comicsFilters')){
        localStorage.setItem('comicsFilters', JSON.stringify({
            comics: [],
            offset: (props.match.params.page - 1) * 30,
            orderBy: '-onsaleDate',
            format: '',
            titleStartsWith: '',
            characterID: '',
            storieID: '',
            issueNumber: '',
            limit: 30,
            totalResults: 0,
            currentPage: props.match.params.page
        }))
    }

    //states
    const [load, setLoad] = useState(true);
    const [info, setInfo] = useState(JSON.parse(localStorage.getItem('comicsFilters')))
    const {offset, orderBy, format, titleStartsWith, characterID, storieID, issueNumber, limit, totalResults, currentPage} = info;


    //Getting comics information
    useEffect(()=>{
        document.documentElement.scrollTop = 0;
        loadComics();
        // eslint-disable-next-line
    }, [orderBy, format, titleStartsWith, characterID, storieID, issueNumber, currentPage])

    async function loadComics(){
        setLoad(true);

        //Generate url strings according to filters
        const mainStructure = `https://gateway.marvel.com:443/v1/public/comics?&limit=${limit}&formatType=comic&hasDigitalIssue=true&`;
        let url = mainStructure;

        if(offset){url += `offset=${offset}&`}
        if(orderBy){url += `orderBy=${orderBy}&`}
        if(format){
            switch(format){
                case 'comic':
                    url += 'format=comic&';
                    break;
                case 'magazine':
                    url += 'format=magazine&'
                    break;
                case 'trade paperback':
                    url += 'format=trade%20paperback&';
                    break;
                case 'hardcover':
                    url += 'format=hardcover&';
                    break;
                case 'digest':
                    url = 'format=digest&';
                    break;
                case 'graphic novel':
                    url += 'format=graphic%20novel&';
                    break;
                case 'digital comic':
                    url += 'format=digital%20comic&';
                    break;
                case 'infinite comic':
                    url += 'format=infinite%20comic&';
                    break;
                default:
                    url += '';
                    break;
            }
        }
        if(titleStartsWith){url += `titleStartsWith=${titleStartsWith}&`}
        if(characterID){url += `characters=${characterID}&`}
        if(storieID){url += `stories=${storieID}&`}
        if(issueNumber){url += `issueNumber=${issueNumber}&`}

        url += 'ts=1&apikey=6cd68a4b84b42955f0f3bb84dec3f553&hash=b0bb162537de4f6bbebf28a7ac757197';

        //Request info to marvel api
        try{
            const {data: {data}} = await axios.get(url);
            await setInfo({
                ...info,
                comics: data.results,
                totalResults: data.total
            });
            setLoad(false);
            
        } catch(err){
            console.log(err);
        }

        //Saving localStorage info for filters
        localStorage.setItem('comicsFilters', JSON.stringify(info));
    }

    return(
        <>
            <Helmet>
                <title>Marvel Wiki - Comics</title>
            </Helmet>

            <Header title1="marvel" title2="comics" img="../img/comics.jpg" />
            <ComicsContext.Provider value={{info, setInfo}}>
                <ComicSearchBar/>
                {load ? 
                    <Loader/> 
                    : 
                    <ComicsList /> 
                }
                {totalResults > 0 && <Pagination url="comics"/>}
            </ComicsContext.Provider>
        </>
    )
}