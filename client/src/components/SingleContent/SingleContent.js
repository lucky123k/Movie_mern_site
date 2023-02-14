import React from 'react'
import { img_300, unavailable } from '../config'
import ContentModal from '../contentmodel/ContentModal'
import '../SingleContent/singlecontent.css'

const SingleContent = ({
  id,
  poster_path,
  title,
  date,
  media_type, 
  vote_average,
}) =>{
  return (
    <ContentModal media_type={media_type} id={id}>
      <img className='poster' src={poster_path? `${img_300}/${poster_path}`: unavailable} alt="d"/>
      <b className='title'>{title}</b>
      <span className='subtitle'>{media_type==="tv" ? "TV Series" : "Movies"}</span>
      <span className='subtitle'>{date}</span>
    </ContentModal>
  )
}

export default SingleContent