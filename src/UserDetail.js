import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PhoneIcon from '@material-ui/icons/Phone';
import { useLocation } from "react-router-dom";

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

const UserDetail = () => {

    const classes = useStyles();
    const [data, setData] = useState(null)
    const location = useLocation();
    //console.log(location.state.detail.id);
    console.log("hey");
    //const myparam = location.state.detail;



    useEffect(async () => {
        const id = await location.state.detail.id;
        const url='https://dummyapi.io/data/api/user/' + id;
        
        console.log(url);
        const userDetailData = await fetch(url, {
            method: 'GET',
            headers: {
                'app-id': '605cd8416fd2e6af2f75d373',
            }
        }).then(res => res.json())
            .then(
                (result) => {
                    return result
                },
                (error) => {
                    return false
                }
            )
        if (!!userDetailData) { setData(userDetailData); console.log(data); }
    }, [])


    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    return (
        <>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {data!==null &&
                    <Grid item xs={4} className={classes.giveMargin}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={data.picture}
                                    title="card"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {data.title} {" "}  {data.firstName} {" "}  {data.lastName} {" "}
                                    </Typography>

                                       <div>
                                            <IconButton aria-label="email">
                                                <MailIcon></MailIcon> {" "} 
                                            </IconButton>
                                            {data.email}
                                        </div>

                                        <div>
                                            <IconButton aria-label="birthday">
                                                <CalendarTodayIcon></CalendarTodayIcon> {" "} 
                                            </IconButton>
                                            {convert(new Date(data.dateOfBirth).toUTCString())}
                                        </div>

                                        <div>
                                            <IconButton aria-label="phone">
                                                <PhoneIcon></PhoneIcon> {" "} 
                                            </IconButton>
                                            {data.phone}
                                        </div>

                                        

                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                }

            </Grid>
        </>
    )
}

export default UserDetail;


