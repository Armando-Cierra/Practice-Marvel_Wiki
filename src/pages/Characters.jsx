import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Helmet} from 'react-helmet';

import Header from '../components/Header';
import CharacterSearchBar from '../components/CharacterSearchBar';
import CharacterList from '../components/CharacterList';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

export default function Character(props){
    //--------------------------------------------------
    //STATES--------------------------------------------

    const [load, setLoad] = useState(true);
    const [characters, setCharacters] = useState([]);

    //Filters for api consumption
    const [filters, setFilters] = useState({
        offset: (props.match.params.pageNumber - 1) * 30,
        nameStartsWith: '',
        comicID: '',
        storieID: ''
    })
    const {offset, nameStartsWith, comicID, storiesID} = filters;
    
    //Pagination Values
    const [pagination, setPagination] = useState({
        limit: 30,
        totalResults: 0,
        currentPage: props.match.params.pageNumber
    })
    const {limit, totalResults, currentPage} = pagination;

    //--------------------------------------------------
    //CHARACTERS LOAD-----------------------------------

    useEffect(()=>{
        document.documentElement.scrollTop = 0;
        loadCharacters(limit, offset, nameStartsWith, comicID, storiesID);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[filters])

    async function loadCharacters(limit, offset, nameStartsWith, comicID, storieID){

        setLoad(true);

        //Generate url strings according to filters
        const mainStructure = `https://gateway.marvel.com:443/v1/public/characters?&limit=${limit}&`;

        let url = mainStructure;
        if(offset){url += `offset=${offset}&`}
        if(nameStartsWith){url += `nameStartsWith=${nameStartsWith}&`}
        if(comicID){url += `comics=${comicID}&`}
        if(storieID){url += `stories=${storieID}&`}

        url += 'ts=1&apikey=6cd68a4b84b42955f0f3bb84dec3f553&hash=b0bb162537de4f6bbebf28a7ac757197';

        //Request info to the api with the complete url string
        try{
            const {data: {data}} = await axios.get(url);
            const {results} = data;

            await setCharacters(results);
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
        props.history.push('/characters/1')
        await setPagination({
            ...pagination,
            totalResults: 0,
            currentPage: 1
        })
        await setFilters({
            ...filters,
            offset: 0,
            nameStartsWith: e.name,
            comicID: e.comicID,
            storieID: e.storiesID
        });
    }

    //--------------------------------------------------
    //NO RESULTS UPDATE---------------------------------

    async function noResultsUpdate(){
        props.history.push('/characters/1');
        await setPagination({
            ...pagination,
            totalResults: 0,
            currentPage: 1
        })
        await setFilters({
            ...filters,
            offset: 0,
            nameStartsWith: '',
            comicID: '',
            storieID: ''
        });
    }

    return(
        <>
            <Helmet>
                <title>Marvel Wiki - Characters</title>
            </Helmet>
            <Header title1="marvel" title2="characters" img="../img/characters.jpg"/>
            <CharacterSearchBar updateFilter={updateFilter}/>
            <div className="boxList">
                {load ? <Loader/> : <CharacterList characters={characters} noResultsUpdate={noResultsUpdate}/>}
            </div>
            {totalResults > 0 && <Pagination url="characters" currentPage={currentPage} updateCurrentPage={updateCurrentPage} totalResults={totalResults} limit={limit}/>}
        </>
    )
}