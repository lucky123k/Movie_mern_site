import axios from "axios";
import { useEffect, useState } from "react";
import CustomPagination from "./pagination/CustomPagination";
import Sidebar from "./Sidebar";
import SingleContent from "./SingleContent/SingleContent";

const Series = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();

    const fetchSeries = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=d2be8d71bbce316ce6cf341ced96a652&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}`
        );
        setContent(data.results);
        setNumOfPages(data.total_pages);
        // console.log(data);
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSeries();
    }, [page]);

    return (
        <>
            <h1 className="pagetitle">Discover Series</h1>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numofpages={numOfPages} />
            )}
            <div className='trending'>
                {content && content.map((c) => (
                    <SingleContent
                        key={c.id}
                        id={c.id}
                        poster_path={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        media_type="tv"
                        vote_average={c.vote_average}
                    />
                ))}
            </div>
            <Sidebar />
        </>

    );
};

export default Series;
