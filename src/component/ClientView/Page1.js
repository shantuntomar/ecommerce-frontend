import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Header from "./Header";
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    border: '1px solid #bdc3c7',
  },
  cardactionarea: {
    borderBottom: '1px solid #bdc3c7',
    borderTop: '2px solid #bdc3c7'
  },
  cardmedia: {
    borderBottom: '1px solid #bdc3c7'
  },
});

function Page1(props) {

  var client = useSelector((state) => state.client);
  var user = Object.values(client)[0];

  // without props if u want to push then use use history 
  var history = useHistory()
  var dispatch = useDispatch();

  const handleHomeDelivery = () => {

    client[user.mobileno]['deliveryat'] = "Home Delivery"
    console.log("Client", client)
    console.log("user", user)

    dispatch({
      type:'ADD_CLIENT' , 
      payload:[user.mobileno , user]
    })
    
    history.push({ 'pathname': '/page2' })
  }

  const handleTakeAway = () => {

    client[user.mobileno]['deliveryat'] = "Take Away"
    console.log("Client", client)
    console.log("user", user)
    history.push({ 'pathname': '/page2' })
  }



  const classes = useStyles();

  return (

    <div>
      <Header history={props.history} />

      <div style={{marginTop:50}} className={classes.root}>

        <div className={classes.subdiv}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardActionArea className={classes.cardactionarea}>
                  <CardMedia className={classes.cardmedia}
                    component="img"
                    alt="Home Delivery"
                    image="/home1.jpg"
                    title="Home Delivery"
                    // height='265px'
                    height='265px'
                    width='200px'
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Home Delivery
                  </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                     Experience free from worries is that we offer contactless delivery. Our delivery partners will deliver the package at your doorstep. 
                     
                  </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button variant="contained" color="primary" fullWidth onClick={() => handleHomeDelivery()}>Home Delivery</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardActionArea className={classes.cardactionarea}>
                  <CardMedia className={classes.cardmedia}
                    component="img"
                    alt="Take Away"
                    image="/takeaway.jpg"
                    title="Take Away"
                    height='265px'
                    width='200px'

                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Take Away
                  </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      At our offices and warehouses, our employees are keeping the mandatory 6 feet distance between each other while doing all the activities.

                  </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button variant="contained" color="primary" fullWidth onClick={() => handleTakeAway()}>Take Away</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Page1;
