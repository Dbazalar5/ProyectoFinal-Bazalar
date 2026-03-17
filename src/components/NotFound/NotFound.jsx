import { Link } from "react-router-dom";

const NotFound = () => {

  return (
    <div style={{textAlign: 'center', padding: '100px 20px'}}>
      <h1 style={{fontSize: '72px', marginBottom: '10px'}}>404</h1>
      <h2 style={{marginBottom: '20px', color: '#666'}}>Página no encontrada</h2>
      <p style={{marginBottom: '30px', color: '#999'}}>La página que buscas no existe o fue movida.</p>
      <Link to="/" style={{
        background: 'black',
        color: 'white',
        padding: '12px 30px',
        borderRadius: '10px',
        textDecoration: 'none',
        fontWeight: '700'
      }}>
        Volver al inicio
      </Link>
    </div>
  );

};

export default NotFound;