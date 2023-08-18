import './App.css';
import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';
import Header from './layout/header';

const App = () => {
  return (
    <div className="App bg-dark">
      <Header />

      <main>
        <Container className="py-3" >
          <Outlet />
        </Container>
      </main>
    </div>
  );
}

export default App;
