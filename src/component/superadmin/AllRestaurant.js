import React, { useEffect, useState } from 'react'
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import swal from 'sweetalert';
import { getData, ServerURL, postData, postDataAndImage } from '../../FetchNodeServices';
import Snackbar from '@material-ui/core/Snackbar';
// import IconButton from '@material-ui/core/IconButton';
import { isEmpty, isAlphabets } from './Checks';
import renderHTML from "react-render-html";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './AllRestaurant.css';
import MaterialTable from "material-table";
import './AllRestaurant.css';
var otpGenerator = require('otp-generator');

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AllRestaurant() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    // staes of forms 
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
    const [getState, setState] = useState([]);
    const [getCity, setCity] = useState([]);

    // const [restaurantId , setRestaurantId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [shopActImage, setShopActImage] = useState({ bytes: '', file: '/no_image.jpg' });
    const [idProofImage, setidProofImage] = useState({ bytes: '', file: '/no_image.jpg' });
    const [fssaiImage, setfssaiImage] = useState({ bytes: '', file: '/no_image.jpg' });
    const [logoImage, setlogoImage] = useState({ bytes: '', file: '/no_image.jpg' });

    // staes for storing data 
    const [getRowData, setRowData] = useState([]);

    // cancel and save buttons states for images 
    const [btnIdProof, setBtnIdProof] = useState(false);
    const [btnShopAct , setBtnShopAct] = useState(false);
    const [btnFssai , setBtnFssai] = useState(false);
    const [btnLogo , setBtnLogo] = useState(false);


    const handleStateChange = async (event) => {
        setStateId(event.target.value);
        fetchcities(event.target.value);
    }

    const fetchcities = async (stateid) => {
        var body = { stateid: stateid };
        var list = await postData("statecity/fetchcities", body);
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

    const fillState = () => {
        return (
            getState.map((item, index) => {
                return (
                    <MenuItem value={item.stateid}>{item.statename}</MenuItem>
                )
            })
        )
    }

    const handleClose = () => {
        setOpen(false);
    }

    // code for saving images 
    const handleLogo = (event) => {
            setlogoImage({ 
            bytes: event.target.files[0],
            file: URL.createObjectURL(event.target.files[0]) 
        });
        setBtnLogo(true);
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
            // var password = otpGenerator.generate(6, { upperCase: false, specialChars: false });
            //submit the record 
            var formData = new FormData();
            var body = {

                restaurant_id: getRowData.restaurant_id,
                restaurant_name: restaurantName,
                owner_name: ownerName,
                address: address,
                state: stateId,
                city: cityId,
                zipcode: zipcode,
                location: location,
                emailaddress: emailAddress,
                mobilenumber: MobileNumber,
                type: type,
                Idproof: id,
                shopact: shopAct,
                fssai: fssai,
                gst: gst,
                status: status,
            }

            // var config = { headers: { "content-type": "multipart/form-data" } }
            var res = await postData("restaurant/editrestaurant", body);

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
            handleRefresh()

        }

        else {
            setOpen(true);

        }
    }




    // states of appbar 
    const [dialogopen, setDialogOpen] = React.useState(false);

    // function of appbar 
    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    // function for delete the restaurant
    const handleDelete = async () => {
        var body = { "restaurantid": getRowData.restaurant_id }
        var config = { headers: { "content-type": "multipart/form-data" } }
        var res = await postData("restaurant/deleterestaurant", body);
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
        handleRefresh();

    }

    // function for refresh the page 
    const handleRefresh = () => {
        
        setDialogOpen(false);
        fetchRestaurant();
    }


    // code for saving the images 
    const handleSaveIdProofImage = async () => {
        var formData = new FormData();
        formData.append("restaurantid", getRowData.restaurant_id);
        formData.append('idproofimage', idProofImage.bytes);
        var config = { headers: { "content-type": "multipart/form-data" } }
        var res = await postDataAndImage("restaurant/updateIdProofImage", formData, config);
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
        setBtnIdProof(false);



    }

    // code for saving the shopact image 
    const handleSaveShopActImage = async () => {
        var formData = new FormData();
        formData.append("restaurantid", getRowData.restaurant_id);
        formData.append('shopactimage', shopActImage.bytes);
        var config = { headers: { "content-type": "multipart/form-data" } }
        var res = await postDataAndImage("restaurant/updateShopActImage", formData, config);
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
        setBtnShopAct(false);
    }

    // handling images 
    const handleIdProof = (event) => {
        setidProofImage({
            bytes: event.target.files[0],
            file: URL.createObjectURL(event.target.files[0])
        });
        setBtnIdProof(true);

    }

    // handling shop act details 
    const handleShopAct = (event) => {
        setShopActImage({
            bytes: event.target.files[0],
            file: URL.createObjectURL(event.target.files[0]) 
        });
        setBtnShopAct(true);
    }

    // handling fssai images 
    const handleFssai = (event) => {
        setfssaiImage({ 
            bytes: event.target.files[0],
            file: URL.createObjectURL(event.target.files[0]) 
        });
        setBtnFssai(true);
    }



    // code for saving fssai image 
    const handleFssaiImage = async () => {
        var formData = new FormData();
        formData.append("restaurantid", getRowData.restaurant_id);
        formData.append('fssaiimage', fssaiImage.bytes);
        var config = { headers: { "content-type": "multipart/form-data" } }
        var res = await postDataAndImage("restaurant/updateFssaiImage", formData, config);
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
        setBtnFssai(false);
    }

    // code for saving fssai image 
    const handleLogoImage = async () => {
        var formData = new FormData();
        formData.append("restaurantid", getRowData.restaurant_id);
        formData.append('logo', logoImage.bytes);
        var config = { headers: { "content-type": "multipart/form-data" } }
        var res = await postDataAndImage("restaurant/updateLogoImage", formData, config);
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
        setBtnLogo(false);
    }





    // state that fetch the data from database as an json format 
    const [list, setList] = useState([]);

    const fetchRestaurant = async () => {
        // call the node program and fetch the data 
        var result = await getData('restaurant/listrestaurant');
        // setting the data in list  
        setList(result);
    }

    useEffect(function () {
        // it simply call this method 
        fetchRestaurant();
    },[])

    const handleDialogOpen = (data) => {

        setShopActImage({ bytes: '', file: `${ServerURL}/images/${data.shopactimage}` })
        setidProofImage({ bytes: '', file: `${ServerURL}/images/${data.idproofimage}` })
        setfssaiImage({ bytes: '', file: `${ServerURL}/images/${data.fssaiimage}` })
        setlogoImage({ bytes: '', file: `${ServerURL}/images/${data.logo}` })
        // states for changing the value of form 
        setRestaurantName(data.restaurant_name);
        setOwnerName(data.owner_name);
        setAddress(data.address)
        setStateId(data.state)
        setCityId(data.city)
        setZipCode(data.zipcode);
        setEmailAddress(data.emailaddress)
        setMobileNumber(data.mobilenumber);
        setLocation(data.location);
        setType(data.type)
        setId(data.idproof)
        setGst(data.gst)
        setShopAct(data.shopact);
        setfssai(data.fssai);
        setStatus(data.status);
        fetchcities(data.state);
        
        setDialogOpen(true);
        setRowData(data);

    }

    const showDialogBox = (data) => {
        // it returns a view 
        return (
            <div>
                <Dialog fullScreen open={dialogopen} onClose={handleDialogClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleRefresh} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Restaurant Details
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleSubmit}>
                                Save
                            </Button>
                            <Button autoFocus color="inherit" onClick={handleDelete}>
                                Delete
                            </Button>
                        </Toolbar>
                    </AppBar>
                    {/* actual form starts  */}
                    <div className={classes.root}>
                        <div className={classes.subdiv}>
                            <Grid container spacing={1} className={classes.Myfirstgrid}>
                                <Grid item xs={12}>
                                    <TextField fullWidth value={restaurantName} label="Restaurent Name" variant="outlined" onChange={(event) => setRestaurantName(event.target.value)} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField fullWidth value={ownerName} label="Owner Name" variant="outlined" onChange={(event) => setOwnerName(event.target.value)} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField fullWidth value={address} label="Address" variant="outlined" onChange={(event) => setAddress(event.target.value)} />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    {/* <TextField fullWidth label="State" variant="outlined" /> */}
                                    <FormControl variant="outlined" className={classes.formControlState}>
                                        <InputLabel>State</InputLabel>
                                        <Select label="State" value={stateId} onChange={(event) => handleStateChange(event)}>
                                            {fillState()}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    {/* <TextField fullWidth label="City" variant="outlined" /> */}
                                    <FormControl variant="outlined" className={classes.formControlState}>
                                        <InputLabel>City</InputLabel>
                                        <Select label="City" value={cityId} onChange={(event) => setCityId(event.target.value)}>
                                            {fillCity()}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField fullWidth value={zipcode} label="Zip Code" variant="outlined" onChange={(event) => setZipCode(event.target.value)} />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth value={emailAddress} label="Email" variant="outlined" onChange={(event) => setEmailAddress(event.target.value)} />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth value={MobileNumber} label="Phone" variant="outlined" onChange={(event) => setMobileNumber(event.target.value)} />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth value={location} label="Location" variant="outlined" onChange={(event) => setLocation(event.target.value)} />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    {/* <TextField fullWidth label="Type" variant="outlined" /> */}
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel>Type</InputLabel>
                                        <Select label="Type" value={type} onChange={(event) => setType(event.target.value)}>
                                            <MenuItem value={"Indian"}>Indian</MenuItem>
                                            <MenuItem value={"South Indian"}>South Indian</MenuItem>
                                            <MenuItem value={"Chinese"}>Chinese</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth value={id} label="Id Proof" variant="outlined" onChange={(event) => setId(event.target.value)} />
                                </Grid>


                                {/* idproof images  */}
                                <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', }}>
                                    <input accept="image/*" className={classes.input} id="icon-button-id" onChange={(event) => handleIdProof(event)} type="file" />
                                    <label htmlFor="icon-button-id">
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                    </label>
                                    <Avatar variant='rounded' style={{ marginLeft: 10 }} alt="Remy Sharp" src={idProofImage.file} className={classes.large} />
                                    {btnIdProof ? <Button color='primary' style={{ padding: 5 }} onClick={() => handleSaveIdProofImage()}>Save</Button> : <></>}
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth value={shopAct} label="Shop Act/Company" variant="outlined" onChange={(event) => setShopAct(event.target.value)} />
                                </Grid>

                                {/* shopact images  */}
                                <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', }}>
                                    <input accept="image/*" className={classes.input} id="icon-button-shop" onChange={(event) => handleShopAct(event)} type="file" />
                                    <label htmlFor="icon-button-shop">
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                    </label>
                                    <Avatar variant='rounded' style={{ marginLeft: 10 }} alt="Remy Sharp" src={shopActImage.file} className={classes.large} />
                                    {btnShopAct ? <Button color='primary' style={{ padding: 5 }} onClick={() => handleSaveShopActImage()}>Save</Button> : <></>}
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth value={fssai} label="Fssai" variant="outlined" onChange={(event) => setfssai(event.target.value)} />
                                </Grid>

                                {/* fssai image  */}
                                <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', }}>
                                    <input accept="image/*" className={classes.input} id="icon-button-fssai" onChange={(event) => handleFssai(event)} type="file" />
                                    <label htmlFor="icon-button-fssai">
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                    </label>
                                    <Avatar variant='rounded' style={{ marginLeft: 10 }} alt="Remy Sharp" src={fssaiImage.file} className={classes.large} />
                                    {btnFssai ? <Button color='primary' style={{ padding: 5 }} onClick={() => handleFssaiImage()}>Save</Button> : <></>}
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel>Status</InputLabel>
                                        <Select label="Status" value={status} onChange={(event) => setStatus(event.target.value)}>
                                            <MenuItem value={"Active"}>Active</MenuItem>
                                            <MenuItem value={"Deactive"}>Deactive</MenuItem>
                                            <MenuItem value={"Pending"}>Pending</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Grid>

                                {/* logo  */}
                                <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', }}>
                                    <input accept="image/*" className={classes.input} id="icon-button-logo" onChange={(event) => handleLogo(event)} type="file" />
                                    <label htmlFor="icon-button-logo">
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                    </label>
                                    <Avatar variant='rounded' style={{ marginLeft: 10 }} alt="Remy Sharp" src={logoImage.file} className={classes.large} />
                                    {btnLogo ? <Button color='primary' style={{ padding: 5 }} onClick={() => handleLogoImage()}>Save</Button> : <></>}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField fullWidth value={gst} label="GST" variant="outlined" onChange={(event) => setGst(event.target.value)} />
                                </Grid>

                                {/* <Grid item xs={12} sm={6}>
                                    <Button onClick={() => handleSubmit()} variant="contained" color="primary" fullWidth>Submit</Button>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Button variant="contained" color="secondary" fullWidth>Reset</Button>
                                </Grid> */}

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
                </Dialog>
            </div>
        );
    }



    return (
        <div className='container' style={{ marginTop: 20, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
            <MaterialTable
                title="Restaurant Details "
                columns={[
                    {
                        title: 'Name', field: 'restaurant_name', render: rowData =>
                            <div style={{ flexDirection: 'column' }}>
                                <div><b>{rowData.restaurant_name}</b></div>
                                <div>{rowData.owner_name}</div>
                            </div>

                    },

                    {
                        title: 'Address', field: 'address', render: rowData =>
                            <div style={{ flexDirection: 'column' }}>
                                <div><b>{rowData.address}</b></div>
                                <div>{rowData.cityname},{rowData.statename}</div>
                            </div>

                    },

                    {
                        title: 'Contact', field: 'address', render: rowData =>
                            <div style={{ flexDirection: 'column' }}>
                                <div><b>{rowData.mobilenumber}</b></div>
                                <div>{rowData.emailaddress}</div>
                            </div>

                    },

                    {
                        title: 'GST/fssai', field: 'address', render: rowData =>
                            <div style={{ flexDirection: 'column' }}>
                                <div><b>{rowData.gst}</b></div>
                                <div>{rowData.fssai}</div>
                            </div>

                    },

                    {
                        title: 'Logo', field: 'address', render: rowData =>
                            <div>
                                <img src={`${ServerURL}/images/${rowData.logo}`} width='60' height='60' />

                            </div>

                    },

                ]}
                // assign restaurant data in material table data 
                data={list}
                
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit/Delete',
                        onClick: (event, rowData) => handleDialogOpen(rowData),
                    },
                ]}
            />
            {showDialogBox()}
        </div>

    )
}



