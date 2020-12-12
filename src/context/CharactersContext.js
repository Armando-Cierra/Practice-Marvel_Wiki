import {createContext} from 'react'

const CharactersContext = createContext({
    characters: [],
    filters: {
        offset: (props.match.params.pageNumber - 1) * 30,
        nameStartsWith: '',
        comicID: '',
        storieID: ''
    }, 
    pagination: {
        limit: 30,
        totalResults: 0,
        currentPage: props.match.params.pageNumber
    }
})

export default CharactersContext