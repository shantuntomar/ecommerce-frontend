import React, { useState } from 'react';
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
import { useSelector } from "react-redux"
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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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

export default function Header(props) {
    const classes = useStyles();
    const theme = useTheme();

    // drawer states 
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    // drawer code starts 
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const handleProceed = () => {

        props.history.replace({ pathname: '/signin' })

    }

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Paper elevation={5} style={{ textAlign: 'center', padding: 8, fontFamily: 'Barlow , sans-serif', margin: 5 }} >
                <h2>FOOD ITEMS &nbsp; ({keys.length})</h2>
            </Paper>

            <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} container spacing={1} >
                {showFood()}
            </Grid>

            <Paper elevation={5} style={{ textAlign: 'center', padding: 8, fontFamily: 'Barlow , sans-serif', margin: 5 }} >
                <h2>PAYMENT DETAIL</h2>
            </Paper>

            <Paper elevation={5} style={{ borderRadius: '10px', marginTop: 10 }}>
                <Grid container spacing={1}>
                    <Grid style={{}} item xs={6}>
                        <b>Total Amount:</b>
                    </Grid>
                    <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} item xs={6}>
                        MRP &#8377;&nbsp;<b>{totalamt}</b>
                    </Grid>
                    <Grid style={{}} item xs={6}>
                        <b>Total Saving:</b>
                    </Grid>
                    <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} item xs={6}>
                        MRP &#8377;&nbsp;<b>{totalsaving}</b>
                    </Grid>
                    <Grid style={{}} item xs={6}>
                        <b>Net Amount:</b>
                    </Grid>
                    <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} item xs={6}>
                        MRP &#8377;&nbsp;<b>{netamt}</b>
                    </Grid>
                </Grid>
            </Paper>
            <div style={{ display: 'flex', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={() => handleProceed()} fullWidth style={{ borderRadius: 10, margin: '10px', backgroundColor: '#ffa726', color: 'white' }} variant="contained" >Proceed</Button>
            </div>
        </div>
    );
    // drawer code ends

    // cards inside the drawer 
    const showFood = () => {
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


    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    var cart = useSelector(state => state.cart)
    var keys = Object.keys(cart)

    var restaurant = useSelector((state) => state.restaurant);

    // alert(restaurant)

    var rest = Object.values(restaurant)[0];

    // alert(restaurant.restaurant_name);

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

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton onClick={toggleDrawer('right', true)} aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={keys.length} color="secondary" >
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static" style={{ backgroundColor: '#ffa726' }} >
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>

                    {JSON.stringify(restaurant) != '{}' ? (

                        <div style={{}} className={classes.title} variant="h6" noWrap>
                            <div style={{ border: '4px solid white', borderRadius: 50, marginRight: 10 , marginTop:5 , marginBottom:5 }}>
                                <img style={{}} src={`${ServerURL}/images/${rest.logo}`} width='55' height='55' style={{ margin: 'auto', borderRadius: 50 }} />
                            </div>
                            <h5 style={{ marginTop: 10 }}>{rest.restaurant_name}</h5>
                        </div>

                    ) : (
                        <> </>
                    )}

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}

                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton onClick={toggleDrawer('right', true)} aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={keys.length} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}

            {/* drawer ui code  */}
            <div>
                <React.Fragment key={'right'}>
                    <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                        {list('right')}
                    </Drawer>
                </React.Fragment>
            </div>


        </div>

    );
}
