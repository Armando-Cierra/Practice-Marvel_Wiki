import React, {useState} from 'react';

export default function ComicSearchBar({updateFilter}){

    const [data, setData] = useState({
        orderBy: '-onsaleDate',
        format: '',
        titleStartsWith: '',
        characterID: '',
        storieID: '',
        issueNumber: ''
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
            hasDigitalIssue: true,
            orderBy: '-onsaleDate',
            format: '',
            titleStartsWith: '',
            characterID: '',
            storieID: '',
            issueNumber: ''
        });
    }

    return(
        <div className="searchBar comicSearchBar">
            <form onSubmit={readData}>
                <div className="field">
                    <select name="orderBy" onChange={getData} value={data.orderBy}>
                        <option value="-onsaleDate">Latest Years</option>
                        <option value="onsaleDate">First Years</option>
                        <option value="issueNumber">Issue Numbers</option>
                        <option value="-issueNumber">Latest Issue Numbers</option>
                        <option value="title">Title</option>
                    </select>
                    <select name="format" onChange={getData} value={data.format}>
                        <option value="">Any Format</option>
                        <option value="comic">Comic</option>
                        <option value="magazine">Magazine</option>
                        <option value="trade paperback">Trade Paperback</option>
                        <option value="hardcover">Hardcover</option>
                        <option value="digest">Digest</option>
                        <option value="graphic novel">Graphic Novel</option>
                        <option value="Digital Comic">Digital Comic</option>
                        <option value="infinite comic">Infinite Comic</option>
                    </select>
                    <input type="text" name="titleStartsWith" placeholder="Title starts with..." onChange={getData} value={data.titleStartsWith}/>
                    <input type="text" name="characterID" placeholder="Character ID" onChange={getData} value={data.characterID}/>
                    <input type="text" name="storieID" placeholder="Storie ID" onChange={getData} value={data.storieID}/>
                </div>
                <button type="submit" className="btn red">Search</button>
            </form>
        </div>
    )
}