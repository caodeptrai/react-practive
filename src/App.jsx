
import { Container } from 'react-bootstrap'
import './App.scss'
import Header from './components/header/Header'
import TableUsers from './components/tableUsers/TableUsers'

function App() {


  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>

          <TableUsers />
        </Container>
      </div>
    </>
  )
}

export default App
