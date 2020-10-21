import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function Pagination({url, currentPage, updateCurrentPage, totalResults, limit}){
    
    //Variables and States
    let numeration = [];
    const [numerationToShow, setNumerationToShow] = useState([]);
    const [page, setPage] = useState(currentPage);
    
    //Generating the Pagination
    useEffect(()=>{

        const totalPages = Math.ceil(totalResults / limit);

        for(let i=1; i <= totalPages; i++){
            numeration.push(i);
        }

        let newNumeration = []

        newNumeration = numeration.filter(number => number === 1 || (number >= Number(page)-3 && number <= Number(page)+3) || number === numeration.length);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page])

    //Updating selected page
    function updatePage(e){
        updateCurrentPage(e);
        setPage(e)
    }

    return(
        <div className="pagination">
            {numerationToShow.map((num, index)=>(
                <Link key={index} to={num === '...' ? '' : `/${url}/${num}`} onClick={()=>{updatePage(num)}} id={num === Number(page) ? 'active' : ''} className={num === '...' ? 'decoration' : ''}>{num}</Link>
            ))}
        </div>
    )
}