import { useCallback, useState } from 'react';
import './App.scss'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App() {
  const { query, setQuery, error } = useSearch();
  const [sort, setSort] = useState(false);
  const { movies, getMovies, loading } = useMovies({ query, sort })

  const debounceGetMovies = useCallback(
    debounce(query => {
      getMovies(query)
    }, 1000)
    , [getMovies]
  )

  function handleSubmit(e) {
    e.preventDefault();
    getMovies({ query })
  }

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debounceGetMovies({ query: newQuery });
  }

  const handleSort = () => {
    setSort(!sort);
  }


  return (
    <>
      <header className="header">
        <h1 className='header__title'>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <input
            type="text"
            onChange={handleChange}
            value={query}
            name='query'
            className='form__input'
            placeholder='Iron Man, Super Man'
            style={
              {
                outline: `1px solid ${error ? "red" : "rgb(165, 165, 165)"}`
              }
            }
          />
          <button className='form__btn'>Buscar</button>
        </form>
        {error &&
          <p className='header__error' style={
            {
              color: "rgb(248, 52, 52)"
            }
          }>{error}</p>}

      </header>

      <main className="main">
        {loading ? <p>Cargando...</p> : <Movies movies={movies} />}
      </main>
    </>
  )
}

export default App
