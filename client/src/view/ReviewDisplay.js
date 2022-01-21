import React from 'react'
import { Card, CardMedia, CardContent, Typography,   } from '@mui/material'
import { reviews } from './Reviews'
import UseMediaQuery from '../hooks/UseMediaQuery'

const ReviewDisplay = () => {

    const isMobile = UseMediaQuery('(min-width: 960px)')


    return (
        <div className={ isMobile ? 'grid grid-cols-3 gap-3' : "flex flex-row gap-3 my-0 mx-auto"}>{
            
            reviews ? reviews.map((review, i) => {
                return(
            <Card sx={{ minWidth: 345 }} key={review.id}>
            <CardMedia
                component="img"
                height="140"
                image={review.img}
                alt="green iguana"
                
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {review.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {review.review}
                </Typography>
            </CardContent>
        </Card>
                )
            })

         : null
        }
        </div>
    )
}

export default ReviewDisplay
