import React, { useState, useEffect } from 'react'
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import { getData, ServerURL, postData, postDataAndImage } from '../../FetchNodeServices';
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

function AllFoodItems() {

    // form style 
    const Classes = useStyles();
    const paperStyle = { padding: 20, width: 1000, margin: '50px auto', borderRadius: 10, }
    const avtarStyle = { backgroundColor: '#ff6363' }
    const statusStyle = { marginTop: 9, paddingRight: 2, }

    // states of fetching the values !
    const [restaurantId, setRestaurantId] = useState('');
    const [foodTypeId, setFoodTypeId] = useState('');
    const [foodType, setFoodType] = useState('');
    const [foodTypeImage, setfoodTypeImage] = useState({ bytes: '', file: '' })
    const [foodTypeAd, setFoodTypeAd] = useState('');
    const [status, setStatus] = useState('');
    const [foodAdImage, setFoodAdImage] = useState({ bytes: '', file: '' })

    const [fooditemid , setfooditemid ] = useState('');

    // checks state and snackbar states 
    const [errormsg, setErrorMsg] = useState('');
    const [open, setOpen] = React.useState(false);

    // manage photos 
    const [btnFoodType , setBtnFoodType] = useState(false);
    const [btnFoodImage , setBtnFoodImage] = useState(false);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const foodItemsSubmit = async () => {
        var msg = "";
        var error = false;
        if (isEmpty(restaurantId)) {
            error = true;
            msg += "Restaurant Id Should Not Be Empty!<br>"
        }
        if (isEmpty(foodTypeId)) {
            error = true;
            msg += "Food Type Id Should Not Be Empty!<br>"
        }
        if (!isAlphabets(foodType)) {
            error = true;
            msg += "Food Type Must Contain Alphabets Only!<br>"
        }

        if (error) {
            setErrorMsg(msg);
            setOpen(true);

        }

        if (!error) {
            var formData = new FormData();
            formData.append('restaurant_id', restaurantId);
            formData.append('foodtype_id', foodTypeId);
            formData.append('foodtype', foodType);
            formData.append('foodtypeimage', foodTypeImage.bytes);
            formData.append('foodtypead', foodTypeAd);
            formData.append('status', status)
            formData.append('foodtypeadimage', foodAdImage.bytes);


            var config = { headers: { "content-type": "multipart/form-data" } }
            var res = await postDataAndImage("restaurant/addfooditems", formData, config);

            if (res.result) {
                swal({
                    title: "Food Item Added Successfully",
                    icon: "success",
                    dangerMode: true,
                })
            }
            else {
                swal({
                    title: "Fail To Add Food Items",
                    icon: "warning",
                    dangerMode: true,
                })
            }
        }
        else {
            setOpen(true);
        }




    }
    
    const classes = useStyles();
    // dialog states 
    const [dialogopen, setDialogOpen] = React.useState(false);

    // dialog functions 
    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const refreshPage = () => {
        fetchFoodItems();

    }

    const handleDialogClose = () => {
        refreshPage();
        setDialogOpen(false);
    };

    const dialogOpen = (data) => {

        // set data bases feilds 
        setfooditemid(data.fooditem_id);
        setRestaurantId(data.restaurant_id)
        setFoodTypeId(data.foodtype_id)
        setFoodType(data.foodtype)
        setFoodTypeAd(data.foodtypead)
        setStatus(data.status)

        setfoodTypeImage({bytes: '', file: `${ServerURL}/images/${data.foodtypeimage}`})
        setFoodAdImage({bytes: '', file: `${ServerURL}/images/${data.foodimage}`})

        setDialogOpen(true)
    }

    // submit function after updations 
    const handleFinalSubmit = async () => {
        var msg = "";
        var error = false;
        // if (isEmpty(restaurantId)) {
        //     error = true;
        //     msg += "Restaurant Id Should Not Be Empty!<br>"
        // }
        // if (isEmpty(foodTypeId)) {
        //     error = true;
        //     msg += "Food Type Id Should Not Be Empty!<br>"
        // }
        // if (!isAlphabets(foodType)) {
        //     error = true;
        //     msg += "Food Type Must Contain Alphabets Only!<br>"
        // }

        // if(error){
        //     setErrorMsg(msg);
        //     setOpen(true);

        // }

        if(!error){
            var formData = new FormData();
            var body = {
                // fooditem_id: datafooditem_id,
                fooditem_id:fooditemid,
                restaurant_id:restaurantId,
                foodtype_id:foodTypeId,
                foodtype:foodType,
                foodtypead: foodTypeAd,
                status:status,
            }

            var res = await postData('restaurant/editfooditem' , body);
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

    // handling image function 
    const handleSaveFoodType = async () => {
        var formData = new FormData();
        formData.append("fooditem_id", fooditemid);
        formData.append('foodtypeimage', foodTypeImage.bytes);

        var config = { headers: { "content-type": "multipart/form-data" } }
        var res = await postDataAndImage("restaurant/updatefoodtypeimage", formData, config);

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
        setBtnFoodType(false);

    }

    const handleFoodType = (event) => {
        setfoodTypeImage({
            bytes: event.target.files[0],
            file: URL.createObjectURL(event.target.files[0])
        });
        setBtnFoodType(true);

    }

    const handleSaveFoodImage = async () => {
        var formData = new FormData();
        formData.append("fooditem_id", fooditemid);
        formData.append('foodimage', foodAdImage.bytes);

        var config = { headers: { "content-type": "multipart/form-data" } }
        var res = await postDataAndImage("restaurant/updatefoodimage", formData, config);

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
        setFoodAdImage({
            bytes: event.target.files[0],
            file: URL.createObjectURL(event.target.files[0])
        });
        setBtnFoodImage(true);

    }

    const handleDelete = async () => {
        var body = { "fooditem_id": fooditemid}
        var config = { headers: { "content-type": "multipart/form-data" } }
        var res = await postData("restaurant/deletefooditems", body);
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


    const showDialog = (data) => {
        return (
            <div>
                <Dialog fullScreen open={dialogopen} onClose={handleDialogClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleDialogClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Food Items Details
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
                        <Paper elevation={10} style={paperStyle} className='container'>
                            <Grid align='center'>
                                <Avatar style={avtarStyle} className={Classes.large}><FastfoodIcon style={{ fontSize: 40 }} /></Avatar>
                                <h2 style={{ fontFamily: '-moz-initial', color: '#ff6363' }}>FOOD ITEMS</h2>
                            </Grid>
                            <TextField style={{ padding: 9 }} fullWidth id="outlined-basic" value={restaurantId} label="Restaurant Id" variant="outlined" onChange={(event) => setRestaurantId(event.target.value)} required />
                            <TextField style={{ padding: 9 }} fullWidth id="outlined-basic" value={foodTypeId} label="Food Type Id" variant="outlined" onChange={(event) => setFoodTypeId(event.target.value)} required />
                            <Grid container >
                                <Grid item xs={12} sm={10} >
                                    <TextField style={{ padding: 5 }} fullWidth id="outlined-basic" value={foodType} label="Food Type" variant="outlined" onChange={(event) => setFoodType(event.target.value)} required />
                                </Grid>

                                {/* image portion  */}
                                <Grid item xs={12} sm={2} style={{ display: 'flex', justifyContent: 'center', }} >
                                    <input accept="image/*" className={Classes.input} id="icon-button-file" type="file" onChange={(event) => handleFoodType(event)} />
                                    <label htmlFor="icon-button-file">
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera style={{ marginTop: 5 }} />
                                        </IconButton>
                                    </label>
                                    <Avatar variant='rounded' style={{ marginLeft: 10, marginTop: 10 }} src={foodTypeImage.file} alt="Remy Sharp" />
                                    {btnFoodType ? <Button color='primary' style={{ padding: 5 }} onClick={() => handleSaveFoodType()}>Save</Button> : <></>}

                                </Grid>


                                <Grid item xs={12} sm={5} >
                                    <TextField style={{ padding: 9 }} value={foodTypeAd} fullWidth id="outlined-basic" label="Food Type Ad" onChange={(event) => setFoodTypeAd(event.target.value)} variant="outlined" required />
                                </Grid>


                                <Grid item xs={12} sm={5} >
                                    <FormControl variant="outlined" className='container' style={statusStyle}>
                                        <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                                        <Select label="Status" value={status} onChange={(event) => setStatus(event.target.value)}>
                                            <MenuItem value={"Yes"}>YES</MenuItem>
                                            <MenuItem value={"No"}>NO</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>


                                {/* image portion  */}
                                <Grid item xs={12} sm={2} style={{ display: 'flex', justifyContent: 'center', }} >
                                    <input accept="image/*" className={Classes.input} id="icon-button-foodAd" type="file" onChange={(event) => handleFoodImage(event)} />
                                    <label htmlFor="icon-button-foodAd">
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera style={{ marginTop: 5 }} />
                                        </IconButton>
                                    </label>
                                    <Avatar variant='rounded' style={{ marginLeft: 10, marginTop: 10 }} src={foodAdImage.file} alt="Remy Sharp" />
                                    {btnFoodImage ? <Button color='primary' style={{ padding: 5 }} onClick={() => handleSaveFoodImage()}>Save</Button> : <></>}
                                </Grid>
                            </Grid>
                            {/* <Button fullWidth onClick={() => foodItemsSubmit()} variant="contained" style={{ backgroundColor: '#ff6363', color: 'white' }}>Submit</Button> */}
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



    // list for fetching the data from database 
    const [list, setList] = useState([]);

    // useeffect function 
    useEffect(function () {
        
        fetchFoodItems();

    }, [])

    const fetchFoodItems = async () => {

        // var myFooditem_id = rowData.fooditem_id;

        var result = await getData('restaurant/listfooditems');
        setList(result);

    }

    return (

        <div className='container' style={{ marginTop: 20, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2),' }}>
            <MaterialTable
                title="Simple Action Preview"
                columns={[
                    { title: 'Restaurant Id', field: 'restaurant_id' },
                    {
                        title: 'Food Type', field: 'foodtype', render: rowData =>
                            <div style={{ flexDirection: 'column' }}>
                                <div><b>{rowData.foodtype}</b></div>
                                <div>{rowData.foodtype_id}</div>
                            </div>
                    },

                    {
                        title: 'Food Type Ad', field: 'foodtype', render: rowData =>
                            <div style={{ flexDirection: 'column' }}>
                                <div><b>{rowData.foodtypead}</b></div>
                                <div>{rowData.status}</div>
                            </div>
                    },

                    {
                        title: 'Food Image', field: 'foodtype', render: rowData =>
                            <div>
                                <img src={`${ServerURL}/images/${rowData.foodimage}`} width='60' height='60' />
                            </div>
                    },
                ]}

                data={list}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit/Delete',
                        onClick: (event, rowData) => dialogOpen(rowData),
                    }
                ]}
            />
            {showDialog()}
        </div>
    )
}

export default AllFoodItems



