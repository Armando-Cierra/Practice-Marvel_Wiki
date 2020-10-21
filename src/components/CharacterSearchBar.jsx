import React, {useState} from 'react';

export default function CharacterSearchBar({updateFilter}){

    const [data, setData] = useState({
        name: '',
        comicID: '',
        storieID: ''
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
            name: '',
            comicID: '',
            storieID: ''
        });
    }

    return(
        <div className="searchBar characterSearchBar">
            <form onSubmit={readData}>
                <div className="field">
                    <input type="text" name="name" placeholder="Name starts with..." onChange={getData} value={data.name}/>
                    <input type="text" name="comicID" placeholder="Comic ID" onChange={getData} value={data.comicID}/>
                    <input type="text" name="storieID" placeholder="Storie ID" onChange={getData} value={data.storieID}/>
                </div>
                <button type="submit" className="btn red">Search</button>
            </form>
        </div>
    )
}