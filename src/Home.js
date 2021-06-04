import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import { useEffect } from "react";
import { useAsync } from 'react-async';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const loadPokemons = async () =>
    await fetch("https://pokeapi.co/api/v2/pokemon?offset=20&limit=9")
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => {
            return res.json()
        })


export default function Home() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    
    const getPokemonInfo = async (id) => {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json())
    }
    const handleClickOpen = (event) => {
        console.log("ID ", event.currentTarget.id)
        const d = getPokemonInfo(event.currentTarget.id);
        
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const { data, error, isLoading } = useAsync({ promiseFn: loadPokemons })
    if (isLoading) return "Loading..."
    if (error) return `Something went wrong: ${error.message}`
    if (data)
    
    data.results.forEach(element => {
        element.id = element.url.split("/")[6];
    });
    console.log(data.results)
    //await getPokInfo()

        // useEffect(() => {
        //     return fetch("https://pokeapi.co/api/v2/pokemon?offset=20&limit=9")
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data)
        //         pokemons = data.results;
        //         console.log(pokemons)
        //     });
        // }, []);
        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <CameraIcon className={classes.icon} />
                        <Typography variant="h6" color="inherit" noWrap>
                            Album layout
          </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    {/* Hero unit */}
                    <div className={classes.heroContent}>
                        <Container maxWidth="sm">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Album layout
            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                Something short and leading about the collection below—its contents, the creator, etc.
                                Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                                entirely.
            </Typography>
                            <div className={classes.heroButtons}>
                                <Grid container spacing={2} justify="center">
                                    <Grid item>
                                        <Button variant="contained" color="primary">
                                            Main call to action
                  </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" color="primary">
                                            Secondary action
                  </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </div>
                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {data.results.map((pok) => (
                                <Grid item key={pok.id} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pok.id}.png`}
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {pok.name}
                                            </Typography>
                                            <Typography>
                                                This is a media card. You can use this section to describe the content.
                                         </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary" id={pok.id} onClick={handleClickOpen}>
                                                View
                                        </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Disagree
                                </Button>
                                <Button onClick={handleClose} color="primary" autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Container>
                </main>
                {/* Footer */}
                <footer className={classes.footer}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Footer
        </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                        Something here to give the footer a purpose!
        </Typography>
                    <Copyright />
                </footer>
                {/* End footer */}
            </React.Fragment>
        );
}