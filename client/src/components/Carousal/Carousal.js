import React, { useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css'
import axios from 'axios';
import { useState } from 'react';
import { img_300 } from '../config';
import { unavailable } from '../config';
import '../Carousal/carousal.css'


const Carousal = ({media_type,id}) => { //childrens
  const [credits, setcredits] = useState();

  const items = credits?.map((c) =>(
    <div className='crousalItem'>
        <img src={c.profile_path ? `${img_300}/${c.profile_path}`:unavailable}  alt="aa"  className='carousalItem__img'/>
        <b className='crousalItem__txt'>{c?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=d2be8d71bbce316ce6cf341ced96a652&language=en-US`
    );
    setcredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
  }, [])
  
  return (
    <AliceCarousel mouseTracking infinite disableDotsControls disableButtonsControls responsive={responsive}  items={items}  autoPlay/>
  );
}

export default Carousal