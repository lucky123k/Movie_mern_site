import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import SingleContent from './SingleContent/SingleContent';
import Sidebar from './Sidebar';
import './css/trending.css'
import CustomPagination from './pagination/CustomPagination';

function Trending() {
    const [page,setPage] = useState(1);
    const [content, setContent] = useState([]);

    const fetchTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=d2be8d71bbce316ce6cf341ced96a652&page=${page}`);
        setContent(data.results);
    };

    useEffect(() => {
        fetchTrending();
    }, [page]);

    return (
        <>
            <h1 className='pagetitle'>Trending</h1>
            <CustomPagination setPage={setPage} />
            <div className='trending'>
                {content.map((c) => (
                    <SingleContent
                        key={c.id}
                        id={c.id}
                        poster_path={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        media_type={c.media_type}
                        vote_average={c.vote_average}
                    />
                ))}
            </div>
            <Sidebar />
        </>
    );
};

export default Trending