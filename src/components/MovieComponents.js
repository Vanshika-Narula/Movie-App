import React from "react";
import styled from "styled-components";

const MovieContainer=styled.div`
display: flex;
flex-direction: column;
padding: 10px;
width: 280px;
box-shadow: 0 3px 10px 0 #aaa;
cursor: pointer;
`;

const MovieName=styled.span`
font-size: 18px;
font-weight: 600;
color: black;
margin: 15px 0;
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
`;

const CoverImg=styled.img`
object-fit: cover;
height: 362px;
`;

const InfoColumn = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`;

const MovieInfo = styled.div`
font-size: 16px;
font-weight: 500;
color: black;
text-transform: capitalize;
white-space: nowrap;
overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;
const MovieComponents = (props) =>{
    const { Title, Year, imdbID, Type, Poster }= props.movie;
    return (
    <MovieContainer 
    onClick={()=> {
        console.log(props); 
        props.onMovieSelect(imdbID);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }}>
        <CoverImg src={Poster} alt={Title}/>
        <MovieName>{Title}</MovieName>
        <InfoColumn>
            <MovieInfo>Year: {Year}</MovieInfo>
            <MovieInfo>Type: {Type}</MovieInfo>
        </InfoColumn>

    </MovieContainer>
    );
}

export default MovieComponents;