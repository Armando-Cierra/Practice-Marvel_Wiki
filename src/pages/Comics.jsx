import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Helmet} from 'react-helmet';

import Header from '../components/Header';
import ComicSearchBar from '../components/ComicSearchBar';
import ComicsList from '../components/ComicsList';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

export default function Comic(props){
    //--------------------------------------------------
    //STATES--------------------------------------------

    const [load, setLoad] = useState(true);
    const [comics, setComics] = useState([]);

    //Filters for api consumption
    const [filters, setFilters] = useState({
        offset: (props.match.params.pageNumber - 1) * 30,
        //Options
        orderBy: '-onsaleDate',
        format: '',
        //Inputs
        titleStartsWith: '',
        characterID: '',
        storieID: '',
        issueNumber: ''
    })
    const {offset, orderBy, format, titleStartsWith, characterID, storieID, issueNumber} = filters;

    //Pagination values
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
        loadComics(limit, offset, orderBy, format, titleStartsWith, characterID, storieID, issueNumber);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters])

    async function loadComics(limit, offset, orderBy, format, titleStartsWith, characterID, storieID, issueNumber){
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

        //Request info to the api with the complete url string
        try{
            const {data: {data}} = await axios.get(url);
            const {results} = data;

            await setComics(results);
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
        props.history.push('/comics/1')
        await setPagination({
            ...pagination,
            totalResults: 0,
            currentPage: 1
        })
        await setFilters({
            ...filters,
            offset: 0,
            orderBy: e.orderBy,
            format: e.format,
            titleStartsWith: e.titleStartsWith,
            characterID: e.characterID,
            storieID: e.storieID,
            issueNumber: e.issueNumber
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
            offset: (props.match.params.pageNumber - 1) * 30,
            //Options
            orderBy: '-onsaleDate',
            format: '',
            //Inputs
            titleStartsWith: '',
            characterID: '',
            storieID: '',
            issueNumber: ''
        });
    }

    return(
        <>
            <Helmet>
                <title>Marvel Wiki - Comics</title>
            </Helmet>
            <Header title1="marvel" title2="comics" img="../img/comics.jpg" />
            <ComicSearchBar updateFilter={updateFilter}/>
            <div className="boxList">
                {load ? <Loader/> : <ComicsList comics={comics} noResultsUpdate={noResultsUpdate}/> }
            </div>
            {totalResults > 0 && <Pagination url="comics" currentPage={currentPage} updateCurrentPage={updateCurrentPage} totalResults={totalResults} limit={limit}/>}
        </>
    )
}