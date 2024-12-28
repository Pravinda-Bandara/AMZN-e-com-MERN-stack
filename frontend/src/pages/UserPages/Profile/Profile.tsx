import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Store } from '../../../Store.tsx';

export default function ProfilePage() {
    const { state } = useContext(Store);
    const { userInfo } = state;

    return (
        <div className="w-full h-[500px] flex items-center justify-center">
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Container className="w-full max-w-7xl">
                <Row className="justify-content-center">
                    <Col lg={4} className="d-flex justify-content-center mb-6">
                        {/* Profile Image */}
                        <div className="profile-image-container flex justify-center items-center">
                            <img
                                src={userInfo?.imageUrl || 'https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small_2x/user-icon-on-transparent-background-free-png.png'}  // Default avatar if no image is available
                                alt="Profile"
                                className="rounded-full w-40 h-40 object-cover"
                            />
                        </div>
                    </Col>
                    <Col lg={6} className="d-flex flex-column justify-content-center">
                        {/* Profile Information */}
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-semibold text-gray-800">Profile Details</h2>
                        </div>
                        <div className="mb-6">
                            <p className="text-sm font-medium text-gray-700">Full Name:</p>
                            <p className="text-lg text-gray-900">{userInfo?.name}</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-sm font-medium text-gray-700">Email Address:</p>
                            <p className="text-lg text-gray-900">{userInfo?.email}</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-sm font-medium text-gray-700">Account Type:</p>
                            <p className="text-lg text-gray-900">
                                {userInfo?.isAdmin ? 'Administrator' : 'Standard User'}
                            </p>
                        </div>
                        <div className="text-center">
                            <Button href="/edit-profile" className="customOrangeButton px-6 py-3 text-lg font-medium">
                                Edit Profile
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
