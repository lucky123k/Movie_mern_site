import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios';
import CustomPagination from './pagination/CustomPagination';
import SingleContent from './SingleContent/SingleContent';

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numofpages, setNumofpages] = useState();

  const fetchMovies = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=d2be8d71bbce316ce6cf341ced96a652&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}`)

    setContent(data.results);
    setNumofpages(data.total_pages);
  };

  useEffect(() => { fetchMovies() }, [page]);

  return (
    <>
      <div>
        <h1 className='pagetitle'>Movies</h1>
        {numofpages > 1 && (
          <CustomPagination setPage={setPage} numofpages={numofpages} />
        )}
        <div className='trending'>
          {content && content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster_path={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
            />
          ))}
        </div> 
      </div>
      <Sidebar />
    </>
  )
}

export default Movies