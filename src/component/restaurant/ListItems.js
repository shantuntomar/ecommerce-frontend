import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AllFoodItems from './AllFoodItems';
import FoodTypes from './FoodTypes';
import AllFoodTypes from './AllFoodTypes';
import FoodItems from "./FoodItems";
// import AddNewRestaurant from './AddNewRestaurant';
// import AllRestaurant from './AllRestaurant';

export default function  ListItems(props) {

    const handleClick = (component) => {
        // this setDashBoardView has the refrence of setDashBoardView function in admindashboard component 
        // function in parent component and call it from child component . 
        props.setDashBoardView(component);
    }

    const mainListItems = () => {
        return (
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    {/* sending component to handle click function as a argument  */}
                    <ListItemText primary="Add Food Items " onClick={()=>handleClick(<FoodItems restaurant={props.restaurant}/>)} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="List Of Food Items " onClick={()=>handleClick(<AllFoodItems/>)}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Food Types " onClick={()=>handleClick(<FoodTypes restaurant={props.restaurant} />)} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="List Of Food Types " onClick={()=>handleClick(<AllFoodTypes/>)} />
                </ListItem>
            </div>
        )

    }

    const secondaryListItems = () => {
        return (
            <div>
                <ListSubheader inset>Saved reports</ListSubheader>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Current month" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Last quarter" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Year-end sale" />
                </ListItem>
            </div>
        )
    }

    return (
        <div>
        {mainListItems()}
        {secondaryListItems()}
        </div>
    )




}