import React from 'react'
import { ContentProps, Flight } from '../types'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FlightDetails from './Flight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud , faCalendarDays, faEye } from '@fortawesome/free-solid-svg-icons'

const Content : React.FC<ContentProps> = ({flightParts}) => {
    return (
        <div style={{marginBottom:"20px"}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth:650}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>
                                Date <FontAwesomeIcon icon={faCalendarDays} fade size="lg" style={{color: "#000000",}} />
                            </TableCell>
                            <TableCell align='center'>
                                Weather <FontAwesomeIcon icon={faCloud} fade size="lg" style={{color: "#000000",}} />
                            </TableCell>
                            <TableCell align='center'>
                                Visibility <FontAwesomeIcon icon={faEye} fade size="lg" style={{color: "#000000",}} />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {flightParts.map((flight: Flight) => (
                    <TableRow key={flight.date}>
                        <FlightDetails flight={flight} />
                    </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
      );
}

export default Content