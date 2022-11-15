import { Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { HashRouter as Router, Routes } from 'react-router-dom'
import EditScreen from './components/EditScreen';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import UserListScreen from './components/UserListScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='my-4'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/admin/edit/:id' element={<EditScreen />} />
            <Route path='/admin/userslist' element={<UserListScreen />} />
          </Routes>
        </Container>
      </main>
    </Router>

  );
}

export default App;
