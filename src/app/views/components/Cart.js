import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart, removeFromCart } from '../../lib/actions';
import { Link } from 'react-router-dom';
import '../../styles/App.css';

const Row = ({ item }) => {
  const { id, quantity, details } = item;
  const [qty, setQty] = useState(quantity);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // console.log(qty)
  //   update(id, qty)
  // }, [qty])

  return (
    <tr>
      <td>
        <img
          width='70'
          height='70'
          src={`/assets/${details.category}/${details.image}`}
          alt={details.name}
        />
      </td>
      <td>{details.ref}</td>
      <td>€{details.price}</td>
      <td>
        <div className='btn-group' role='group' aria-label='Basic example'>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() => {
              if (qty > 1) {
                setQty(qty - 1);
                dispatch(updateCart(id, quantity - 1));
              }
            }}
          >
            -
          </button>
          <span className='btn btn-light'>{qty}</span>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() => {
              setQty(qty + 1);
              dispatch(updateCart(id, quantity + 1));
            }}
          >
            +
          </button>
        </div>
      </td>
      <td>€{(quantity * details.price).toFixed(2)}</td>
      <td>
        <button
          type='button'
          className='btn btn-danger remove'
          onClick={() => dispatch(removeFromCart(item))}
        >
          X
        </button>
      </td>
    </tr>
  );
};

const Table = ({ items }) => {
  return (
    <table>
      <tr>
        <th width='200'>Product</th>
        <th width='80'>Reference</th>
        <th width='150'>Price</th>
        <th width='150'>Quantity</th>
        <th width='200'>Total</th>
      </tr>
      {items.map((item) => (
        <Row key={item.id} item={item} />
      ))}
    </table>
  );
};

export const CartPage = () => {
  const items = useSelector((state) => state.items);
  // console.log(items);
  const [subTotal, setSubTotal] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const shipping = 10.0;

  useEffect(() => {
    let totals = items.map((item) => item.quantity * item.details.price);
    setSubTotal(totals.reduce((item1, item2) => item1 + item2, 0));
    setTotal(subTotal + shipping);
  }, [items, subTotal, total]); // Why useEfect -> Neu ko use it, react chua render first, da change state -> error
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm cart'>
          <Table items={items} />
        </div>
        <div className='col-sm-3 order-summary'>
          <ul className='list-group'>
            <li className='list-group-item'>Order Summary</li>
            <li className='list-group-item'>
              <ul className='list-group flex'>
                <li className='text-left'>Subtotal</li>
                <li className='text-right'>€{subTotal.toFixed(2)}</li>
              </ul>
              <ul className='list-group flex'>
                <li className='text-left'>shipping</li>
                <li className='text-right'>€{shipping.toFixed(2)}</li>
              </ul>
              <ul className='list-group flex'>
                <li className='coupon crimson'>
                  <small>Add Coupon Code</small>
                </li>
              </ul>
            </li>

            <li className='list-group-item '>
              <ul className='list-group flex'>
                <li className='text-left'>Total</li>
                <li className='text-right'>
                  €{subTotal === 0.0 ? '0.00' : total.toFixed(2)}
                </li>
              </ul>
            </li>
          </ul>
          <Link
            to='/checkout'
            className={`btn btn-light ${
              !items.length && 'disabled'
            } btn-lg btn-block checkout bg-crimson`}
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

// Purpose: Get value from state in redux -> Render UI and tinh toan gia tri san pham