import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

import '../custom/css/bootstrap.css';
import '../custom/css/phai1.css';
import '../custom/css/shop.css';
import '../custom/css/style.css';
import '../custom/css/font-awesome.min.css'

import Header from '../include/Header';
import Footer from '../include/Footer';


export default function Profile() {

  const [getUser,setGetUser] = useState({
    id: "",
    userid: "",
    fullname: "",
    cardnumber: "",
    balance: 0,
    validmonth: 0,
    lastorder: "",
    lastpay: 0
  });

  const user = localStorage.getItem('user');

  const [orders,setOrders] = useState([]);



  const [product,setProduct] = useState([{}]);

  const [tonghop,setTonghop] = useState([]);

  useEffect(()=>{
      loadUser();

  },[]);

  const loadUser=async()=>{
    const result0=await axios.post(`http://localhost:9092/users/info`, {"userid": user});
    setGetUser(result0.data);


    //get all orders
    const result=await axios.post(`http://localhost:9091/orders/userorders`, {"user": user});
    setOrders(result.data);



  };



  return (
    <body style={{'background-color': '#f4f4f6'}}>
      <Header/>

      <div class="thanhdiachi">
      <div class="thanhdiachi1">
        <h1 class="thanhdiachi2">Flora FLowers Shop / Profile


        </h1>
      </div>

      <div style={{'width': '100%','height':'30px','background-color':'#ffffff'}}></div>
      <div style={{'width': '100%','height':'30px','background-color':'#f4f4f6'}}></div>

      <div class="profile">
      <form action="user" method="post">
       <div class="profile1">
        <div class="profile1_title">My info</div>
        <div class="profile1_name">
          <div class="profile1_name1">User:</div>
          <input type="text" class="profile1_name2 no-outline" value={getUser.userid}></input>
        </div>
        <div class="profile1_name">
          <div class="profile1_name1">FullName:</div>
          <input type="text" class="profile1_name2 no-outline" value={getUser.fullname}></input>
        </div>
        <div class="profile1_name">
          <div class="profile1_name1">Card:</div>
          <input type="text" class="profile1_name2 no-outline" value={getUser.cardnumber}></input>
        </div>
        <div class="profile1_name">
          <div class="profile1_name1">Balance:</div>
          <input type="text" class="profile1_name2 no-outline" value={getUser.balance}></input>
        </div>
        <div style={{'width':'100%','height':'30px'}}></div>
       </div>
      </form>

      {
        orders.map((order,index) => (
          <div class="profile2" style={{'float': 'right','margin-bottom': '20px'}}>
          <div class="profile2_2">
            <div class="profile2_info">{order.orderid}</div>
            <div class="profile2_product_title">Product</div>
            <div class="profile2_product_title" style={{'width': '25%'}}>Category</div>
            <div class="profile2_product_title" style={{'width': '25%'}}>Unit Price</div>
            <div class="profile2_product_title" style={{'width':'13%','text-align': 'right','float':'right'}} >Total</div>
    
    
    
            {
              order.lineitems.map((pro,index1) => (
                <div>
                  <div class="profile2_product">{pro.name}</div>
                  <div class="profile2_category">{pro.type}</div>
                  <div class="profile2_unitprice">${pro.unitprice}</div>
                  <div class="profile2_subtotal">${pro.unitprice * pro.quantity}</div>
                  <div class="profile2_type">{pro.color} x{pro.quantity}</div>
                  </div>
              ))
            }
    
    
            <div class="profile2_total">GRAND TOTAL</div>
            <div class="profile2_total_money">${order.total}</div>
            <div class="profile2_include_tax">(included All)</div>
            <div class="profile2_total" style={{'width': '100%','margin-bottom':'15px'}}>INVOICED TO</div>
            <div class="profile2_firstname">Full Name:</div>
            <div class="profile2_firstname1">{order.fullname}</div>
            <div class="profile2_lastname">..........</div>
            <div class="profile2_lastname1">...</div>
            <div class="profile2_email">Email:</div>
            <div class="profile2_email1">{order.email}</div>
            <div class="profile2_firstname" style={{'margin-top': '8px'}}>Phone:</div>
            <div class="profile2_firstname1" style={{'margin-top': '8px'}}>{order.phone}</div>
            <div class="profile2_lastname" style={{'margin-top': '8px'}}>Address:</div>
            <div class="profile2_lastname1" style={{'width': '56%','margin-top': '8px'}}>{order.address}</div>
    
            <div class="profile2_total" style={{'width':'100%','margin-top':'15px'}}>PAYMENT STATUS</div>
            <div class="profile2_firstname" style={{'margin-top': '8px','width': '100%','margin-bottom':'5px','color': '#0d0d1f'}}>APPROVED</div>
            <div class="profile2_total" style={{'width': '100%','margin-bottom':'15px','margin-top': '25px'}}>STATUS</div>
    
            <div class="profile2_date">Order date:</div>
            <div class="profile2_date1">2022 - 05 - 04</div>
          </div>
          </div>
        ))
      }

      </div>

  </div>

  <div style={{'width': '100%','height':'30px','background-color':'#f4f4f6'}}></div>
  <div style={{'width': '100%','height':'30px','background-color':'#f4f4f6'}}></div>

    <Footer/>
    </body>
  )
}
