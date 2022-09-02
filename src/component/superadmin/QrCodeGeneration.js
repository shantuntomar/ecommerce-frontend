import React , {useState , useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import  Button  from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {postData , getData , postDataAndImage , ServerURL} from '../../FetchNodeServices';
import { useHistory } from "react-router-dom";
var QRCode = require('qrcode.react');

function QrCodeGeneration(props) {

    const [list , setList] = useState([]);
    const [qrLink , setQrLink] = useState('');
    const [state , setState] = useState(false);

    var history = useHistory();

    const fillRestaurant = () => {

        return (
            list.map((item, index) => {
                return (
                    <MenuItem value={`${ServerURL}/${item.restaurant_name}/${item.restaurant_id}`}>{item.restaurant_name}</MenuItem>
                )
            })
        )
    }

    const fetchRestaurant = async () => {

        // call the node program and fetch the data 
        var result = await getData('restaurant/listrestaurant');
        // setting the data in list  
        setList(result);
    }

    const handleRestaurantChange = async (event) => {

        setQrLink(event.target.value)
    
    }

    const showQr = () => {

        return (
            <div>
                <QRCode value={qrLink} />
            </div>
        );
    }

    useEffect(function(){

        fetchRestaurant();
        
    },[])

    const handleQr = () => {

        history.push({ pathname: "/qrpage" });
    }

    const handlePrint = () => {

        window.print();
    }



    return (
        <div>

            <div style={{width:500 , margin:'40px auto' }}>

                <Grid container spacing={1} style={{textAlign:'center'}}>

                    <Grid item lg={12} xs={12} style={{textAlign:'center ' , margin:'0 auto'}}>
                        <h2>QR CODE GENERATOR</h2>
                    </Grid>

                    <Grid item lg={12} xs={12} style={{textAlign:'center'}}>
                        <FormControl variant="outlined" fullWidth >
                            <InputLabel>Restaurant Id</InputLabel>
                            <Select onChange={(event) => handleRestaurantChange(event)} label="Restaurant Id" fullWidth>
                                {fillRestaurant()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item lg={12} xs={12} style={{textAlign:'center ' , margin:'0 auto'}}>
                        <TextField value={qrLink} label="Restaurant Link" fullWidth variant="outlined" onChange={(event) => setQrLink(event.target.value)} />
                    </Grid> 

                    <Grid item lg={12} xs={12} style={{textAlign:'center ' , margin:'0 auto'}}>
                        <Button fullWidth variant="outlined" onClick={() => setState(true)} style={{backgroundColor:'orange' , color:'white '}} > generate qr code</Button>
                    </Grid> 

                    <Grid item lg={12} xs={12} style={{textAlign:'center ' , margin:'70px auto'}}>
                        {state ? <div>
                            {showQr()}
                            <Button onClick={() => handlePrint()} variant="outlined"style={{backgroundColor:'orange' , color:'white ' , marginTop:80}} >Print</Button>
                            </div> : <div></div>}
                    </Grid> 

                </Grid>

        </div>
            
        </div>
    )
}

export default QrCodeGeneration

// <Button fullWidth variant="outlined" onClick={() => setState(true)} style={{backgroundColor:'orange' , color:'white '}} > generate qr code</Button>
