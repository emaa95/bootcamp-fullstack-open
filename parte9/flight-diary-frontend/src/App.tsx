import { useEffect, useState } from 'react'
import { Flight } from './types'
import { getAllFlights } from './services/flightService'
import Content from './components/Content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [flights, setFlights] = useState<Flight[]>([])
  
  useEffect(() => {
    getAllFlights().then(data => {
      setFlights(data)
    })
  }, [])

  return (
    <>
      <div>
        <h1>Flights <FontAwesomeIcon icon={faPlane} bounce /></h1>
        <Content flightParts={flights}></Content>
      </div>
    </>
  )
}

export default App
