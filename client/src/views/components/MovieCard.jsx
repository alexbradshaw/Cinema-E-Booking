import React, { useState } from 'react';
import '../CSS/MovieCard.css'; // Make sure the path is correct
import CardFront from './CardFront'; // Import CardFront component
import CardBack from './CardBack'; // Import CardBack component
import ReactCardFlip from 'react-card-flip'; // Import ReactCardFlip component

const MovieCard = ({ movie }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
      <div className="cardGrid">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <CardFront movie={movie} frontKey={movie.id} handleClick={handleClick} />
          <CardBack movie={movie} backKey={movie.id} handleClick={handleClick}/>
        </ReactCardFlip>
      </div>
  );
};

export default MovieCard;

    {/*
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <CardFront
            movie={movie}
            frontKey={movie.id}
            handleClick={handleClick}
        />

        <CardBack
            movie={movie}
            backKey={movie.id}
            handleClick={handleClick}
        />
      </ReactCardFlip>
  */}