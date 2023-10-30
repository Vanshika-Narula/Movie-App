import React, { useState } from 'react';
import styled from 'styled-components';
import MovieComponents from './components/MovieComponents';
import MovieInfoComponent from './components/MovieInfoComponent';
import axios from 'axios';

export const API_KEY = `6eeba047`;

const Container = styled.div`
display: flex;
flex-direction: column;
`;

const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items:center;
background-color: black;
color: white;
padding: 10px;
font-weight: bold;
font-size: 25px;
box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const movieImg = styled.img`
width: 48px;
height: 48px;
margin: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;

const SearchIcon = styled.img`
width: 32px;
height: 32px;
`;

const SearchInput = styled.input`
color: black;
font-size: 16px;
font-weight: bold;
border: none;
outline: none;
margin-left: 15px;
overflow: hidden;
`;

const MovieListContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
gap: 24px;
padding: 30px;
justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [timeoutId, updateTimeoutId] = useState();
  const[movieList, updateMovieList]=useState([]);
  const[selectedMovie, onMovieSelect]=useState();
  


  const fetchData = async (searchString) =>{
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
      );

      console.log(response);
      updateMovieList(response.data.Search);
  }
  // debouncing functionality
  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout= setTimeout(()=>fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <movieImg src="/movie-camera.svg" />
            React Movie app
        </AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.svg" />
          <SearchInput placeholder='Search Movie ..' onChange={onTextChange}/>
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponents
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="/movie-camera.svg" />
        )}
      </MovieListContainer>
      
    </Container>
  );
}


export default App;
