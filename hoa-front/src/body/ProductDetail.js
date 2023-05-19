import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

import '../custom/css/bootstrap.css';
import '../custom/css/phai1.css';
import '../custom/css/shop.css';
import '../custom/css/style.css';
import '../custom/css/font-awesome.min.css'
import rose from '../custom/img/rose5_bg.jpg'
import Header from '../include/Header';
import Footer from '../include/Footer';


export default function Home() {

  let navigate = useNavigate();

  const { id } = useParams();
  const [product,setProduct] = useState([])

  const [quantity, setQuantity] = useState();

  var unitprice1 = 0;
  useEffect(()=>{
      loadProduct();
  },[]);

  const loadProduct=async()=>{
      const result=await axios.get(`http://localhost:9095/products/${id}`);
      setProduct(result.data);


      const getProduct = 
      {
        user: localStorage.getItem('user'),
        product: id
      };

      const result1=await axios.post(`http://localhost:9096/carts/quantity`, getProduct);
      setQuantity(result1.data)

      unitprice1 = result.data.price
  };

  const [updateQuantity, setUpdateQuantity] = useState({
    user: localStorage.getItem('user'),
    product: id,
    quantity: quantity,
    unitprice: unitprice1
  });

  const onInputChange = (e) => {
    //updateQuantity.quantity = e.target.value
    setUpdateQuantity({ ...updateQuantity, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:9096/carts", updateQuantity);
    navigate("/cart/" + localStorage.getItem('user'));
  };



  return (
    <body style={{'background-color': '#f4f4f6'}}>
      <Header/>
    

      <div class="thanhdiachi">
       <div class="thanhdiachi1">
        <h1 class="thanhdiachi2">Flora FLowers Shop / Shop{updateQuantity.quantity}</h1>
       </div>
      </div>

      <div style={{'width': '100%','height':'30px','background-color':'#ffffff'}}></div>


      <div class="detail">
      <div class="detail1">
       <div class="detail2">
        <img class="detail_img"src={product.image}></img>
        <div class="detail_lienquan">Related Product</div>

       </div>
       <div class="detail3">
            <div class="detail3_h">{product.name}</div>
            <div class="detail3_price">Price:</div>
            <div class="detail3_h1">$ {product.price}</div>
            <div class="detail3_flower">Flower:</div>
            <div class="detail3_h2">Hoa phuong</div>
            <div class="detail3_h3">{product.description}</div>
            <div class="detail3_color">Color:</div>
            <div class="detail3_h4">{product.color}</div>
            <div class="detail3_color" style={{'margin-top':'0px'}}>Type:</div>
            <div class="detail3_h4" style={{'line-height': '40px'}}>{product.type}</div>

            <form onSubmit={(e) => onSubmit(e)}>
             <input type="hidden" name="flower" value="${variation.product}"></input>
             <input type="hidden" name="variation" value="${variation.variation_id}"></input>
              <div class="quantity">

                <input type="text" class="soluong1" placeholder={quantity} 
                 name="quantity" value={updateQuantity.quantity}
                 onChange={(e) => onInputChange(e)}>
                </input>


              </div>
              <input type="submit" value="Go to Cart" class="addcart"></input>
            </form>
       </div>
      </div>
      </div>


    <Footer/>
    </body>
  )
}
