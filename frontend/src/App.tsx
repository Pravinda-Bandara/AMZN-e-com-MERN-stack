import {Badge, Button, Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";
import React, {useContext, useEffect} from "react";
import {Store} from "./Store.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {LinkContainer} from "react-router-bootstrap";
import {userInfo} from "node:os";

function App() {
    const {state:{mode,cart,userInfo},dispatch} = useContext(Store)
    useEffect(() => {
        document.body.setAttribute('data-bs-theme', mode)
    }, [mode])
    const switchModeHandler =()=>{
        dispatch({type:'SWITCH_MODE'})
    }
    const signoutHandler =()=>{
        dispatch({type:"USER_SIGNOUT"})
        localStorage.removeItem('userInfo')
        localStorage.removeItem('cartItems')
        localStorage.removeItem('shippingAddress')
        localStorage.removeItem('paymentMethod')
        window.location.href='/signin'
    }
  return (
    <div className='d-flex flex-column vh-100'>
        <ToastContainer position="bottom-center" limit={1}/>
        <header>
            <Navbar expand="lg" className="border-bottom border-2">
                <Container>
                    {/*<LinkContainer to="/">

                    </LinkContainer>*/}
                    <Navbar.Brand href="/">tsamazona</Navbar.Brand>{/*npm i react-router-bootstrap*/}

                </Container>
                <Nav>
                    <Button variant={mode} onClick={switchModeHandler}>
                        <i className={mode === 'light' ? 'fa fa-moon' : 'fa fa-sun'}
                        ></i>
                    </Button>

                    <Link to="/cart" className="nav-link">
                        Cart
                        {cart.cartItems.length > 0 && (
                            <Badge pill bg="danger">
                                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                            </Badge>
                        )}
                    </Link>
                    {userInfo?(
                        <NavDropdown title={ userInfo.name} id="basic-nav-dropdown">
                            <Link to="#signout" className="dropdown-item" onClick={signoutHandler}>
                                Sign Out
                            </Link>
                        </NavDropdown>
                    ):(
                        <Link to="/signin" className="nav-link">
                            Sign In
                        </Link>
                    )}
                </Nav>
            </Navbar>
        </header>
        <main>
            <Container className="mt-3">
                <Outlet/>
            </Container>

        </main>
        <footer>
            <div className="text-center">
                All rights reserved
            </div>
        </footer>
    </div>
  )
}

export default App
