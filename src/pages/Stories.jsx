import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Helmet} from 'react-helmet';

import Header from '../components/Header';
import StoriesSearchBar from '../components/StoriesSearchBar';
import StoriesList from '../components/StoriesList';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

export default function Stories(props){
    //--------------------------------------------------
    //STATES--------------------------------------------

    const [load, setLoad] = useState(true);
    const [stories, setStories] = useState([]);

    //Filters for api consumption
    const [filters, setFilters] = useState({
        offset: (props.match.params.pageNumber - 1) * 30,
        characterID: '',
        comicID: ''
    })
    const {offset, characterID, comicID} = filters;
    
    //Pagination Values
    const [pagination, setPagination] = useState({
        limit: 50,
        totalResults: 0,
        currentPage: props.match.params.pageNumber
    })
    const {limit, totalResults, currentPage} = pagination;

    //--------------------------------------------------
    //STORIES LOAD-----------------------------------

    useEffect(()=>{
        document.documentElement.scrollTop = 0;
        loadCharacters(limit, offset, characterID, comicID);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[filters])

    async function loadCharacters(limit, offset, characterID, comicID){

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
            const {results} = data;

            await setStories(results);
            await setPagination({
                ...pagination,
                totalResults: data.total
            })
            setLoad(false);
        } catch(err){
            console.log(err);
        }
    }

    //--------------------------------------------------
    //PAGINATION FUNCTIONS------------------------------

    async function updateCurrentPage(e){
        await setPagination({
            ...pagination,
            currentPage: e
        })
        await setFilters({
            ...filters,
            offset: (e - 1) * 30
        })
    }

    //--------------------------------------------------
    //SEARCH BAR FILTER---------------------------------

    async function updateFilter(e){
        props.history.push('/stories/1')
        await setPagination({
            ...pagination,
            totalResults: 0,
            currentPage: 1
        })
        await setFilters({
            ...filters,
            offset: 0,
            characterID: e.characterID,
            comicID: e.comicID,
        });
        
    }

    //--------------------------------------------------
    //NO RESULTS UPDATE---------------------------------

    async function noResultsUpdate(){
        props.history.push('/comics/1')
        await setPagination({
            ...pagination,
            totalResults: 0,
            currentPage: 1
        })
        await setFilters({
            ...filters,
            offset: 0,
            characterID: '',
            comicID: '',
        });
    }

    return(
        <>
            <Helmet>
                <title>Marvel Wiki - Stories</title>
            </Helmet>
            <Header title1="marvel" title2="Stories" img="../img/stories.jpg"/>
            <StoriesSearchBar updateFilter={updateFilter}/>
            <div className="boxList">
                {load ? <Loader/> : <StoriesList stories={stories} noResultsUpdate={noResultsUpdate}/>}
            </div>
            {totalResults > 0 && <Pagination url="stories" currentPage={currentPage} updateCurrentPage={updateCurrentPage} totalResults={totalResults} limit={limit}/>}
        </>
    )
}