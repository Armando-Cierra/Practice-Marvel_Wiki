import React, {useState, useContext} from 'react';
import StoriesContext from '../context/StoriesContext'

export default function StoriesSearchBar(){

    const {info, setInfo} = useContext(StoriesContext)

    const [data, setData] = useState({
        characterID: info.characterID,
        comicID: info.comicID,
    });

    function getData(e){
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    function readData(e){
        e.preventDefault();
        setInfo({
            ...info,
            offset: 0,
            characterID: data.characterID,
            comicID: data.comicID,
            currentPage: 1
        });
    }

    return(
        <div className="searchBar characterSearchBar">
            <form onSubmit={readData}>
                <div className="field">
                    <input type="text" name="characterID" placeholder="Character ID" onChange={getData} value={data.characterID}/>
                    <input type="text" name="comicID" placeholder="Comic ID" onChange={getData} value={data.comicID}/>
                </div>
                <button type="submit" className="btn red">Search</button>
            </form>
        </div>
    )
}