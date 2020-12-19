import {useContext} from 'react';
import {Link} from 'react-router-dom';
import StoriesContext from '../context/StoriesContext'

export default function StoriesList({stories, noResultsUpdate}){

    const {info, setInfo} = useContext(StoriesContext)

    return(
        <section className="list">
            <div className="container">
                {info.stories.length === 0 ?
                    <>
                        <Link className="element" onClick={()=>{setInfo({
                            ...info,
                            comicID: '',
                            characterID: ''
                        })}} data-aos="fade-up">
                            <div className="img" style={{background: `url('../img/not-available.jpg')`, backgroundSize: "cover"}}></div>
                            <span className="name">← No Results, go back</span>
                        </Link>
                    </>
                    :
                    <>
                        {info.stories.map(storie=>(
                            <Link className="element storie" to={`/storie/${storie.id}`} key={storie.id} data-aos="fade-up">
                                <span>{storie.title}</span>
                            </Link>
                        ))}
                    </>
                }
            </div>
        </section>
    )
}