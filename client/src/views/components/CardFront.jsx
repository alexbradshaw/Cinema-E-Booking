import {React, useState} from 'react'
import { Card, Image, Rating, Icon, CardContent, CardMeta, CardHeader, Button, ButtonContent } from 'semantic-ui-react';
import '../CSS/CardFront.css';
import { useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import VideoModal from "./VideoModal";

const CardFront = (props, frontKey, handleClick) => {
    // console.log(props.movie.title);
    //console.log(props.movie.poster_url);
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);

    const handleButtonClick = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };

    return (
    <div>
        <Card fluid>
            <Image src={`${props.movie.poster_url}`} onClick={handleClick} 
                style={{
                    margin: '30px', 
                    marginRight: '20px',
            }} 
            />
            
            <CardContent>
                <CardHeader>{props.movie.title}</CardHeader>
                <CardMeta>
                    <span>{(new Date(props.movie.starts_showing)).getTime() > Date.now() ? 'Coming Soon' : 'Currently Running'}</span>
                    {/* {props.movie.release_date.slice(0,4)} */}
                </CardMeta>
            </CardContent>
            
            <CardContent extra>
                <Button animated='vertical' onClick={handleButtonClick}>
                    <ButtonContent visible>Watch Trailer</ButtonContent>
                    <ButtonContent hidden>
                        <Icon name='shop' />
                    </ButtonContent>
                </Button>
                <VideoModal open={modalOpen} onClose={handleCloseModal} videoUrl={`${props.movie.trailer_url}`}/>

                <Rating icon='star' defaultRating={props.movie.vote_average} maxRating={5} disabled />
                <Icon onClick={() => props.handleMovie(props.movie)} name={props.icon} color={props.color} />

                <Button animated='vertical'>
                    <ButtonContent visible>Book Now</ButtonContent>
                    <ButtonContent hidden>
                        <Icon name='shop' />
                    </ButtonContent>
                </Button>
            </CardContent>
        </Card>
    </div>
    );
};
export default CardFront