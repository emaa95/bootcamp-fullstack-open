import { useEffect, useState } from 'react';
import { Flight} from './types';
import { getAllFlights} from './services/flightService';
import Content from './components/Content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import FlightForm from './components/FlightForm';

function App() {
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    getAllFlights().then((data) => {
      setFlights(data);
    });
  }, []);

  const handleNewFlight = (newFlight: Flight) => {
    setFlights((prevFlights) => [...prevFlights, newFlight]);
  };

  return (
    <>
      <div>
        <h1>
          Flights <FontAwesomeIcon icon={faPlane} bounce />
        </h1>
        <Content flightParts={flights}></Content>

        {/* Renderiza el componente FlightForm y pasa la función handleNewFlight como prop */}
        <FlightForm onNewFlight={handleNewFlight} />
      </div>
    </>
  );
}

export default App;