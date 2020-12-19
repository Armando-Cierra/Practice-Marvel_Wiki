import {Link} from 'react-router-dom';
import {useState, useEffect, useContext} from 'react'
import CharactersContext from '../context/CharactersContext'
import ComicsContext from '../context/ComicsContext'
import StoriesContext from '../context/StoriesContext'

export default function Pagination({url}){

    function filterType(){
        switch(url){
            case 'characters':
                return CharactersContext;
                break;
            case 'comics':
                return ComicsContext;
                break;
            case 'stories':
                return StoriesContext;
                break;
        }
    }

    const {info, setInfo} = useContext(filterType());
    
    let numeration = [];
    const [numerationToShow, setNumerationToShow] = useState([]);
    const [page, setPage] = useState(info.currentPage);
    
    //Generating the Pagination
    useEffect(()=>{
        const totalPages = Math.ceil(info.totalResults / info.limit);

        for(let i=1; i <= totalPages; i++){
            numeration.push(i);
        }

        let newNumeration = []

        newNumeration = numeration.filter(number => 
            number === 1 || 
            (number >= Number(page)-3 && number <= Number(page)+3) || 
            number === numeration.length);

        if(page > 5){
            newNumeration[1] !== '...' && newNumeration.splice(1, 0, '...');
        } else {
            newNumeration[1] === '...' && newNumeration.splice(1, 1);
        }

        if(page < numeration.length - 4){
            newNumeration[newNumeration.length-1] !== '...' && newNumeration.splice(newNumeration.length-1, 0, '...');
        } else {
            newNumeration[newNumeration.length-1] === '...' && newNumeration.splice(newNumeration.length-1, 1);
        }

        setNumerationToShow(newNumeration);
    },[page, info])

    //Updating selected page
    function updatePage(e){
        setInfo({
            ...info,
            offset: (e - 1) * 30,
            currentPage: e
        })
        setPage(e)
    }

    return(
        <div className="pagination">
            {numerationToShow.map((num, index)=>(
                <Link key={index} to={num === '...' ? '' : `/${url}/${num}`} onClick={()=>{
                    updatePage(num)
                }} 
                id={num === Number(info.currentPage) ? 'active' : ''} 
                className={num === '...' ? 'decoration' : ''}>
                    {num}
                </Link>
            ))}
        </div>
    )
}