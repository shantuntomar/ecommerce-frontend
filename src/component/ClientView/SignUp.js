import React , {useState , useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {postData} from '../../FetchNodeServices'
import { useDispatch , useSelector } from "react-redux";
import otpGenerator from 'otp-generator';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

export default function SignInSide(props) {
    var mobileno = props.history.location.state.mobileno;
    const classes = useStyles();

    // states 
    const[name , setName] = useState('');
    const[email , setEmail] = useState('');
    const[password , setPassword] = useState('');
    const[confirmPass , setConfirmPass] = useState('');
    const[otp , setOtp] = useState('');
    const [gotp , setGOtp] = useState('');

    var dispatch = useDispatch();

    const handleVerify = async () => {

        if(otp == gotp){

            if(password == confirmPass){
                var body = {
                    mobileno:mobileno,
                    emailid:email,
                    firstname:name,
                    password:password,
                    confirmPass:confirmPass,
                    addressstatus:false,
                }

                var result = await postData('userdetail/insertUserDeatils' , body)
                if(result.result){
                    dispatch({type:'ADD_CLIENT' , payload:[mobileno , body]})
                    props.history.push({ pathname: '/cart' });
                }
                else{
                    alert('Fail To Save Record ')
                }
            }
            else{
                alert('Password Not Matched')
            }
        }
        else{
            alert('Invalid Otp..')
        }
        
    }

    const otpGenerate = () => {
        var temp = otpGenerator.generate(4, {alphabets:false , upperCase: false, specialChars: false });
        setGOtp(temp);
        alert(temp);
    }

    useEffect(function(){
        otpGenerate();

    },[])



    return (
        <>
            <Header />
            <Grid style={{ height: '93vh' }} container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar style={{ backgroundColor: '#ffa726' }} className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            <b>Sign Up</b>
                        </Typography>
                        <Typography style={{ marginTop: 30 }} component="h1" variant="h5">
                            <b>Please Enter Your Details </b>
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Enter Your Full Name "
                                onChange={(event)=>setName(event.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(event)=>setEmail(event.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event)=>setPassword(event.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Confirm  Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event)=>setConfirmPass(event.target.value)}
                            />
                            <Typography style={{ marginTop: 30 }} component="h1" variant="h5">
                                <b>Verify</b>
                            </Typography>
                            <Typography style={{ marginTop: 5, color: 'gray' }} component="h1" variant="h5">
                               <h5>Enter 6 Digit Otp On +91-{mobileno}</h5>
                            </Typography>
                            <TextField
                                style={{ marginTop: 10 }}
                                variant="outlined"
                                required
                                fullWidth
                                label="Enter Otp"
                                onChange={(event)=>setOtp(event.target.value)}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                                style={{ height: 30, padding: 10, backgroundColor: '#ffa726', borderRadius: 10 }}
                                onClick={()=>handleVerify()}
                            >
                                <h5 style={{ marginTop: 10 }}>Save & Verify</h5>
                            </Button>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}