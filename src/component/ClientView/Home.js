import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Header from './Header';
import { ServerURL, getData, postData } from '../../FetchNodeServices'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import QtySpinner from './QtySpinner';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useDispatch, useSelector } from "react-redux";
import Image from 'react-bootstrap/Image'
import { Restaurant } from '@material-ui/icons';
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));


function Home(props) {
    const classes = useStyles();


    const [foodType, setFoodTypes] = useState([]);
    const [foodItemList, setFoodItemList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [restaurant, setRestaurant] = useState('');

    var dispatch = useDispatch();

    const fetchFoodTypes = async (resid) => {

        var body = { restaurant_id: resid }
        var list = await postData("restaurant/listfooditemsbyrestaurant", body);
        setFoodTypes(list);
    }

    const fetchFooditems = async (typeid) => {

        var body = { foodtype_id: typeid }
        var list = await postData("restaurant/listfoodtypesbyfooditems", body);
        setFoodItemList(list);
    }

    const fetchFooditemsByOffer = async (resid) => {

        var body = {
            restaurant_id: resid,
        }
        var list = await postData("restaurant/listfoodtypesoffer", body);
        setFoodItemList(list);
    }

    const handleChange = (value, item) => {

        if (value == 0) {
            // item['qtydemand'] = value;
            dispatch({ type: 'REMOVE_ITEM', payload: item.foodtype_id })
            setRefresh(!refresh)


        }
        else {
            item['qtydemand'] = value;
            dispatch({ type: 'ADD_ITEM', payload: [item.foodtype_id, item] })
            setRefresh(!refresh)
        }

    }

    const displayFoodItem = () => {

        return foodItemList.map((item, index) => {

            return (

                <Card className={classes.root} style={{ margin: 10 }}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={`${ServerURL}/images/${item.foodimage}`}
                            title="Contemplative Reptile"
                            style={{ height: 200 }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                <b>{item.fooditem}</b>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.ingredients}
                            </Typography><br />

                            <div style={{ marginTop: -5 }}>

                                {/* <Typography variant="body2" color="textSecondary" component="p"> */}

                                {item.foodtype == "Vegetarian" ? (
                                    <img style={{ marginTop: -8 }} src='/veg.png' height='15' width='15' />
                                ) : (<img style={{ marginTop: -8 }} src='/nonveg.jpg' height='15' width='15' />)}

                                {/* </Typography><br /> */}

                            </div>

                            <Typography style={{ marginTop: 10 }} variant="body2" color="textSecondary" component="p">

                                {item.offer == 0 ? <b><span>MRP &#8377;{item.price} </span></b> :
                                    (
                                        <div>
                                            <b><div>MRP <s>&#8377;{item.price}</s> &#8377; {item.price - item.offer}  </div></b>
                                            <b><div style={{ color: '#52b202' }}>Save &#8377;{item.offer} </div></b>
                                        </div>

                                    )
                                }

                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <span style={{ color: '#b28900' }}>4/5</span>
                            </Typography>
                            <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} variant="body2" color="textSecondary" component="p">
                                <QtySpinner value={0} onChange={(value) => handleChange(value, item)} />
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

            )
        })

    }

    const showFoodTypes = () => {

        return foodType.map((item, index) => {

            return (

                <div>

                    <ListItemAvatar onClick={() => fetchFooditems(item.foodtype_id)} style={{ margin: '0px 30px', marginRight: 5, textAlign: 'center', cursor: 'pointer' }}>
                        <Image style={{}} src={`${ServerURL}/images/${item.foodimage}`} height='70' width='70' rounded />
                        <div style={{ color: '#ff6333' }}><b>{item.foodtype}</b></div>
                    </ListItemAvatar>

                    {/* paper code  */}

                    {/* <Paper elevation={0} style={{ width: 100, height: 90, margin: '0 auto', borderRadius: 15 }}>
                        <List className={classes.root} style={{ padding: 2, margin: 2 }} >
                            <ListItem style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} alignItems="flex-start" style={{ margin: 'auto' }} >
                                <ListItemAvatar style={{ marginRight: -5 }}>
                                    <Avatar style={{ marginTop: -20, cursor: 'pointer' }} alt="Remy Sharp" className={classes.large} src={`${ServerURL}/images/${item.foodimage}`} />
                                </ListItemAvatar>

                                <div style={{ marginTop: 45, marginLeft: -70 }} >
                                    <ListItemText
                                        primary={item.foodtype}
                                        secondary={''}
                                        onClick={() => fetchFooditems(item.foodtype_id)}
                                        style={{ cursor: 'pointer', width: 150, }}
                                    />
                                </div>

                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>
                    </Paper> */}

                </div>

            );


        });
    }

    const fetchById = async (resid) => {

        var body = {

            restaurant_id: resid
        }

        var list = await postData("restaurant/restaurantbyid", body);

        // alert(JSON.stringify(list));

        var list = list[0];

        dispatch({

            type: 'ADD_RES',
            payload: [list.restaurant_id, list]

        })

        setRestaurant(list[0]);
    }

    useEffect(function () {

        fetchFoodTypes(12);
        fetchById(12);
        fetchFooditemsByOffer(1);

    }, [])



    return (

        <div>

            <Header history={props.history} />

            <Grid container spacing={2} className='container-fluid' >
                <Grid item xs={12} style={{ marginTop: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {showFoodTypes()}
                    </div>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }} >
                        {displayFoodItem()}
                    </div>
                </Grid>
            </Grid>


        </div >
    )
}

export default Home
