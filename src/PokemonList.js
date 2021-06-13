import './App.css';
import PropTypes, { elementType } from 'prop-types';
import { useState, useEffect } from 'react';
import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';


const PokemonCard = ({ id, name, key }) => {
    const classes = useStyles();
    const [pokemon, setPokemon] = useState([]);
    const [dialog, setDialog] = useState(false);

    const getPokemonInfo = async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json();
        console.log(data);
        setPokemon(data);
    }

    const handleSelectClick = (event) => {
        console.log(event.currentTarget.id)
        getPokemonInfo(event.currentTarget.id)
        setDialog(true);
    }

    const handleClose = () => {
        setDialog(false);
    }

    return (
        <div>
            <Card className={classes.card} key={key}>
                <CardMedia
                    className={classes.cardMedia}
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography>
                        {id}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" id={id} onClick={handleSelectClick}>
                        View
                    </Button>
                </CardActions>
            </Card>
            <Dialog
                open={dialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Height: {pokemon.height}
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
        </div>
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

function PokemonList() {
    const classes = useStyles();
    const [pokemons, setPokemons] = useState([]);
    const getPokemons = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=20&limit=9`)
        const data = await response.json();
        data.results.forEach(element => {
            element.id = element.url.split("/")[6];
        });
        setPokemons(data.results);
    }

    useEffect(() => {
        getPokemons()
    }, []);

    return (
        <div className="App">
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {pokemons.map((pokemon) => (
                        <Grid item key={pokemon.key} xs={12} sm={6} md={4}>
                            <PokemonCard key={pokemon.key} id={pokemon.id} name={pokemon.name} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default PokemonList;