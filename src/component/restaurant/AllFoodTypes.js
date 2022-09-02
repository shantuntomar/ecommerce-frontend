import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import { getData, ServerURL, postData, postDataAndImage } from '../../FetchNodeServices';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import TextField from '@material-ui/core/TextField';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { green } from '@material-ui/core/colors';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { isEmpty, isAlphabets } from '../superadmin/Checks';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import renderHTML from 'react-render-html';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },

    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },

    input: {
        display: 'none',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AllFoodTypes() {
    const classes = useStyles();

    const paperStyle = { padding: 20, width: 1000, margin: '50px auto', borderRadius: 10, }
    const avtarStyle = { backgroundColor: '#2196f3' }
    const statusStyle = { marginTop: 9, paddingRight: 2, }

    const [data, setData] = useState([]);
    const [dialogopen, setDialogOpen] = React.useState(false);
    const [restaurantid, setRestaurantId] = useState('');
    const [foodtypeid, setFoodTypeId] = useState('');
    const [fooditem, setFoodItem] = useState('');
    const [foodtype, setFoodType] = useState('');

    const [foodimage, setFoodImage] = useState({ bytes: '', file: '' });

    const [typefoodid, settypefoodid] = useState('');

    const [price, setPrice] = useState('');
    const [offer, setOffer] = useState('');
    const [offertype, setOfferType] = useState('');
    const [ingredients, setIngredients] = useState('');

    const [errormsg, setErrorMsg] = useState('');
    const [open, setOpen] = React.useState(false);
    const [btnFoodImage, setBtnFoodImage] = useState(false);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleSaveFoodImage = async () => {
        var formData = new FormData();
        formData.append("foodtype_id", foodtypeid);
        formData.append('foodimage', foodimage.bytes);

        var config = { headers: { "content-type": "multipart/form-data" } }
        var res = await postDataAndImage("restaurant/savefoodimage", formData, config);

        if (res.result) {
            swal({
                title: "Successfully Updated",
                icon: "success",
                dangerMode: true,
            })
        }
        else {
            swal({
                title: "Fail To Update",
                icon: "warning",
                dangerMode: true,
            })

        }
        setBtnFoodImage(false);

    }

    const handleFoodImage = (event) => {
        setFoodImage({
            bytes: event.target.files[0],
            file: URL.createObjectURL(event.target.files[0])
        });
        setBtnFoodImage(true);

    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };




    const fetchFoodType = async () => {
        var result = await getData('restaurant/listfoodtypes');
        setData(result);
    }

    useEffect(function () {
        fetchFoodType();
    }, [])

    const handleDialogClose = () => {
        refreshPage();
        setDialogOpen(false);
    };

    const refreshPage = () => {
        fetchFoodType();

    }

    const handleFinalSubmit = async () => {
        var msg = "";
        var error = false;
        if (isEmpty(restaurantid)) {
            error = true;
            msg += "Restaurant Id Should Not Be Empty!<br>";
        }
        if (isEmpty(foodtypeid)) {
            error = true;
            msg += "Food Type Id Should Not Be Empty!<br>";
        }
        if (!isAlphabets(fooditem)) {
            error = true;
            msg += "Food Item  Must Contain Alphabets Only!<br>"
        }
        if (isEmpty(price)) {
            error = true;
            msg += "Price Should Not Be Empty!<br>";
        }
        if (isEmpty(offer)) {
            error = true;
            msg += "Offer Should Not Be Empty!<br>";
        }
        if (isEmpty(offertype)) {
            error = true;
            msg += "Offer Type  Should Not Be Empty!<br>";
        }
        if (isEmpty(ingredients)) {
            error = true;
            msg += "Ingredients Should Not Be Empty!<br>";
        }
        if (error) {
            setErrorMsg(msg);
            setOpen(true);
        }

        if (!error) {
            var formData = new FormData();
            var body = {
                // fooditem_id: datafooditem_id,
                restaurant_id: restaurantid,
                food_id: foodtypeid,
                fooditem: fooditem,
                foodtype: foodtypeid,

                price: price,
                offer: offer,
                offertype: offertype,
                ingredients: ingredients,
            }

            var res = await postData('restaurant/editfoodtypes', body);
            if (res.result) {
                swal({
                    title: "Successfully Added",
                    icon: "success",
                    dangerMode: true,
                })
            }
            else {
                swal({
                    title: "Fail To Add Restaurant",
                    icon: "warning",
                    dangerMode: true,
                })

            }

        }
    }

    const handleDelete = async () => {
        var body = { "foodtype_id": typefoodid }
        var config = { headers: { "content-type": "multipart/form-data" } }
        var res = await postData("restaurant/deletefoodtypes", body);
        if (res.result) {
            swal({
                title: "Successfully Deleted",
                icon: "success",
                dangerMode: true,
            })
        }
        else {
            swal({
                title: "Fail To Delete",
                icon: "warning",
                dangerMode: true,
            })

        }
        setDialogOpen(false);
        refreshPage();
    }


    const displayDialog = (data) => {
        return (
            <div>
                <Dialog fullScreen open={dialogopen} onClose={handleDialogClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleDialogClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Food Types Details
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleFinalSubmit}>
                                Save
                            </Button>
                            <Button autoFocus color="inherit" onClick={handleDelete}>
                                Delete
                            </Button>
                        </Toolbar>
                    </AppBar>
                    {/* actual form  */}
                    <div>
                        <Paper elevation={10} style={paperStyle} className='container' >
                            <Grid align='center'>
                                <Avatar style={avtarStyle} className={classes.large}><RestaurantIcon style={{ fontSize: 40 }} /></Avatar>
                                <h2 style={{ fontFamily: '-moz-initial', color: '#2196f3' }}>FOOD TYPES</h2>
                            </Grid>
                            <TextField style={{ padding: 9 }} value={restaurantid} onChange={(event) => setRestaurantId(event.target.value)} fullWidth id="outlined-basic" label="Restaurant Id" variant="outlined" />
                            <TextField style={{ padding: 9 }} value={foodtypeid} onChange={(event) => setFoodTypeId(event.target.value)} fullWidth id="outlined-basic" label="Food Type Id" variant="outlined" />

                            <Grid container >
                                <Grid item xs={12} sm={5} >
                                    <TextField style={{ padding: 9 }} value={fooditem} onChange={(event) => setFoodItem(event.target.value)} fullWidth id="outlined-basic" label="Food Item" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={5} >
                                    {/* <TextField style={{padding:9}} fullWidth id="outlined-basic" label="Food Type" variant="outlined" /> */}
                                    <FormControl variant="outlined" className='container' style={statusStyle}>
                                        <InputLabel id="demo-simple-select-outlined-label">Food Type</InputLabel>
                                        <Select label="Food Type" value={foodtype} onChange={(event) => setFoodType(event.target.value)} >
                                            <MenuItem value={"Vegetarian"}>Vegetarian</MenuItem>
                                            <MenuItem value={"Non-Vegetarian"}>Non-Vegetarian</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={2} style={{ display: 'flex', justifyContent: 'center', }} >
                                    <input accept="image/*" onChange={(event) => handleFoodImage(event)} className={classes.input} id="icon-button-file" type="file" />
                                    <label htmlFor="icon-button-file">
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera style={{ marginTop: 5 }} />
                                        </IconButton>
                                    </label>
                                    <Avatar variant='rounded' src={foodimage.file} style={{ marginLeft: 10, marginTop: 10 }} alt="Remy Sharp" />
                                    {btnFoodImage ? <Button color='primary' style={{ padding: 5 }} onClick={() => handleSaveFoodImage()}>Save</Button> : <></>}
                                </Grid>
                            </Grid>
                            <Grid container >
                                <Grid item xs={12} sm={4} >
                                    <TextField style={{ padding: 9 }} value={price} onChange={(event) => setPrice(event.target.value)} fullWidth id="outlined-basic" label="Price"  />
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <TextField style={{ padding: 9 }} value={offer} onChange={(event) => setOffer(event.target.value)} fullWidth id="outlined-basic" label="Offer" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <TextField style={{ padding: 9 }} value={offertype} onChange={(event) => setOfferType(event.target.value)} fullWidth id="outlined-basic" label="Offer Type" variant="outlined" />
                                </Grid>

                            </Grid>
                            <TextField style={{ padding: 9 }} value={ingredients} onChange={(event) => setIngredients(event.target.value)} fullWidth id="outlined-basic" label="Ingredients" variant="outlined" />
                            {/* <Button fullWidth variant="contained" onClick={() => foodTypeSubmit()} style={{ backgroundColor: '#2196f3', color: 'white' }}>Submit</Button> */}

                        </Paper>
                        {/* snack bar  */}
                        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                            <Alert severity="error">{renderHTML(errormsg)}</Alert>
                        </Snackbar>

                    </div>




                </Dialog>
            </div>
        );
    }

    const foodTypeDialogopen = (data) => {

        settypefoodid(data.foodtype_id)
        setRestaurantId(data.restaurant_id);
        setFoodTypeId(data.food_id);
        setFoodItem(data.fooditem);
        setFoodType(data.foodtype);

        setFoodImage({ bytes: '', file: `${ServerURL}/images/${data.foodimage}` })

        setPrice(data.price)
        setOffer(data.offer)

        setOfferType(data.offertype)
        setIngredients(data.ingredients)

        setDialogOpen(true)


    }


    return (
        <div className={classes.root} className='container mt-5'>
            <Paper elevation={10} >
                <MaterialTable
                    title="Simple Action Preview"
                    columns={[
                        { title: 'RestaurantId', field: 'restaurant_id' },
                        {
                            title: 'Food Id', field: 'food_id', render: rowData =>
                                <div style={{ flexDirection: 'column' }}>
                                    <div><b>{rowData.food_id}</b></div>
                                    <div>{rowData.fooditem}</div>
                                </div>
                        },
                        {
                            title: 'Food Type', field: 'foodtype', render: rowData =>
                                <div style={{ flexDirection: 'column' }}>
                                    <div><b>{rowData.foodtype}</b></div>
                                </div>
                        },
                        {
                            title: 'Offer/Offer Type', field: 'foodtype', render: rowData =>
                                <div style={{ flexDirection: 'column' }}>
                                    <div><b>{rowData.offer}</b></div>
                                    <div>{rowData.offertype}</div>
                                </div>
                        },
                        {
                            title: 'Price', field: 'foodtype', render: rowData =>
                                <div style={{ flexDirection: 'column' }}>
                                    <div><b>{rowData.price}</b></div>

                                </div>
                        },
                        {
                            title: 'Food Image', field: 'foodtype', render: rowData =>
                                <div>
                                    <img src={`${ServerURL}/images/${rowData.foodimage}`} width='60' height='60' />
                                </div>
                        },

                    ]}
                    data={data}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit/Delete',
                            onClick: (event, rowData) => foodTypeDialogopen(rowData)
                        }
                    ]}
                />

            </Paper>
            {displayDialog()}

        </div>
    )
}

export default AllFoodTypes
