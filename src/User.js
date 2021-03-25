import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import {
    Link
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 240,
    },
    giveMargin: {
        margin: `${theme.spacing(3)}px auto`,
    },
}));

const User = () => {
    const classes = useStyles();
    const [data, setData] = useState(null)

    useEffect(async () => {
        const userData = await fetch("https://dummyapi.io/data/api/user?limit=10", {
            method: 'GET',
            headers: {
                'app-id': '605cd8416fd2e6af2f75d373',
            }
        }).then(res => res.json())
            .then(
                (result) => {
                    return result.data
                },
                (error) => {
                    return false
                }
            )
        if (!!userData) { setData(userData); console.log(userData); }
    }, [])

    return (
        <>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {data?.map((item) =>


                    <Grid item xs={4} className={classes.giveMargin}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={item.picture}
                                    title="card"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.title} {" "}  {item.firstName} {" "}  {item.lastName} {" "}
                                    </Typography>

                                </CardContent>
                                  <Link to={{
                                    pathname: '/userdetail',
                                    state: { detail: item }
                                }}> KULLANICI DETAYINA GIT </Link>
                            </CardActionArea>
                        </Card>
                    </Grid>

                )}
            </Grid>
        </>
    )
}

export default User;


