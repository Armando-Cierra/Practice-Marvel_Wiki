import React, {useState} from 'react';

export default function StoriesSearchBar({updateFilter}){

    const [data, setData] = useState({
        characterID: '',
        comicID: '',
    });

    function getData(e){
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    function readData(e){
        e.preventDefault();
        updateFilter(data);
        setData({
            characterID: '',
            comicID: '',
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