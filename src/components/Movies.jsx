/* eslint-disable react/prop-types */
function CardMovie({ movie }) {
    const { title, year, poster } = movie;
    return (
        <div className="card-movie">
            <h3 className="card-movie__title">{title}</h3>
            <p className="card-movie__year">{year}</p>
            <img className='card-movie__img' src={poster} alt={title} />
        </div>
    )
}

function NoMovies() {
    return (
        <p>no se encontraron peliculas</p>
    )
}

export const Movies = ({ movies }) => {
    const hasMovies = movies?.length > 0;
    return (
        <>
            {
                hasMovies
                    ? movies.map(movie => (
                        <CardMovie key={movie.id} movie={movie} />
                    ))
                    : <NoMovies />
            }
        </>
    )
}
