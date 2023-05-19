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



export default function Order() {
  let navigate = useNavigate();

  const user = localStorage.getItem('user');

  const [cart,setCart] = useState({
    "id": "",
    "user": "",
    "lineitems": [

    ],
    "cartstatus": "",
    "lastorder": ""
  })



  const [product,setProduct] = useState([{}]);

  const [tonghop,setTonghop] = useState([]);

  useEffect(()=>{
      loadCart();

  },[]);

  const loadCart=async()=>{
      const result=await axios.get(`http://localhost:9096/carts/${user}`);
      setCart(result.data);

      const products = 
      {
        products: []
      }

      result.data.lineitems.map((lineitem,index) => {
        products.products.push({"id": lineitem.product});

      })

      const result1=await axios.post(`http://localhost:9095/products`, products);
      setProduct(result1.data)

      const temp1 = [];

      result1.data.map((resu,inde) => {
        temp1.push({"id": resu.id, "name": resu.name, 
                    "quantity": result.data.lineitems[inde].quantity,
                  "image": resu.image, "color": resu.color, "type": resu.type,
                  "price": resu.price})

      })

      setTonghop(temp1);

  };

  var total = 0;
  cart.lineitems.map((car,inde) => {
    total = total + (car.unitprice * car.quantity)
  })

  var total1 = 0;
  tonghop.map((tong,inde) => {
    total1 = total1 + (tong.quantity * tong.price);
  })

  //order
  const [postOrder, setpostOrder] = useState({
    user: localStorage.getItem('user'),
    fullname: "",
    phone: "",
    email: "",
    address: "",
    ordernote: "",
    lineitems: []
  });

  const onInputChange = (e) => {
    //updateQuantity.quantity = e.target.value
    setpostOrder({ ...postOrder, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    //set lineitem
    tonghop.map((tong,index) => {
      
      postOrder.lineitems.push({"product": tong.id, "quantity": tong.quantity, "unitprice": tong.price})
      //setpostOrder({ ...postOrder, ["lineitems"]: {"product": tong.id, "quantity": tong.quantity, "unitprice": tong.price} });
    })
    
    await axios.post("http://localhost:9091/orders", postOrder);
    navigate("/");
  };


  return (
    <body style={{'background-color': '#f4f4f6'}}>
      <Header/>
      <div class="thanhdiachi">
      <div class="thanhdiachi1">
        <h1 class="thanhdiachi2">Flora FLowers Shop / Order</h1>
      </div>
      </div>

      <div style={{'width': '100%','height':'30px','background-color':'#ffffff'}}></div>
      <div style={{'width': '100%','height':'30px','background-color':'#f4f4f6'}}></div>

      <div class="order">
      <form onSubmit={(e) => onSubmit(e)} class="order1_form">
       <div class="order1">
            <div class="order1_billing_address">Billing Address</div>
            <div class="order1_billing_firstname">Full Name</div>
            <input type="text" name="fullname" class="order1_billing_firstname_tb" style={{'width':'95%'}}
             value={postOrder.fullname} onChange={(e) => onInputChange(e)}></input>
            <div class="order1_billing_firstname">Phone</div>
            <div class="order1_billing_lastname">Email</div>
            <input type="text" name="phone" class="order1_billing_firstname_tb"
             value={postOrder.phone} onChange={(e) => onInputChange(e)}></input>
            <input type="text" name="email" class="order1_billing_lastname_tb"
             value={postOrder.email} onChange={(e) => onInputChange(e)}></input>
            <div class="order1_billing_address1">Address</div>
            <input type="text" name="address" class="order1_billing_address1_tb"
             value={postOrder.address} onChange={(e) => onInputChange(e)}></input>
            <div class="order1_billing_ordernote">Order Note</div>
            <textarea type="text" name="ordernote" class="order1_billing_ordernote_tb"
             value={postOrder.ordernote} onChange={(e) => onInputChange(e)}></textarea>
            <div class="order1_billing_firstname" style={{'width':'50%','margin-right':'0px'}}></div>
            <div class="order1_billing_firstname" style={{'width':'50%','margin-right':'0px'}}></div>

            <input type="radio" name="payment" value="normal" style={{'opacity': '0','width': '30%','margin-bottom':'10px','margin-right': '20%'}}></input>
            <input type="radio" name="payment" value="paypal" style={{'opacity': '0','width': '8%','margin-bottom':'10px'}}></input>


       </div>
       <div class="order2">
         <div class="order2_2">
            <div class="order2_info">Order Product</div>
            <div class="order2_product_title">Product</div>
            <div class="order2_product_title" style={{'padding-left':'185px'}}>Sub Total</div>

            {
              tonghop.map((tong,index) => (
                <div>
                 <div class="order2_product">{tong.name}</div>
                 <div class="order2_subtotal">${tong.quantity * tong.price}</div>
                 <div class="order2_type">{tong.color}, {tong.type} x{tong.quantity}</div>
                </div>
              ))

            }

            <div class="order2_total">TOTAL</div>
            <div class="order2_total_money">${total1}</div>
            <div class="order2_include_tax">(included All)</div>
            <input type="submit" class="order2_order" value="Order"></input>




         </div>
       </div>
      </form>
      </div>

      <div style={{'width': '100%','height':'30px','background-color':'#f4f4f6'}}></div>
      <div style={{'width': '100%','height':'30px','background-color':'#f4f4f6'}}></div>


    <Footer/>
    </body>
  )
}
