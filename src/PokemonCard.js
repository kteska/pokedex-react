import './App.css';
import { useState } from 'react';
import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
}));

const PokemonCard = ({ id, name, pokemonKey }) => {
    const classes = useStyles();
    const [pokemon, setPokemon] = useState([]);
    const [dialog, setDialog] = useState(false);

    const getPokemonInfo = async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json();
        setPokemon(data);
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
            <Card className={classes.card} key={pokemonKey} id={id} onClick={handleSelectClick}>
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

export default PokemonCard;