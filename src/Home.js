import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InstagramIcon from '@material-ui/icons/Instagram';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MailIcon from '@material-ui/icons/Mail';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    giveMargin: {
        margin: `${theme.spacing(3)}px auto`,
    },
}));

export default function Home() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [data, setData] = useState(null)

    useEffect(async () => {
        const homeData = await fetch("https://dummyapi.io/data/api/post?limit=10", {
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
        if (!!homeData) { setData(homeData); console.log(homeData); }
    }, [])

    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    return (
        <>
            <Header></Header>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {data?.map((item) =>

                    <Grid item xs={4} className={classes.giveMargin}>
                        <Card className={classes.root}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        {item.owner.firstName.charAt(0)}
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={item.owner.title + " " + item.owner.firstName + " " + item.owner.lastName}
                                subheader={convert(new Date(item.publishDate).toString())}
                            />
                            <CardMedia
                                className={classes.media}
                                image={item.owner.picture}
                                title="owner"
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.owner.email.length > 0 &&
                                        <div>
                                            <IconButton aria-label="mail">
                                                <MailIcon></MailIcon> {" "} 
                                            </IconButton>
                                            {item.owner.email}
                                        </div>
                                    }
                                    {item.text}
                                </Typography>
                                <CardMedia
                                    className={classes.media}
                                    image={item.image}
                                    title="animal"
                                />
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    {item.likes}<FavoriteIcon />
                                </IconButton>

                                <IconButton aria-label="instagram">
                                    <a href={item.link}>
                                        <InstagramIcon />
                                    </a>
                                </IconButton>



                              Etiketler: {item.tags?.map((tag) =>
                                    tag + " "
                                )}
                            </CardActions>

                        </Card>
                    </Grid>
                )}
            </Grid>
        </>
    );
}
