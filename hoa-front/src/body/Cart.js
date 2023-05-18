import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import '../custom/css/bootstrap.css';
import '../custom/css/phai1.css';
import '../custom/css/shop.css';
import '../custom/css/style.css';
import '../custom/css/font-awesome.min.css'

import Header from '../include/Header';
import Footer from '../include/Footer';

import hoaphuong from '../custom/img/hoaphuong.JPG'


export default function Cart() {

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


  return (
    <body style={{'background-color': '#f4f4f6'}}>
      <Header/>
      <div class="thanhdiachi">
      <div class="thanhdiachi1">
        <h1 class="thanhdiachi2">Flora FLowers Shop / cart
        </h1>
      </div>
      </div>

      <div style={{'width': '100%','height':'30px','background-color':'#ffffff'}}></div>
      <div style={{'width': '100%','height':'30px','background-color':'#f4f4f6'}}></div>

      <div class="giohang">
      <div class="giohang1">
        <div class="giohang_thanhtitle">
            <div class="giohang_title" style={{'width': '382px','margin-left': '10px'}}>Product</div>
            <div class="giohang_title" style={{'width': '200px'}}>Type</div>
            <div class="giohang_title" style={{'width': '128px'}}>Quantity</div>
            <div class="giohang_title">Price</div>
        </div>
        <div style={{'width': '100%','height':'5px','background-color':'#f4f4f6'}}></div>
        {
          tonghop.map((tong,index) => (
            <div class="giohangd">
            <div class="giohang_div">
                  <img class="giohang_img"src={tong.image}></img>
            </div>
            <div class="giohang_tensp"><a href={"/products/"+tong.id} >{tong.name}</a></div>
            <div class="giohang_type">
                  <div class="giohang_type1">Color: {tong.color}</div>
                  <div class="giohang_type1">Type: {tong.type}</div> 
            </div>
            <div class="giohang_quantity">{tong.quantity}</div>
            <div class="giohang_price">${tong.price}</div>
  
          </div>
          ))
        }
        {
        /*<div class="giohangd">
          <div class="giohang_div">
                <img class="giohang_img"src={hoaphuong}></img>
          </div>
          <div class="giohang_tensp">Hoa phuong do</div>
          <div class="giohang_type">
                <div class="giohang_type1">Color: Blue</div>
                <div class="giohang_type1">Type: Wedding</div> 
          </div>
          <div class="giohang_quantity">5</div>
          <div class="giohang_price">$10.5</div>

        </div>*/}
        <div style={{'width': '100%','height':'20px','background-color':'#f4f4f6'}}></div>
      </div>
      <div class="giohang2">
        <div class="giohang2_info">Total Cart</div>
        <div class="giohang2_total" style={{'margin-top': '10px'}}>{tonghop.length} products</div>
        <div class="giohang2_total" style={{'width': '170px','border-bottom': '1px solid gray'}}>
         
        </div>
        <div class="giohang2_total" style={{'margin-top': '10px'}}>Total: ${total}</div>
        <div style={{'width': '100%','height':'50px','float':'left','background-color':'#ffffff'}}></div>
        <div class="giohang2_checkout">
            <a href="/order" class="giohang2_checkout_button">Check out</a>
        </div>
      </div>
      </div>

      <div style={{'width': '100%','height':'30px','background-color':'#f4f4f6'}}></div>
      <div style={{'width': '100%','height':'30px','background-color':'#f4f4f6'}}></div>

    <Footer/>
    </body>
  )
}
