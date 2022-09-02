import React from 'react'
import './LocalDesign.css';
import Grid from '@material-ui/core/Grid';
import Image from 'react-bootstrap/Image';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function MyHome() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const showFoodCards = () => {

        return (

            <div>

                <Card style={{ margin: 20 }} className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="food1.jpg"
                            style={{ margin: 10, borderRadius: 5 }}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                Masala Dosa
                                </Typography>
                            <div>

                            </div>

                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Share
                        </Button>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>

            </div>
        )
    }

    const showDialog = () => {

        return (

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar style={{ backgroundColor: '#ffa726' }} className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Menu
                        </Typography>
                        <Button autoFocus color="inherit">
                            <AddShoppingCartIcon />
                        </Button>
                    </Toolbar>
                </AppBar>
                <div>
                    {showFoodCards()}
                    {showFoodCards()}
                    {showFoodCards()}
                </div>

            </Dialog>

        )
    }

    return (

        <div style={{ backgroundImage: "url(image2.jpg)", backgroundRepeat: 'no-repeat', backgroundSize: 'cover', textAlign: 'center' }}>

            <div style={{ height: '100vh', background: "linear-gradient(rgba(0,0,0,0.45) , rgba(0,0,0,0.45))" }}>
                <Grid container spacing={1}>
                    <Grid style={{ textAlign: 'center', marginTop: 100 }} item xs={12} lg={12}>
                        <Image style={{ border: '5px solid white ' }} src="food.jpg" width='140' height='140' roundedCircle />
                    </Grid>
                    <Grid style={{ textAlign: 'center', color: 'white', marginTop: 20 }} item xs={12}>
                        <h3>Royal Palace</h3>
                    </Grid>
                    <Grid style={{ textAlign: 'center', marginTop: 20 }} item xs={12}>
                        <Button onClick={() => handleClickOpen()} style={{ backgroundColor: '#ffa726' }} variant='contained'>
                            Explore Menu
                        </Button>
                    </Grid>
                    {showDialog()}
                </Grid>
            </div>





        </div>
    )
}

export default MyHome
