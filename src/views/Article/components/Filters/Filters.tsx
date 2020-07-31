import React, { useCallback } from 'react'
import { createStyles, Card, CardContent, Checkbox, FormControlLabel } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Box, Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { filterEffects } from 'store/effects/ProductEffets';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 308.1,
            borderRadius: 0,
            /*  maxHeight: 325, */
            boxShadow: 'none',
            marginTop: '30px 28.9px 0 28.1px',

        },
        button: {
            borderRadius: 0
        },
        secondButton: {
            borderRadius: 0,
            background: theme.palette.secondary.light,
            color: '#333333'
        },
        content: {
            margin: 0
        },
        value: {
            fontSize: 12,
            lineHeight: '22px',
            fontWeight: 300
        },

    }),
);


interface dataStructure {

    id: number,
    name: string,
    checked: boolean,

}
const data: dataStructure[] = [
    {
        id: 0,
        name: 'Canon',
        checked: false,
    },
    {
        id: 1,
        name: 'Olympus',
        checked: false,

    },
    {
        id: 2,
        checked: false,
        name: 'Fujifilm',
    },
    {
        id: 3,
        checked: false,
        name: 'Pentax',
    },
    {
        id: 4,
        checked: false,
        name: 'Nikon',
    },
    {
        id: 5,
        checked: false,
        name: 'Sigma',
    },
    {
        id: 6,
        checked: false,
        name: 'Panasonic',
    },

    {
        id: 7,
        checked: false,
        name: 'Geleral Electrics',
    },
    {
        id: 8,
        checked: false,
        name: 'Leica',
    },
    {
        id: 9,
        checked: false,
        name: 'Zenit',
    },
]



export default function Filters(props: any) {
    const { loadData } = props
    const [dataFilter, setDataFilTer] = React.useState(data);
    const dispatch = useDispatch();
    const loadDataFiltering = useCallback(
        () => {
            dispatch(filterEffects());
        },
        [dispatch]
    )
    React.useEffect(() => {
        loadDataFiltering()

    }, [loadDataFiltering])

    const handleItemToFilter = (Item: dataStructure) => {
        if (Item.checked === false) {
            setDataFilTer(dataFilter.map((item) => item.id === Item.id ? { ...item, checked: true } : item));
            loadDataFiltering();
        } else {
            setDataFilTer(dataFilter.map((item) => item.id === Item.id ? { ...item, checked: false } : item));
        }

    }


    React.useEffect(() => {
        let isChecked: boolean = false;
        dataFilter.forEach((item: dataStructure) => {
            if (item.checked) {
                isChecked = true;
            }
        })
        if (isChecked === false) {
            loadData();
        }

    }, [dataFilter])




    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Box>
                    <Button className={classes.button}
                        fullWidth
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => loadData()}
                    >Показать результат
                </Button>
                </Box>
                <Box mt={10 / 8}>
                    <Button className={classes.secondButton}
                        fullWidth
                        color={'secondary'}
                        variant={'contained'}
                    >Очистить фильтр
                </Button>
                </Box>
                <Box mt={1}>
                    <Box fontSize={17} maxHeight={42}>
                        Производитель
                    </Box>
                    <Box>
                        <Grid container >
                            {
                                dataFilter.map((item: any) => < Grid item sm={6} md={6} xs={6} spacing={0}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={item.checked}
                                                onChange={(e: any) => handleItemToFilter(item)}
                                                color="primary"
                                            />
                                        }
                                        label={<Box className={classes.value}>{item.name}</Box>}
                                    />
                                </Grid>)
                            }

                        </Grid>
                    </Box>
                </Box>
            </CardContent>
        </Card >
    )
}
