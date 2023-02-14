import React from 'react';
import { useState, useEffect } from 'react';
// import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios'
import { img_500} from '../config';
import "../contentmodel/contentmodal.css"
import Carousal from '../Carousal/Carousal'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
    width: "90%",
    height: "80%",
    backgroundColor: "rgb(77, 69, 69)",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
};

export default function ContentModal({ children, media_type, id }) {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState();
    const [video, setvideo] = useState();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchdata = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=d2be8d71bbce316ce6cf341ced96a652&language=en-US`

        );
        setContent(data);
    };
    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=d2be8d71bbce316ce6cf341ced96a652&language=en-US`
        );
        console.log(data);
        setvideo(data.results[0]?.key);
    };

    useEffect(() => {
        fetchdata();
        fetchVideo();
    }, [])

    return (
        <div>
            <div className='media' onClick={handleOpen}>{children}</div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={style}>
                    {content && (
                        <div>
                            <div className="ContentModal">
                                <img
                                    src={`${img_500}/${content.poster_path}`}
                                    alt={content.name || content.title}
                                    className="Content_potrait"
                                />
                                <div className="ContentModal__about">
                                    <div className="ContentModal__title">
                                        {content.name || content.title} (
                                        {(
                                            content.first_air_date ||
                                            content.release_date ||
                                            "-----"
                                        ).substring(0, 4)}
                                        )
                                    </div>
                                    {content.tagline && (
                                        <i className="tagline">{content.tagline}</i>
                                    )}

                                    <span className="ContentModal__description">
                                        {content.overview}
                                    </span>

                                    <div>
                                        <Carousal media_type={media_type} id={id} />
                                    </div>

                                    <Button
                                        variant="contained"
                                        startIcon={<i class="fa-brands fa-youtube"></i>}
                                        color="secondary"
                                        target="__blank"
                                        href={`https://www.youtube.com/watch?v=${video}`}
                                    >
                                        Watch the Trailer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                        
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
} 