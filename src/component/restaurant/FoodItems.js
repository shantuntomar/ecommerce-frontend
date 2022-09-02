import React , {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import TextField from '@material-ui/core/TextField';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { green } from '@material-ui/core/colors';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {isEmpty , isAlphabets} from '../superadmin/Checks';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import renderHTML from 'react-render-html';
import {postDataAndImage} from '../../FetchNodeServices';
import swal from 'sweetalert';

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
        width: theme.spacing(10),
        height: theme.spacing(10),
    },

    input: {
        display: 'none',
    },
    
}));

function FoodItems(props) {
    const classes = useStyles();
    const paperStyle = {padding:20, width:1000 ,  margin:'50px auto', borderRadius:10,}
    const avtarStyle = {backgroundColor:'#ff6363'}
    const statusStyle ={marginTop:9, paddingRight:2,}

    // states of fetching the values !
    // console.log("PROPS" , props);

    const[restaurantId,setRestaurantId]=useState(props.restaurant.restaurant_id);
    const[foodTypeId,setFoodTypeId]=useState('');
    const[foodType,setFoodType]=useState('');
    const[foodTypeImage,setfoodTypeImage]=useState({bytes:'' , file:''})
    const[foodTypeAd , setFoodTypeAd] = useState('');
    const[status , setStatus] = useState('');
    const[foodAdImage,setFoodAdImage]=useState({bytes:'' , file:''})

    // checks state and snackbar states 
    const[errormsg , setErrorMsg] = useState('');
    const [open, setOpen] = React.useState(false);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };
      

    // data submit function 
    const foodItemsSubmit = async () => {
        var msg = "";
        var error = false;
        if (isEmpty(restaurantId)) {
            error = true;
            msg += "Restaurant Id Should Not Be Empty!<br>"
        }
        // if (isEmpty(foodTypeId)) {
        //     error = true;
        //     msg += "Food Type Id Should Not Be Empty!<br>"
        // }
        if (!isAlphabets(foodType)) {
            error = true;
            msg += "Food Type Must Contain Alphabets Only!<br>"
        }

        if(error){
            setErrorMsg(msg);
            setOpen(true);

        }

        if(!error){
                var formData = new FormData();
                formData.append('restaurant_id' , restaurantId);
                // formData.append('foodtype_id' , foodTypeId);
                formData.append('foodtype' , foodType);
                formData.append('foodtypeimage' , foodTypeImage.bytes);
                formData.append('foodtypead' , foodTypeAd);
                formData.append('status' , status)
                formData.append('foodtypeadimage' , foodAdImage.bytes);
            

            var config = { headers: { "content-type": "multipart/form-data" } }
            var res = await postDataAndImage("restaurant/addfooditems", formData);

            if(res.result){
                swal({
                    title: "Food Item Added Successfully",
                    icon: "success",
                    dangerMode: true,
                })
            }
            else{
                swal({
                    title: "Fail To Add Food Items",
                    icon: "warning",
                    dangerMode: true,
                })
            }
        }
        else{
            setOpen(true);
        }

        


    }
    
    return (
        <div>
            <Paper elevation={10} style={paperStyle} className='container'>
                <Grid align='center'>
                    <Avatar style={avtarStyle} className={classes.large}><FastfoodIcon style={{ fontSize: 40 }}/></Avatar>
                    <h2 style={{fontFamily: '-moz-initial' , color:'#ff6363'}}>FOOD ITEMS</h2>
                </Grid>
                <TextField value={restaurantId} disabled={true} style={{padding:9}} fullWidth id="outlined-basic" label="Restaurant Id" variant="outlined" onChange={(event)=>setRestaurantId(event.target.value)} required />

                {/* <TextField style={{padding:9}} fullWidth id="outlined-basic" label="Food Type Id" variant="outlined" onChange={(event)=>setFoodTypeId(event.target.value)} required/> */}

                <Grid container >
                    <Grid item xs={12} sm={10} >
                        <TextField style={{padding:5}} fullWidth id="outlined-basic" label="Food Type" variant="outlined" onChange={(event)=>setFoodType(event.target.value)} required/>
                    </Grid>

                    {/* image portion  */}
                    <Grid item xs={12} sm={2} style={{ display: 'flex', justifyContent: 'center',}} >
                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={(event)=>setfoodTypeImage({bytes:event.target.files[0] , file:URL.createObjectURL(event.target.files[0])})} />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera style={{marginTop:5}} />
                            </IconButton>
                        </label>
                        <Avatar variant='rounded' style={{ marginLeft: 10 , marginTop:10 }} src={foodTypeImage.file} alt="Remy Sharp"/>
                    </Grid>


                    <Grid item xs={12} sm={5} >
                        <TextField style={{padding:9}} fullWidth id="outlined-basic" label="Food Type Ad" onChange={(event)=>setFoodTypeAd(event.target.value)} variant="outlined" required/>
                    </Grid>

            
                    <Grid item xs={12} sm={5} >
                        <FormControl variant="outlined" className='container' style={statusStyle}>
                            <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                            <Select label="Status" onChange={(event)=>setStatus(event.target.value)}>
                                <MenuItem value={"Yes"}>YES</MenuItem>
                                <MenuItem value={"No"}>NO</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>


                    {/* image portion  */}
                    <Grid item xs={12} sm={2} style={{ display: 'flex', justifyContent: 'center',}} >
                        <input accept="image/*" className={classes.input} id="icon-button-foodAd" type="file" onChange={(event)=>setFoodAdImage({bytes:event.target.files[0] , file:URL.createObjectURL(event.target.files[0])})} />
                        <label htmlFor="icon-button-foodAd">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera style={{marginTop:5}} />
                            </IconButton>
                        </label>
                        <Avatar variant='rounded' style={{ marginLeft: 10 , marginTop:10 }} src={foodAdImage.file} alt="Remy Sharp"/>
                    </Grid>
                </Grid>
                <Button fullWidth onClick={()=>foodItemsSubmit()} variant="contained" style={{backgroundColor:'#ff6363' , color:'white'}}>Submit</Button>
            </Paper>

            {/* snack bar  */}
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="error">{renderHTML(errormsg)}</Alert>
            </Snackbar>

        </div>
    )
}

export default FoodItems


