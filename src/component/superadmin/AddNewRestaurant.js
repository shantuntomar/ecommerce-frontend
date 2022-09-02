import React, { useState, useEffect } from 'react'
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Button from "@material-ui/core/Button";
import swal from 'sweetalert';
import { getData, postData, postDataAndImage } from '../../FetchNodeServices';
import Snackbar from '@material-ui/core/Snackbar';
// import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { isEmpty, isAlphabets } from './Checks';
import renderHTML from "react-render-html";
var otpGenerator = require('otp-generator');


// css in react 
const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        padding: 10,

    },

    subdiv: {
        margin: 'auto',
        width: 1000,
        padding: 9,
        marginTop: 40,
    },

    formControl: {
        // margin: theme.spacing(1),
        minWidth: 496,
    },

    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },

    formControlState: {
        width: 327,
    },

    Myfirstgrid: {
        boxShadow: "0px 0px 20px 8px #9E9E9E ",
    },

    input: {
        display: 'none',
    }
}));

// Main Component 
export default function AddNewRestaurant(props) {
    
    const classes = useStyle();
    const [open, setOpen] = React.useState(false);
    // states of images 
    const [shopActImage, setShopActImage] = useState({ bytes: '', file: '/no_image.jpg' });
    const [idProofImage, setidProofImage] = useState({ bytes: '', file: '/no_image.jpg' });
    const [fssaiImage, setfssaiImage] = useState({ bytes: '', file: '/no_image.jpg' });
    const [logoImage, setlogoImage] = useState({ bytes: '', file: '/no_image.jpg' });

    const [getState, setState] = useState([]);
    const [getCity, setCity] = useState([]);
    
    const [errorMessage, setErrorMessage] = useState('');

    // states for storing labels name 
    const [restaurantName, setRestaurantName] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [address, setAddress] = useState('')
    const [stateId, setStateId] = useState('')
    const [cityId, setCityId] = useState('')
    const [zipcode, setZipCode] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [MobileNumber, setMobileNumber] = useState('')
    const [type, setType] = useState('')

    const [id, setId] = useState('')

    const [gst, setGst] = useState('')
    const [fssai, setfssai] = useState('')
    const [shopAct, setShopAct] = useState('')
    const [location, setLocation] = useState('')
    const [status, setStatus] = useState('')

    // useEffect function 
    const fetchState = async () => {
        var list = await getData("statecity/fetchstates");
        setState(list);
    }
    // useEffect calling 
    useEffect(function () {
        fetchState();
    },[])

    // function for fetch the state from node (component / result )
    const fillState = () => {
        return (
            getState.map((item, index) => {
                return (
                    <MenuItem value={item.stateid}>{item.statename}</MenuItem>
                )
            })
        )
    }

    const handleClose = ()=>{
        setOpen(false);
    }

    const handleStateChange = async (event) => {
        // alert(event.target.value);
        setStateId(event.target.value);
        var body = { stateid: event.target.value}
        var list = await postData('statecity/fetchcities', body)
        setCity(list);
    }

    const fillCity = () => {
        return (
            getCity.map((item, index) => {
                return (
                    <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
                )

            })
        )

    }

    // code for saving images 
    const handleLogo = (event) => {
        setlogoImage({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) });
    }

    // handleSubmit with otp
    const handleSubmit = async () => {

        var msg = "";
        var error = false;
        if (isEmpty(restaurantName)) {
            error = true;
            msg += "Restaurant Name Should Not Be Empty!<br>"
        }
        if (isEmpty(ownerName)) {
            error = true;
            msg += "Owner Name Should Not Be Empty!<br>"
        }
        if (!isAlphabets(ownerName)) {
            error = true;
            msg += "Owner Name Must Contain Alphabets Only!<br>"
        }

        if (error) {
            setErrorMessage(msg);
            setOpen(true);
        }


        if (!error) {
            var password = otpGenerator.generate(6, { upperCase: false, specialChars: false });
            //submit the record 
            var formData = new FormData();

            formData.append('restaurant_name', restaurantName);
            formData.append('owner_name', ownerName);
            formData.append('address', address);
            formData.append('state', stateId);
            formData.append('city', cityId);
            formData.append('zipcode', zipcode);
            formData.append('location', location);
            formData.append('emailaddress', emailAddress);
            formData.append('mobilenumber', MobileNumber);
            formData.append('type', type);

            formData.append('idproof', id);

            formData.append('idproofimage', idProofImage.bytes);
            formData.append('shopact', shopAct);
            formData.append('shopactimage', shopActImage.bytes);
            formData.append('fssai', fssai);
            formData.append('fssaiimage', fssaiImage.bytes);
            formData.append('gst', gst);
            formData.append('status', status);
            formData.append('logo', logoImage.bytes);
            formData.append('password', password);

            var config = { headers: { "content-type": "multipart/form-data" } }
            var res = await postDataAndImage("restaurant/addnewrestaurant", formData, config);
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
        else {
            setOpen(true);

        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1} className={classes.Myfirstgrid}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Restaurent Name" variant="outlined" onChange={(event) => setRestaurantName(event.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth label="Owner Name" variant="outlined" onChange={(event) => setOwnerName(event.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth label="Address" variant="outlined" onChange={(event) => setAddress(event.target.value)} />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        {/* <TextField fullWidth label="State" variant="outlined" /> */}
                        <FormControl variant="outlined" className={classes.formControlState}>
                            <InputLabel>State</InputLabel>
                            <Select label="State" onChange={(event) => handleStateChange(event)}>
                                {fillState()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        {/* <TextField fullWidth label="City" variant="outlined" /> */}
                        <FormControl variant="outlined" className={classes.formControlState}>
                            <InputLabel>City</InputLabel>
                            <Select label="City" onChange={(event) => setCityId(event.target.value)}>
                                {fillCity()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth label="Zip Code" variant="outlined" onChange={(event) => setZipCode(event.target.value)} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Email" variant="outlined" onChange={(event) => setEmailAddress(event.target.value)} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Phone" variant="outlined" onChange={(event) => setMobileNumber(event.target.value)} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Location" variant="outlined" onChange={(event) => setLocation(event.target.value)} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {/* <TextField fullWidth label="Type" variant="outlined" /> */}
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Type</InputLabel>
                            <Select label="Type" onChange={(event) => setType(event.target.value)}>
                                <MenuItem value={"Indian"}>Indian</MenuItem>
                                <MenuItem value={"South Indian"}>South Indian</MenuItem>
                                <MenuItem value={"Chinese"}>Chinese</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Id Proof" variant="outlined" onChange={(event) => setId(event.target.value)} />
                    </Grid>

                    <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', }}>
                        <input accept="image/*" className={classes.input} id="icon-button-id" onChange={(event) => setidProofImage({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })} type="file" />
                        <label htmlFor="icon-button-id">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        <Avatar variant='rounded' style={{ marginLeft: 10 }} alt="Remy Sharp" src={idProofImage.file} className={classes.large} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Shop Act/Company" variant="outlined" onChange={(event) => setShopAct(event.target.value)} />
                    </Grid>

                    <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', }}>
                        <input accept="image/*" className={classes.input} id="icon-button-shop" onChange={(event) => setShopActImage({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })} type="file" />
                        <label htmlFor="icon-button-shop">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        <Avatar variant='rounded' style={{ marginLeft: 10 }} alt="Remy Sharp" src={shopActImage.file} className={classes.large} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Fssai" variant="outlined" onChange={(event) => setfssai(event.target.value)} />
                    </Grid>

                    <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', }}>
                        <input accept="image/*" className={classes.input} id="icon-button-fssai" onChange={(event) => setfssaiImage({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })} type="file" />
                        <label htmlFor="icon-button-fssai">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        <Avatar variant='rounded' style={{ marginLeft: 10 }} alt="Remy Sharp" src={fssaiImage.file} className={classes.large} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Status</InputLabel>
                            <Select label="Status" onChange={(event) => setStatus(event.target.value)}>
                                <MenuItem value={"Active"}>Active</MenuItem>
                                <MenuItem value={"Deactive"}>Deactive</MenuItem>
                                <MenuItem value={"Pending"}>Pending</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>

                    <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', }}>
                        <input accept="image/*" className={classes.input} id="icon-button-logo" onChange={(event) => handleLogo(event)} type="file" />
                        <label htmlFor="icon-button-logo">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        <Avatar variant='rounded' style={{ marginLeft: 10 }} alt="Remy Sharp" src={logoImage.file} className={classes.large} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth label="GST" variant="outlined" onChange={(event) => setGst(event.target.value)} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button onClick={() => handleSubmit()} variant="contained" color="primary" fullWidth>Submit</Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="secondary" fullWidth>Reset</Button>
                    </Grid>

                </Grid>

            </div>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                //onClose={handleClose}
                message={renderHTML(errorMessage)}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />



        </div>
    )


}

