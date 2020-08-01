import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import { Box, Button } from '@material-ui/core';
import { Products } from 'store/types';
import { useDispatch } from 'react-redux';
import { addFavEffect, removeFavEffect } from 'store/effects/ProductEffets';
import styles from './ArticleItem.module.scss'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 307,
            borderRadius: 0,
            maxHeight: 590,
            boxShadow: 'none'

        },
        content: {
            paddingLeft: 32.8
        },
        media: {
            height: 157,
            width: 211,
            marginTop: 15, // 16:9
            marginLeft: 56,
            marginRight: 38.5
        },
        description: {
            fontSize: 17.8,
            marginTop: 5,
            marginBottom: 17
        },
        label: {
            fontSize: 11.8,
            lineHeight: '22px',
            color: '#9b9b9b'
        }
        ,
        value: {
            fontSize: 12,
            lineHeight: '22px',
            fontWeight: 300
        },
        button: {
            borderRadius: 0
        }

    }),
);
interface ArticleItemProps {
    products: Products
}
export default function ArticleItem(props: ArticleItemProps) {
    const { products } = props;
    const classes = useStyles();
    const dispatch = useDispatch();



    const handleFav = (id: number) => {
        dispatch(addFavEffect(id));
    }
    const handleFavRemove = (id: number) => {
        dispatch(removeFavEffect(id));
    }

    return (
        <Card className={styles.article}>
            <Box mt={20 / 8} ml={'32px'} mr={15 / 8} display={'flex'} justifyContent={'space-between'}>
                <Box display={'flex'}>{
                    [ 1, 2, 3, 4, 5
                    ].map((item: any) => <Box mr={'2px'}>
                        {item > 3 ? <img src={"/assets/unstar.svg"} /> : <img src={"/assets/star.svg"} />}
                    </Box>)

                }</Box>
                <Box color={'#bfbfbf'}>Арт. {products.code}</Box>
            </Box>
            <CardMedia
                className={styles.article_media}
                image={`/assets/${products.imgUrl}`}
                title="article"
            />
            <CardContent className={styles.article_content}>
                <Box display={'flex'}>
                    <img src={"/assets/check.svg"} />
                    <Box ml={'7.9px'} fontSize={'12.9'} color={'#81c03d'} >В наличии</Box>
                </Box>
                <Box className={styles.article_description}>
                    {products.title}
                </Box>
                <Box maxHeight={110}>
                    {
                        products.params.map((item: any) =>
                            <Box display={'flex'} mt={1}>
                                <Box className={styles.article_label}>{item.name} </Box>
                                <Box ml={1} className={styles.article_value}>{item.value}</Box>
                            </Box>)
                    }
                </Box>
                <Box fontSize={30} mb={1}>
                    49 999 pyб.
                </Box>
                <Box mb={1} color={'primary.main'}>
                    +490 бoнycoв
                </Box>
                <Box mt={1} display={'flex'} justifyContent={'space-between'}>
                    <Button className={styles.article_button}
                        color={'primary'}
                        variant={'contained'}
                        startIcon={<img src="/assets/cart.svg" />}>
                        Купить
                    </Button>
                    <Box display={'flex'} alignItems={'center'} >
                        <Box mr={10 / 6}>
                            <img src={products.inFav ? "/assets/favourite-active.svg" : "/assets/favourite-unactive.svg"} onClick={() => { products.inFav ? handleFavRemove(products.id) : handleFav(products.id) }} />
                        </Box>
                        <Box>
                            <img src={products.inComparsion ? "/assets/comparison.svg" : "/assets/comparison-unactive.jpg"} />
                        </Box>

                    </Box>
                </Box>

            </CardContent>
        </Card>
    );
}

