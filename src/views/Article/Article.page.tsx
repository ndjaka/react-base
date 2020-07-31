import React from 'react'
import { makeStyles, Container } from '@material-ui/core'
import { Grid } from '@material-ui/core';
import { ArticleList, Filters } from './components';
import { createStyles } from '@material-ui/core';
import { loadProductEffects } from 'store/effects/ProductEffets';
import { useCallback } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { ApplicationState } from 'store/types';
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1.8),
        },
    }),
);

export default function Article() {

    const classes = useStyles();
    const dispatch = useDispatch()
  
    const loadData = useCallback(
        () => {
            dispatch(loadProductEffects());
        },
        [dispatch]
    )

    React.useEffect(() => {
        loadData()

    }, [loadData])

    return (

        <Container maxWidth={'lg'} className={classes.root} >
            <Grid container >
                <Grid item lg={9}>
                    <ArticleList  />
                </Grid>
                <Grid item lg={3}>
                    <Filters  loadData={loadData}/>
                </Grid>
            </Grid>
        </Container>
    )
}
