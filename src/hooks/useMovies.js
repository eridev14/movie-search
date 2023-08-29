import { useCallback, useMemo, useRef, useState } from 'react';
import { searchMovies } from '../services/movies';
// import withResult from '../mocks/with-result.json'
// import notResult from '../mocks/not-result.json'

export function useMovies({ query, sort }) {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousQuery = useRef(query)


    const getMovies = useCallback(async ({ query }) => {
        if (query === previousQuery.current) return
        try {
            setLoading(true)
            setError(null)
            previousQuery.current = query
            const newQuery = await searchMovies({ query })
            setMovies(newQuery)
        } catch (error) {
            setError("no hay nada")
        } finally {
            setLoading(false)
        }
    }, [])

    //useCallbak = funciones
    //useMemo = cualquier cosa

    const sortedMovies = useMemo(() => {
        console.log("render");
        return sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies;
    }, [sort, movies])

    return { movies: sortedMovies, getMovies, loading, error }
}