import { useEffect, useLayoutEffect, useState } from "react"


export const BuscadorPeliculas = () => {

  const urlBase = 'https://api.themoviedb.org/3/search/movie'
  const APY_KEY = 'b509774cda0777e0cd9534833853d71e'
  const [peliculas, setPeliculas] = useState([])

  const [busqueda, setBusqueda,] = useState('')
  const handleInputChange = (e) => {
     setBusqueda(e.target.value)
  }
  
   const fetchPeliculas = async () => {
      try{
          const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${APY_KEY}`)
          const date = await response.json()
          setPeliculas(date.results)
      }catch(error){
          console.error('ha ocurrido un error: ',error)
      }
   }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchPeliculas()
  }

  return (
    <div className="container">

      <h1 className="title">Buscador De Peliculas </h1>
      <form onSubmit={handleSubmit}>
        <input 
        type="text"  
        placeholder="Pon tu Pelicula" 
        value={busqueda}
        onChange={handleInputChange}
        />
         

        <button type="submit" className="search-button">Buscar</button>
        
      </form>
     
       <div className="movie-list"></div>
       {peliculas.map( (pelicula) => {
  return (
    <div key={pelicula.id} className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
      <h2>{pelicula.title}</h2>
      <p>{pelicula.overview}</p>
    </div>
  )
})}
    </div>
  )
}
