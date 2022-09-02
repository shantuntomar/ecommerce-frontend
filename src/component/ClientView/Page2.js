import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getData , postData , postDataAndImage , ServerURL} from '../../FetchNodeServices';

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  subdiv: {
    width: 550,
    padding: 20,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

  },
  card: {
    border: "1px solid #bdc3c7",
    width: 250
  },
  cardactionarea: {
    borderBottom: "1px solid #bdc3c7",
    borderTop: "2px solid #bdc3c7",
  },
  cardmedia: {
    borderBottom: "1px solid #bdc3c7",
  },
});


function Page2(props) {
  
  const classes = useStyles();
  var restaurant = useSelector((state) => state.restaurant);
  var rest = Object.values(restaurant)[0];

  var client = useSelector(state => state.client);
  var user = Object.values(client)[0];

  var history = useHistory();
  var cart = useSelector(state => state.cart)
  var keys = Object.keys(cart);
  var values = Object.values(cart);

  var totalamt = values.reduce(calculate, 0);
  var totalsaving = values.reduce(totalsaving, 0);

  function calculate(prev, item) {
    var price = (item.qtydemand * item.price)
    return (prev + price)

  }
  function totalsaving(prev, item) {
    var price = item.offer == 0 ? (item.offer) : (item.offer * item.qtydemand)
    return (prev + price)

  }

  var netamt = totalamt - totalsaving;

  const handleCashOnDelivery = () => {

    // alert(user.mobileno)
    // console.log(client[user.mobileno]["PaymentMode"] = "Cash On Delivery")
    // console.log(netamt)

    client[user.mobileno]["PaymentMode"] = "Cash On Delivery";
    handleOrderSubmit("Cash On Delivery" , "none" , "none");

  };

  const handleOrderSubmit = async (paymentmode , paymentstatus , transactionid) => {

    // alert(user.deliverat+ "-" + user.restaurantid + "=" + user.deliveryat);
    // console.log("====");
    // console.log(user);

    var date = new Date();
    var cd = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
    var ct = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

    var body = {

      orderdate:cd,
      ordertime:ct,
      mobileno:user.mobileno,
      emailid:user.emailid,
      totalamount:netamt,
    
    }

    var result = await postData('restaurant/generateorder' , body)
    // alert(result.result+"="+result.orderid);
    if(result.result){
      body = {

        orderno:result.orderid,
        orderdate:cd,
        ordertime:ct,
        mobileno:user.mobileno,
        emailid:user.emailid,
        totalamount:netamt,
        deliverystatus:'pending',
        paymentstatus:paymentstatus, 
        paymentmode:paymentmode, 
        restaurantid:rest.restaurantid, 
        deliverat:user.deliverat,
        cart:values,

      }

      var orderStatus = await postData('restaurant/submitorder' , body)
      alert(orderStatus);


    }
  
  }

  const handleOnLinePayment = () => {

    client[user.mobileno]["PaymentMode"] = "Online Payment";
    history.push({ pathname: "/paymentgateway" });
    
  };

  return (
    <div>
      <Header history={props.history} />

      <div style={{marginTop:50}} className={classes.root}>
        <div className={classes.subdiv}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardActionArea className={classes.cardactionarea}>
                  <CardMedia
                    className={classes.cardmedia}
                    component="img"
                    alt="Cash on Delivery"
                    image="/cod.jpg"
                    title="Cash on Delivery"
                    height='265px'
                    width='200px'
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Cash on Delivery
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                     
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleCashOnDelivery()}
                  >
                    Cash on Delivery
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardActionArea className={classes.cardactionarea}>
                  <CardMedia
                    className={classes.cardmedia}
                    component="img"
                    alt="Online Payment"
                    image="/onlinepay.png"
                    title="Online Payment"
                    height='265px'
                    width='200px'
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Online Payment
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleOnLinePayment()}
                  >
                    Online Payment
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Page2;
