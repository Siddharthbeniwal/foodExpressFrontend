import React, { useEffect, useState } from 'react'
import { API_URLS } from '../appConstants'
import { useSelector, useDispatch } from 'react-redux'
import { setInitialData, handleQuantity, handleCart, filterFoodList } from '../features/foodExpressSlice'

const Cards = () => {

  // const [foodData, setFoodData] = useState([])
  const [foodCat, setFoodCat] = useState([])

  const quantity = useSelector(state => state.quantity)
  const price = useSelector(state => state.price)
  const itemTotalPrice = useSelector(state => state.itemTotalPrice)
  const cartData = useSelector(state => state.cartData)
  const foodData = useSelector(state => state.foodList)

  const dispatch = useDispatch()

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(API_URLS.DISPLAY_FOOD_DATA, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const displayData = await response.json()

        if (displayData.foodData.length > 0) {
          dispatch(setInitialData({ quantities: displayData.foodData.length, type: 'SET_QUANTITY' }))

          displayData.foodData.forEach((item) => {
            let price = item.CategoryName === 'Pizza' ? item.price[0].regular : item.price
            dispatch(setInitialData({ price: price, type: 'SET_PRICE' }))
          });

          dispatch(filterFoodList({ data: displayData.foodData, type: 'SET_FOOD_LIST' }))
        }
        if (displayData.foodCategory.length > 0) {
          setFoodCat(displayData.foodCategory)
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);


  const changeQuantity = (type, index, name) => {

    dispatch(handleQuantity({
      type: type,
      index
    }))

    if (quantity[index] === 1) {
      let cartIndex = cartData.length > 0 ? cartData.findIndex(((data) => data.name === name)) : -1
      if (cartIndex !== -1) {
        dispatch(handleCart({
          type: 'REMOVE_FROM_CART',
          index: cartIndex
        }))
      }
    }
  }

  const handleAddToCart = (index, name) => {

    let cartIndex = cartData.length > 0 ? cartData.findIndex(((data) => data.name === name)) : -1

    if (cartIndex !== -1) {
      dispatch(handleCart({
        type: 'UPDATE_TO_CART',
        name: name,
        cartIndex: cartIndex,
        index
      }))
    } else {
      if (itemTotalPrice[index] > 0) {
        dispatch(handleCart({
          type: 'ADD_TO_CART',
          name: name,
          index
        }))
      } else {
        alert('Please add atleast 1 quantity to add to cart.')
      }
    }
  }

  let indexCount = 0;

  return (
    <div className='food-card-container container'>
      {foodCat.length === 0 ? (
        <h1>No data available</h1>
      ) : (
        <>
          {foodCat.map((name) => {
            const filteredItems = foodData.filter((data) => data.CategoryName === name.CategoryName);
            return filteredItems.length > 0 ?
              <div className='row mb-3' key={name._id}>
                <h1 className='fs-3 m-3'>
                  {name.CategoryName}
                </h1>
                <hr />
                {foodData.length === 0 ? (
                  <h1>No data available</h1>
                ) : (
                  foodData.filter((data) => data.CategoryName === name.CategoryName).map((item) => {
                    const itemIndex = indexCount++;
                    return (
                      <div className="col-md-4 mb-3" key={item._id}>
                        <div className="card food-card">
                          <img src={item.img} className="card-img-top" alt="img" style={{ height: '240px' }} />

                          <div className="card-body h-180px">
                            <h5 className="card-title fw-bold">{item.name}</h5>
                            <p className="card-text">{item.description}</p>
                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                              <button
                                type="button"
                                className="btn btn-outline-success"
                                onClick={() => changeQuantity('decrement', itemIndex, item.name)}
                              >-
                              </button>

                              <button
                                className="btn btn-outline-success text-white bg-success"
                                disabled>{quantity[itemIndex]}
                              </button>

                              <button
                                type="button"
                                className="btn btn-outline-success"
                                onClick={() => changeQuantity('increment', itemIndex)}
                              >+</button>

                              <div style={{ marginLeft: '25px' }}>
                                Price: Rs. {price[itemIndex]}
                              </div>
                            </div>
                            <p className="card-text ml-4">
                              Total: Rs. {itemTotalPrice[itemIndex]}
                            </p>
                          </div>
                          <button
                            className='bg-success text-white fw-bold rounded-2'
                            onClick={() => handleAddToCart(itemIndex, item.name)}
                          >Add to Cart
                          </button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div> : null
          })}
        </>
      )}
    </div>
  )
}

export default Cards
