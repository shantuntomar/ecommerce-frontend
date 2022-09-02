import React from 'react'
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {  useDispatch ,useSelector } from "react-redux"
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { ServerURL } from '../../FetchNodeServices';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    list: {
        width: 550,
    },
    fullList: {
        width: 'auto',
    },
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
}));

function Demo() {
    const classes = useStyles();
    const theme = useTheme();

    var cart = useSelector(state => state.cart)
    var keys = Object.keys(cart)

    var values = Object.values(cart);

    return (
        <div>
            <Paper elevation={5} style={{ textAlign: 'center', padding: 8, fontFamily: 'Barlow , sans-serif', margin: 5 }} >
                <h2>FOOD ITEMS &nbsp; ({keys.length})</h2>
            </Paper>

            <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} container spacing={1} >
                {showFood()}
            </Grid>
        </div>
    )
    function showFood() {
        return values.map((items) => {
            return (
                <Card style={{ borderRadius: '12px', marginLeft: 20, margin: 5, borderRadius: 10, width: '100%' }} className={classes.root}>
                    <CardMedia
                        className={classes.cover}
                        image={`${ServerURL}/images/${items.foodimage}`}
                        title="Live from space album cover"
                    />
                    <div style={{ width: '70%' }} className={classes.details}>
                        <Grid container >
                            <Grid style={{}} item sm={9} >
                                <CardContent className={classes.content}>
                                    <Typography component="h5" variant="h5">
                                        {items.fooditem}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        <b>MRP &#8377;</b>{(items.price - items.offer) * items.qtydemand}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        Quantity:{items.qtydemand}
                                    </Typography>
                                </CardContent>
                            </Grid>
                            <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} item sm={3} >
                                <IconButton aria-label="play/pause">
                                    <DeleteOutlineIcon className={classes.playIcon} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </div>
                </Card>
            )
        })
    }
}

export default Demo
