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
import AddNewRestaurant from './AddNewRestaurant';
import AllRestaurant from './AllRestaurant';
import QrCodeGeneration from './QrCodeGeneration';
import OrdersTable from './OrdersTable';

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
                    <ListItemText primary="Add Restaurant" onClick={()=>handleClick(<AddNewRestaurant/>)} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="List Of Restaurant" onClick={()=>handleClick(<AllRestaurant />)}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Generate Qr Code" onClick={()=>handleClick(<QrCodeGeneration />)} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Orders" onClick={() => handleClick(<OrdersTable />)} />
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