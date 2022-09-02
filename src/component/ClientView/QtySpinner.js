import React , {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import  Button  from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

function QtySpinner(props) {

    const classes = useStyles();

    const handleDecreament = () => {
        if(value >= 0){
            var c = value - 1;
            setValue(c);
            props.onChange(c);

        }

    }

    const handleIncreament = () => {
        var c = value + 1;
        setValue(c);
        props.onChange(c);
        
    }


    const [value , setValue] = useState(props.value);
    
    return (
        <div>
            {value > 0 ? (
            <div style={{display:'flex' , flexDirection:'row'}}>
                <Avatar onClick={() => handleDecreament()} style={{width:40 , cursor:'pointer' , height:40,margin:5, fontSize:25 , backgroundColor:'#ffa726' , fontWeight:1000}} >-</Avatar>
                <div style={{fontWeight:500 , width:20 , fontSize:16 , display:'flex' , justifyContent:'center' , alignItems:'center'}}>
                <b>{value}</b>
                </div>
                <Avatar onClick={() => handleIncreament() } style={{width:40 , cursor:'pointer', height:40,margin:5, fontSize:25 , backgroundColor:'#ffa726' , fontWeight:1000}} >+</Avatar>
                </div>
            ) :
                <div>
                    <Button onClick={() => handleIncreament()} style={{borderRadius:30 , backgroundColor:'#ffa726' , color:'white'}} variant="contained" >Add To Cart</Button>
                </div> 
            }

        </div>
    )
}

export default QtySpinner
