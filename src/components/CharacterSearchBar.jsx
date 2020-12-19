import {useState, useContext} from 'react'
import CharactersContext from '../context/CharactersContext'

export default function CharacterSearchBar(){

    const {info, setInfo} = useContext(CharactersContext)

    const [data, setData] = useState({
        name: info.nameStartsWith,
        comicID: info.comicID,
        storieID: info.storieID
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
            nameStartsWith: data.name,
            comicID: data.comicID,
            storieID: data.storieID,
            currentPage: 1
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