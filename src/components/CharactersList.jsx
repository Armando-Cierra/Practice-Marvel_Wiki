import {Link} from 'react-router-dom'
import {useContext} from 'react'
import CharactersContext from '../context/CharactersContext'

export default function CharacterList(){

    const {info, setInfo} = useContext(CharactersContext)

    return(
        <section className="list">
            <div className="container">
                {info.characters.length === 0 ? 
                    <Link className="element" onClick={()=>{setInfo({
                        ...info,
                        nameStartsWith: '',
                        comicID: '',
                        storieID: '',
                        currentPage: 1,
                    })}} data-aos="fade-up">
                        <div className="img" style={{background: `url('../img/not-available.jpg')`}}></div>
                        <span className="name">← No Results, go back</span>
                    </Link>
                :
                <>
                    {info.characters.map(character=>(
                        <Link className="element" to={`/character/${character.id}`} key={character.id} data-aos="fade-up">
                            <div className="img" style={{background: `url('${character.thumbnail.path}.${character.thumbnail.extension}')`}}></div>
                            <span className="name">{character.name}</span>
                        </Link>
                    ))}
                </>
                }
            </div>
        </section>
    )
}