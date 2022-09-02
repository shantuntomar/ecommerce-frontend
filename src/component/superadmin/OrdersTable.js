import React , {useEffect , useState} from 'react'
import MaterialTable from "material-table";
import {postData , postDataAndImage , getData} from '../../FetchNodeServices'
import renderHTML from 'react-render-html';

function OrdersTable() {

    const [list , setList] = useState([]);

    const fetchOrders = async () => {

        var result = await getData('restaurant/fetchOrders');
        setList(result);
        
        console.log(result)
    
    }

    useEffect(function(){

        fetchOrders();

    },[])

    return (

        <div style={{ margin:'50px auto' , width:'90%'}}>
            <MaterialTable
                title="Orders Table"
                columns={[
                    { title: 'Order Id', field: 'orderid'},
                    { title: 'Order Time', field: 'ordertime' },
                    { title: 'Mobile No.', field: 'mobileno' },
                    { title: 'Email Id', field: 'emailid' },
                    { title: 'Food Item Id/Name', field: 'fooditem'},
                    { title: 'Quantity', field: 'qtydemand' },
                    { title: 'Price', field: 'price' },
                    { title: 'Total Amount', field: 'totalamount'},
                ]}
                data={list}
            />
        </div>

    )
}

export default OrdersTable;