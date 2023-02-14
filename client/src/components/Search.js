import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Button, Tab, Tabs, TextField } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import "../components/css/search.css"
import axios from 'axios'
import SingleContent from './SingleContent/SingleContent'
import CustomPagination from './pagination/CustomPagination'

function Search() {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setsearchText] = useState("");
    const [content, setcontent] = useState();
    const [numOfPages, setnumOfPages] = useState();

    const darktheme = createTheme({
        palette: {
            type: "dark",
            primary: {
                main: '#fff',
            },
        },
    });

    const myStyle = {
        color: 'rgb(220, 86, 86)',
        width: '50%'
    };

    const fetchSearch = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=d2be8d71bbce316ce6cf341ced96a652&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        );

        setcontent(data.results);
        setnumOfPages(data.total_pages);
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
    }, [type, page]);

    return (
        <div className='main_div'>
            <ThemeProvider theme={darktheme}>
                <div className='textfield'>
                    <TextField
                        label="Search"
                        variant="standard"
                        onChange={(e) => setsearchText(e.target.value)}
                    />
                    <Button 
                        className='btn'
                        onClick={fetchSearch}
                    >
                        <i class=" aa fa-solid fa-magnifying-glass nav-link-icon"></i>
                    </Button>
                </div>
                <Tabs
                    className='tabs'
                    value={type}
                    indicatorColor='primary'
                    textColor='primary'
                    onChange={(event, newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}
                >
                    <Tab style={myStyle} label="Search Movies" />
                    <Tab style={myStyle} label="Search TV Series" />
                </Tabs>
            </ThemeProvider>
            <div className='avc'>
                <div className="trending">
                    {content &&
                        content.map((c) => (
                            <SingleContent
                                key={c.id}
                                id={c.id}
                                poster_path={c.poster_path}
                                title={c.title || c.name}
                                date={c.first_air_date || c.release_date}
                                media_type={type ? "tv" : "movie"}
                                vote_average={c.vote_average}
                            />
                        ))}
                    {searchText &&
                        !content &&
                        (type ? <h2 className='h2hai'>No Series Found</h2> : <h2 className='h2hai'>No Movies Found</h2>)
                    }
                </div>
                {numOfPages > 1 && (
                    <CustomPagination setPage={setPage} numOfPages={numOfPages} />
                )}
            </div>
            <Sidebar />
        </div>
    )
}

export default Search