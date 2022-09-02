import AddNewRestaurant from './component/superadmin/AddNewRestaurant'
import AllRestaurant from './component/superadmin/AllRestaurant';
import FoodItems from './component/restaurant/FoodItems';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import SuperAdminLogin from './component/superadmin/SuperAdminLogin';
import AdminDashBoard from './component/superadmin/AdminDashBoard';
import AllFoodItems from './component/restaurant/AllFoodItems';
import RestaurantLogin from './component/restaurant/RestaurantLogin';
import RestaurantDashBoard from './component/restaurant/RestaurantDashBoard';
import FoodTypes from './component/restaurant/FoodTypes';
import AllFoodTypes from './component/restaurant/AllFoodTypes';
import Header from './component/ClientView/Header';
import Home from './component/ClientView/Home';
import QtySpinner from './component/ClientView/QtySpinner'
import Demo from './component/ClientView/Demo';
import Cart from './component/ClientView/Cart';
import SignIn from './component/ClientView/SignIn';
import SignUp from './component/ClientView/SignUp';
import UserDetail from './component/ClientView/UserDetail';
import MakePayment from './component/ClientView/MakePayment';
import PaymentGateway from './component/ClientView/PaymentGateway';
import Page1 from './component/ClientView/Page1';
import Page2 from './component/ClientView/Page2';
import QrCodeGeneration from './component/superadmin/QrCodeGeneration';
import QrCodePage from './component/superadmin/QrCodePage';
import OrdersTable from './component/superadmin/OrdersTable';




function App(props) {
  return (
    <div>
      <Router>
        <Route exact strict component={AddNewRestaurant} path="/addnewrestaurant" history={props.history} ></Route>
        <Route exact strict component={AllRestaurant} path="/allrestaurant" history={props.history} ></Route>
        <Route exact strict component={SuperAdminLogin} path="/superadminlogin" history={props.history} ></Route>
        <Route exact strict component={AdminDashBoard} path="/admindashboard" history={props.history} ></Route>
        <Route exact strict component={RestaurantLogin} path="/restaurantlogin" history={props.history} ></Route>
        <Route exact strict component={RestaurantDashBoard} path="/restaurantdashboard" history={props.history} ></Route>
        <Route exact strict component={Header} path="/header" history={props.history} ></Route>
        <Route exact strict component={Home} path="/home" history={props.history} ></Route>
        <Route exact strict component={QtySpinner} path="/qty" history={props.history} ></Route>
        <Route exact strict component={Demo} path="/demo" history={props.history} ></Route>
        <Route exact strict component={Cart} path="/cart" history={props.history} ></Route>
        <Route exact strict component={SignIn} path="/signin" history={props.history} ></Route>
        <Route exact strict component={SignUp} path="/signup" history={props.history} ></Route>
        <Route exact strict component={UserDetail} path="/userdetail" history={props.history} ></Route>
        <Route exact strict component={MakePayment} path="/makepayment" history={props.history} ></Route>
        <Route exact strict component={PaymentGateway} path="/paymentgateway" history={props.history} ></Route>
        <Route exact strict component={Page1} path="/page1" history={props.history} ></Route>
        <Route exact strict component={Page2} path="/page2" history={props.history} ></Route>
        <Route exact strict component={QrCodeGeneration} path="/qrcode" history={props.history} ></Route>
        <Route exact strict component={QrCodePage} path="/qrpage" history={props.history} ></Route>
        <Route exact strict component={OrdersTable} path="/ordertable" history={props.history} ></Route>

        {/* mycomponent  */}
      </Router>



      {/* <AddNewRestaurant /> */}
      {/* <AllRestaurant /> */}
      {/* <FoodItems /> */}
      {/* <FoodTypes /> */}
      {/* <AllFoodItems /> */}
      {/* <AllFoodTypes /> */}

      
    </div>
  );
}

export default App;
