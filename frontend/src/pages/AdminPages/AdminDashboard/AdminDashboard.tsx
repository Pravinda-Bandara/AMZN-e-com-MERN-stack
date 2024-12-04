import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AdminDashboard() {
  const location = useLocation();

  return (
    <Container fluid className='flex justify-center w-full p-0 m-0'>
      <Row className='flex justify-center w-full'>
        {/* Sidebar */}
        <Col md={2} className="bg-light min-vh-100 text-dark">
          <h2 className="text-center py-4 h4">Admin Panel</h2>
          <Nav className="flex-column">
            <Nav.Link
              as={Link}
              to="/admin"
              className={`py-2 px-3 mb-2 rounded text-dark ${location.pathname === '/admin' ? 'bg-orange-500 text-white' : 'hover:bg-gray-200'}`}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/orders"
              className={`py-2 px-3 mb-2 rounded text-dark ${location.pathname === '/admin/orders' ? 'bg-orange-500 text-white' : 'hover:bg-gray-200'}`}
            >
              Orders
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/users"
              className={`py-2 px-3 mb-2 rounded text-dark ${location.pathname === '/admin/users' ? 'bg-orange-500 text-white' : 'hover:bg-gray-200'}`}
            >
              Users
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/products"
              className={`py-2 px-3 mb-2 rounded text-dark ${location.pathname === '/admin/products' ? 'bg-orange-500 text-white' : 'hover:bg-gray-200'}`}
            >
              Products
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={9} className="bg-white">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
