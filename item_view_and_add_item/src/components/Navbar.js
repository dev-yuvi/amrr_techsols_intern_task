import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <nav style={{
            display: 'flex',
            gap: '20px',
            padding: '10px',
            background: '#eee',
            position: 'fixed', // Makes the navbar fixed
            top: 0, // Positions it at the top
            width: '100%', // Ensures it spans the full width
            zIndex: 1000 // Ensures it stays above other elements
        }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>View Items</Link> 
        <Link to="/add" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Add Items</Link>
    </nav>
    );
}