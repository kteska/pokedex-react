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
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(4),
        },
    },
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
        width: '300px',
        flexDirection: 'column',
        paddingTop: '25px',
        cursor: 'pointer'
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
        width: 170,
        height: 0,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    avatar: {
        paddingTop: '56.25%', // 16:9
        width: 190,
        height: 0,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '100px',
        marginTop: '10px'
    },
    dialogTitle: {
        textAlign: 'center'
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    pagination: {
        marginTop: '40px',
        justifyContent: "center",
        display: 'flex',
        backgroundColor: 'white',
        padding: '12px',
        width: '102%'
    }
}));

const PokemonCard = ({ id, name, key }) => {
    const classes = useStyles();
    const [pokemon, setPokemon] = useState([]);
    const [dialog, setDialog] = useState(false);

    const getPokemonInfo = async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json();
        console.log(data.types[0].type.name)
        setPokemon(data);
        console.log(data)
    }

    const handleSelectClick = (event) => {
        getPokemonInfo(event.currentTarget.id)
        setDialog(true);
    }

    const handleClose = () => {
        setDialog(false);
    }

    return (
        <div>
            <Card className={classes.card} key={key} id={id} onClick={handleSelectClick}>
                <CardMedia
                    className={classes.cardMedia}
                    image={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                </CardContent>
            </Card>
            <Dialog
                open={dialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth='xs'
            >
                <CardMedia
                    className={classes.avatar}
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                />
                <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
                    {name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className={classes.dialogTitle}>
                        <Typography>Base experience: {pokemon.base_experience}</Typography>
                        <Typography>Weight: {pokemon.weight}</Typography>
                        <Typography> Height: {pokemon.height}</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


function PokemonList() {
    const classes = useStyles();
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(1);
    const [offset, setOffset] = useState(0);

    const handlePageChange = (event, value) => {
        if (page < value) {
            let nextOffset = offset + 6;
            setOffset(nextOffset)
        } else {
            let prevOffset = offset - 6;
            setOffset(prevOffset);
        }
        setPage(value);
        console.log('val', value);
    }

    const getPokemons = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=6`)
        const data = await response.json();
        data.results.forEach(element => {
            element.id = element.url.split("/")[6];
            element.name = element.name.toUpperCase();
        });
        setPokemons(data.results);
    }

    useEffect(() => {
        getPokemons()
    }, [page]);

    return (
        <div className="App">
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={8}>
                    {pokemons.map((pokemon) => (
                        <Grid item key={pokemon.key} xs={12} sm={6} md={4}>
                            <PokemonCard key={pokemon.key} id={pokemon.id} name={pokemon.name} />
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    count={10}
                    color="secondary"
                    className={classes.pagination}
                    page={page}
                    onChange={handlePageChange}
                />
            </Container>
        </div>
    );
}

export default PokemonList;