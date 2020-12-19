import {Link} from 'react-router-dom'
import {useContext} from 'react'
import ComicsContext from '../context/ComicsContext'

export default function ComicsList(){

    const {info, setInfo} = useContext(ComicsContext)

    return(
        <section className="list">
            <div className="container">
                {info.comics.length === 0 ? 
                    <>
                        <Link className="element" onClick={()=>{setInfo({
                            ...info,
                            orderBy: '-onsaleDate',
                            format: '',
                            titleStartsWith: '',
                            characterID: '',
                            storieID: '',
                            issueNumber: '',
                            currentPage: 1
                        })}} data-aos="fade-up">
                            <div className="img" style={{background: `url('../img/not-available.jpg')`}}></div>
                            <span className="name">← No Results, go back</span>
                        </Link>
                    </>
                    :
                    <>
                        {info.comics.map(comic=>{
                            const creators = comic.creators.items;
                            const lastElement = creators.length - 1;
                            let listCreators = '';
        
                            if(creators.length){
                                creators.forEach((e, index)=>{
                                    switch(index){
                                        case 0:
                                            listCreators = e.name;
                                            break;
                                        case lastElement:
                                            listCreators += `${e.name}.`;
                                            break;
                                        default:
                                            listCreators += `, ${e.name}`;
                                            break;
                                    }
                                })
                            }
                            return(
                                <Link className="element" to={`/comic/${comic.id}`} key={comic.id} data-aos="fade-up">
                                    <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt=""/>
                                    <span className="name">{comic.title}</span>
                                    <span>{listCreators}</span>
                                </Link>
                            )
                        })}
                    </>
                }
            </div>
        </section>
    )
}