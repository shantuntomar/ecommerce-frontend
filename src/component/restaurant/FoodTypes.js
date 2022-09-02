import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
// import {isEmpty } from '../superadmin/Checks';
import {getData,postData ,  postDataAndImage} from '../../FetchNodeServices';
import swal from 'sweetalert';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import renderHTML from 'react-render-html';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
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
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    input: {
        display: 'none',
    },
}));

function FoodTypes(props) {
    const classes = useStyles();

    const paperStyle = { padding: 20, width: 1000, margin: '50px auto', borderRadius: 10, }
    const avtarStyle = { backgroundColor: '#2196f3' }
    const statusStyle = { marginTop: 9, paddingRight: 2, }

    // states for assiging the input values 
    const [restaurantid , setRestaurantId] = useState(props.restaurant.restaurant_id);
    const [foodtypeid , setFoodTypeId] = useState('');
    const [fooditem , setFoodItem] = useState('');
    const [foodtype , setFoodType] = useState('');
    const [foodimage , setFoodImage] = useState({bytes:'' , file:''});
    const [price , setPrice] = useState('');
    const [offer , setOffer] = useState('');
    const [offertype , setOfferType] = useState('');
    const [ingredients , setIngredients] = useState('');

    const[errormsg , setErrorMsg] = useState('');
    const [open, setOpen] = React.useState(false);

    const [food_type , setfoodtype] = useState();

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const fetchFoodItems = async () => {
        var body = {restaurant_id:props.restaurant.restaurant_id}
        var list = await postData("restaurant/listfooditemsbyrestaurant" , body);
        setfoodtype(list);

    } 

    // submit function 
    const foodTypeSubmit = async () => {
        var msg = "";
        var error = false;
        // if(isEmpty(restaurantid)){
        //     error = true;
        //     msg += "Restaurant Id Should Not Be Empty!<br>";
        // }
        // if(isEmpty(foodtypeid)){
        //     error = true;
        //     msg += "Food Type Id Should Not Be Empty!<br>";
        // }
        // if (!isAlphabets(fooditem)) {
        //     error = true;
        //     msg += "Food Item  Must Contain Alphabets Only!<br>"
        // }
        // if(isEmpty(price)){
        //     error = true;
        //     msg += "Price Should Not Be Empty!<br>";
        // }
        // if(isEmpty(offer)){
        //     error = true;
        //     msg += "Offer Should Not Be Empty!<br>";
        // }
        // if(isEmpty(offertype)){
        //     error = true;
        //     msg += "Offer Type  Should Not Be Empty!<br>";
        // }
        // if(isEmpty(ingredients)){
        //     error = true;
        //     msg += "Ingredients Should Not Be Empty!<br>";
        // }
        if(error){
            setErrorMsg(msg);
            setOpen(true);
        }
        if(!error){
            var formData = new FormData();

            formData.append('restaurantid' , restaurantid)
            // formData.append('foodtypeid' , foodtypeid)
            formData.append('fooditem' , fooditem)
            formData.append('foodtype' , foodtype)
            formData.append('foodimage' , foodimage.bytes)
            formData.append('price' , price)
            formData.append('offer' , offer)
            formData.append('offertype' , offertype)
            formData.append('ingredients' , ingredients)

            var config = { headers: { "content-type": "multipart/form-data" } }
            var res = await postDataAndImage("restaurant/addfoodtypes", formData , config);

            if(res.result){
                swal({
                    title: "Food Types Added Successfully",
                    icon: "success",
                    dangerMode: true,
                })
            }
            else{
                swal({
                    title: "Fail To Add Food Types",
                    icon: "warning",
                    dangerMode: true,
                })
            }
        }
        else{
            setOpen(true);
        }

    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    return (
        <div>
            <Paper elevation={10} style={paperStyle} className='container' >
                <Grid align='center'>
                    <Avatar style={avtarStyle} className={classes.large}><RestaurantIcon style={{ fontSize: 40 }} /></Avatar>
                    <h2 style={{ fontFamily: '-moz-initial', color: '#2196f3' }}>FOOD TYPES</h2>
                </Grid>
                <TextField style={{ padding: 9 }} value={restaurantid} disabled={true} onChange={(event)=>setRestaurantId(event.target.value)} fullWidth id="outlined-basic" label="Restaurant Id" variant="outlined" />
                <TextField style={{ padding: 9 }} onChange={(event)=>setFoodTypeId(event.target.value)} fullWidth id="outlined-basic" label="Type" variant="outlined" />

                <Grid container >
                    <Grid item xs={12} sm={5} >
                        <TextField style={{ padding: 9 }} onChange={(event)=>setFoodItem(event.target.value)} fullWidth id="outlined-basic" label="Food Item" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={5} >
                        {/* <TextField style={{padding:9}} fullWidth id="outlined-basic" label="Food Type" variant="outlined" /> */}
                        <FormControl variant="outlined" className='container' style={statusStyle}>
                            <InputLabel id="demo-simple-select-outlined-label">Food Type</InputLabel>
                            <Select label="Food Type" onChange={(event)=>setFoodType(event.target.value)} >
                                <MenuItem value={"Vegetarian"}>Vegetarian</MenuItem>
                                <MenuItem value={"Non-Vegetarian"}>Non-Vegetarian</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2} style={{ display: 'flex', justifyContent: 'center', }} >
                        <input accept="image/*" onChange={(event)=>setFoodImage({bytes:event.target.files[0] , file:URL.createObjectURL(event.target.files[0])})} className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera style={{ marginTop: 5 }} />
                            </IconButton>
                        </label>
                        <Avatar variant='rounded' src={foodimage.file} style={{ marginLeft: 10, marginTop: 10 }} alt="Remy Sharp" />
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={12} sm={4} >
                        <TextField style={{ padding: 9 }} onChange={(event)=>setPrice(event.target.value)} fullWidth id="outlined-basic" label="Price" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <TextField style={{ padding: 9 }} onChange={(event)=>setOffer(event.target.value)} fullWidth id="outlined-basic" label="Offer" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <TextField style={{ padding: 9 }} onChange={(event)=>setOfferType(event.target.value)} fullWidth id="outlined-basic" label="Offer Type" variant="outlined" />
                    </Grid>

                </Grid>
                <TextField style={{ padding: 9 }} onChange={(event)=>setIngredients(event.target.value)} fullWidth id="outlined-basic" label="Ingredients" variant="outlined" />
                <Button fullWidth variant="contained" onClick={()=>foodTypeSubmit()} style={{ backgroundColor: '#2196f3', color: 'white' }}>Submit</Button>

            </Paper>
            {/* snack bar  */}
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="error">{renderHTML(errormsg)}</Alert>
            </Snackbar>

        </div>
    )
}

export default FoodTypes
