import React from 'react'
import { Card, CardContent, CardDescription} from 'semantic-ui-react';


const CardBack = (props, backKey, handleClick) => { 
    return (
        <Card onClick={handleClick}>
            <CardContent>
                <CardDescription>{props.movie.synopsis}</CardDescription>
            </CardContent>
        </Card>
    );
};

export default CardBack