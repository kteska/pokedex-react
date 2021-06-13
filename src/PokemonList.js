import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import PokemonCard from './PokemonCard';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(4),
        },
    },
    icon: {
        marginRight: theme.spacing(2),
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
    }

    const getPokemons = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=6`)
        const data = await response.json();
        data.results.forEach(element => {
            element.id = element.url.split("/")[6];
            element.name = element.name.toUpperCase();
            element.key = element.url.split("/")[6];
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
                            <PokemonCard pokemonKey={pokemon.key} id={pokemon.id} name={pokemon.name} />
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