import React, { useState } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Grid from '@material-ui/core/Grid'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import { useSelector } from "react-redux"
import { ServerURL } from '../../FetchNodeServices';
import QtySpinner from './QtySpinner';
import TextField from '@material-ui/core/TextField';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Divider from '@material-ui/core/Divider';
import Header from './Header';
import StarSharpIcon from '@material-ui/icons/StarSharp';
import { Check } from '@material-ui/icons';
import { keys } from '@material-ui/core/styles/createBreakpoints';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


function Cart(props) {

    const classes = useStyles();
    const theme = useTheme();
    const [refresh, setRefresh] = useState(false);

    var dispatch = useDispatch();

    var cart = useSelector(state => state.cart)
    var keys = Object.keys(cart);
    var values = Object.values(cart);

    var totalamt = values.reduce(calculate, 0);
    var totalsaving = values.reduce(totalsaving, 0);

    function calculate(prev, item) {
        var price = (item.qtydemand * item.price)
        return (prev + price)

    }
    function totalsaving(prev, item) {
        var price = item.offer == 0 ? (item.offer) : (item.offer * item.qtydemand)
        return (prev + price)

    }

    var netamt = totalamt - totalsaving;

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

    
    const handleProceed = () => {
        
        props.history.push({ pathname: '/makepayment' })
    }

    const handleDelete = (item) => {
        
        dispatch({ type: "REMOVE_ITEM", payload: item.fooditem_id });
        setRefresh(!refresh);
    
    }

    const fetchCartFood = () => {

        return values.map((items) => {

            return (

                <Paper elevation={0} style={{ marginLeft: 10, marginRight: 10 }}>
                    <Card style={{ height: 230 }} className={classes.root}>
                        <CardMedia
                            className={classes.cover}
                            image={`${ServerURL}/images/${items.foodimage}`}
                            style={{ width: 250, height: 150, margin: 40, borderRadius: 0.5 }}
                        />

                        <div style={{ width: 200, height: 200 }} className={classes.details}>
                            <CardContent style={{ marginTop: 10 }} className={classes.content}>
                                <Grid container spacing={1} >
                                    <Grid item lg={12} xs={12} >
                                        <Typography style={{}} component="h5" variant="h5">
                                            <h4><b>{items.fooditem}</b></h4>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Typography style={{ marginTop: 20, color: 'green ' }} variant="subtitle1" color="textSecondary">
                                    <h5><b>MRP &#8377;</b>{(items.price - items.offer) * items.qtydemand}</h5>
                                </Typography>
                                <Typography style={{ marginTop: 5 }} variant="subtitle1" color="textSecondary">
                                    <h5>Quantity:{items.qtydemand}</h5>
                                </Typography>
                            </CardContent>
                        </div>
                        <div style={{ width: 250, textAlign: 'center', marginLeft: 100 }}>
                            <IconButton style={{}} aria-label="play/pause">
                                <DeleteOutlineIcon onClick={() => handleDelete(items)} style={{ cursor: 'pointer' }} className={classes.playIcon} />
                            </IconButton>
                            <Grid style={{ textAlign: 'center', marginTop: 50 }} container spacing={1} >
                                <Grid item style={{ marginTop: 50, marginLeft: 50, marginRight: 50, textAlign: 'center' }}>
                                    <QtySpinner value={items.qtydemand} onChange={(value) => handleChange(value, items)} />
                                </Grid >
                            </Grid>
                        </div>
                    </Card>
                    <Divider />
                </Paper>
            )
        })
    }


    const billingCard = () => {
        return (
            <div>
                <Container fluid style={{ marginTop:1}} >
                    <Row>
                        <Col>
                            <Paper style={{height: 150, margin: 30, width:600 ,borderRadius:5 }} elevation={1}>
                                <Grid  contaoner spacing={1} >
                                    <Grid style={{padding:5 , margin:5 , color:'#ffa726'}} item lg={12} >
                                        <b><h2 >Apply Coupon Here</h2></b>
                                    </Grid>
                                    <Grid style={{padding:5 , margin:5}} item lg={12} >
                                       <h5>Log in To See Best Offers !!</h5>
                                    </Grid>
                                    <Grid style={{padding:5 , margin:5}} item lg={12} >
                                       <h6>Currently Feature Is Not Availible </h6>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Col>
                    </Row>
                </Container>

                {/* billing code start  */}
                <Container fluid style={{}} >
                    <Row>
                        <Col>
                            <Paper style={{ height: 300, margin: 30, textAlign: 'center' }} elevation={2}>
                                <Grid style={{ marginTop: 20, borderRadius: 50 }} container >
                                    <Grid style={{ textAlign: 'center', color: 'gray', marginTop: 20 }} item lg={12} xs={12}>
                                        <h3>PRICE DETAILS </h3>
                                    </Grid>
                                </Grid>

                                <Divider style={{ backgroundColor: 'gray' }} />

                                <Grid container style={{ marginTop: 50 }} >
                                    <Grid style={{}} item lg={6} xs={6}>
                                        <Grid md={12} style={{ color: 'gray', margin: 15 }}>
                                            <h3>MRP:</h3>
                                        </Grid >
                                        <Grid style={{ color: 'gray', margin: 15 }}>
                                            <h3>Product Discount:</h3>
                                        </Grid >
                                        <Divider />
                                        <Grid style={{ color: 'gray', margin: 15 }}>
                                            <h3>Total Amount :</h3>
                                        </Grid >
                                    </Grid>
                                    <Grid style={{}} item lg={6} xs={6}>
                                        <Grid style={{ color: 'gray', margin: 15 }}>
                                            <h3> {totalamt}</h3>
                                        </Grid >
                                        <Grid style={{ color: 'green', margin: 15 }}>
                                            <h3>-{totalsaving}</h3>
                                        </Grid >
                                        <Divider />
                                        <Grid style={{ color: 'gray', margin: 15 }}>
                                            <h3> {netamt}</h3>
                                        </Grid >
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Col>
                    </Row>
                </Container>
                <Container style={{ padding: 5 }} >
                    <Row>
                        <Col>
                            <Button onClick={()=>handleProceed()} style={{ backgroundColor: '#ffa726', color: 'white', height: 50, width: 350, padding: 30 }} variant="contained" >
                                <h3 style={{ marginTop: 10 }}  >Proceed</h3 >
                            </Button>

                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    return (

        <div>
            <Header history={props.history} />

            <Paper elevation={0} style={{ textAlign: 'center', marginTop: 0, padding: 20, color: 'gray' }}>
                <div>
                    <h2>My Cart &nbsp;({keys.length})</h2>
                </div>
            </Paper>

            <Grid contsiner style={{ marginTop: 7 }} spacing={2} >
                <Grid item lg={6} style={{ marginLeft: 10, marginRight: 10, color: 'gray' }}>
                    <h2><b>Order Summary ({keys.length})</b></h2>
                </Grid>
            </Grid>

            <Grid container style={{}}>
                <Grid item lg={5} xs={12} style={{}}>
                    {fetchCartFood()}
                </Grid>
                <Grid item lg={7} xs={12} style={{ textAlign: 'center' }}>
                    {billingCard()}
                </Grid>
            </Grid>


        </div>
    )
}

export default Cart
