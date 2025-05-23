import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ url }) => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Home",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", (data.category))
    formData.append("image", image)
    const response = await axios.post(`${url}/api/product/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Home",
      })
      setImage(false)
      toast.success(response.data.message), {
      }
    }
    else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label className='image-upload' htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_image} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' autoComplete='off' placeholder='Enter Product Name' required />
        </div>
        <div className="product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write Product Description' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Library">Library</option>
              <option value="Hospital">Hospital</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price (₹)</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  )
}

export default Add