//import logo from './logo.svg';
import './App.css';
import PropTypes, { elementType } from 'prop-types';
// hook use-...
import { useState, useEffect } from 'react';
import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const PokemonCard = ({ id, name }) => {
    return (
        <div>
            <Card>
                <CardMedia
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography>
                        This is a media card. You can use this section to describe the content.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" id={id}>
                        View
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

// Card.defaultProps = {
//     description: 'Brak opisu'
// }

// walidacja czy parametry zostaly przekazane w trybie developerskim
Card.propTypes = {
    name: PropTypes.string.isRequired,
}

const offers = [
    {
        id: 1,
        name: "Pokoje gościnne",
        address: "Zakopiańska, Wrocław",
        description: "Przykładowy opis",
        country: "Polska",
        cover: "https://picsum.photos/400"
    },
    {
        id: 2,
        name: "Hotel Kazimierz",
        address: "Lubelska, Kraków",
        country: "Polska",
        cover: "https://picsum.photos/400"
    },
    {
        id: 3,
        name: "Hostel pod górami",
        address: "Górska, Zakopane",
        country: "Polska",
        cover: "https://picsum.photos/400"
    }

]
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
    

    //const selectedOffer = '';

    //const [selectedOffer, setSelectedOffer] = useState('Cozy flat');
    const [apiData, setApiData] = useState([]);
    /**
     * useState
     * 0 - variable
     * 1 - callback
     */


    // useEffect(() => {
    //     setSelectedOffer('???')
    // }, []);
    /**
     * useEffect
     * 0 - callback
     * 1 - tablica zaleznosci
     */

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?offset=20&limit=9')
            .then(response => response.json())
            .then(data => {
                setApiData(data.results)
            })
    }, []);

    return (
        <div className="App">

            {apiData.map((elem) =>
                <PokemonCard
                    key={`offer-${elem.id}`}
                    //offerObj={elem}
                    name={elem.name}
                    id={elem.id}
                />
            )}


            <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {apiData.results.map((pok) => (
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
                </Container>
        </div>
            );
}

            export default PokemonList;