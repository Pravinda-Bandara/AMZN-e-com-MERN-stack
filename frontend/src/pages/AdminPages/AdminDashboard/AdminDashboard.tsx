// AdminDashboard.jsx
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} className="bg-gray-800 min-h-screen text-white">
          <h2 className="text-center py-4">Admin Panel</h2>
          <Nav className="flex-column px-3">
          <Nav.Link as={Link} to="/admin" className="text-gray-300 hover:text-white py-2">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/orders" className="text-gray-300 hover:text-white py-2">
              Orders
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/users" className="text-gray-300 hover:text-white py-2">
              Users
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/products" className="text-gray-300 hover:text-white py-2">
              Products
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
