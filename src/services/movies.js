export async function searchMovies({ query }) {
    if (query === "") return null

    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=eb7ae760&s=${query}`)
        const data = await res.json();

        const movies = data.Search;
        return movies?.map(movie => {
            const { imdbID, Title, Year, Poster } = movie;
            return {
                id: imdbID,
                title: Title,
                year: Year,
                poster: Poster
            }
        })

    } catch (error) {
        throw new Error("Error Searching Movies")
    }
}