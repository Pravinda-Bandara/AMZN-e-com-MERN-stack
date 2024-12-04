// ShippingAddressPage.tsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Store } from '../../../Store.tsx';
import CheckoutSteps from '../../../components/CheckoutSteps.tsx';
import ShippingAddressForm from './components/ShippingAdressForm.tsx';
import { Button } from 'react-bootstrap';

const ShippingAddressPage: React.FC = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(Store);
    const { userInfo, cart: { shippingAddress } } = state;

    const handleSubmit = (address: { fullName: string; address: string; city: string; postalCode: string; country: string }) => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: address,
        });
        localStorage.setItem('shippingAddress', JSON.stringify(address));
        navigate('/payment');
    };

    return (
        <div className='px-3'>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckoutSteps step1 step2 />
            <div className="container small-container">
                <h1 className="mt-3 h3 mx-2">Shipping Address</h1>
                <ShippingAddressForm shippingAddress={shippingAddress} onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default ShippingAddressPage;
