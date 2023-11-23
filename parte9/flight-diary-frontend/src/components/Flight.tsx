import React from 'react'
import { FlightProps } from '../types'
import { TableCell } from '@mui/material'

const FlightDetails : React.FC<FlightProps> = ({flight}) => {
    return (
            <>
            <TableCell align='center'>{flight.date} </TableCell>
            <TableCell align='center'>{flight.weather}</TableCell>
            <TableCell align='center'>{flight.visibility}</TableCell>
            </>
    )
}

export default FlightDetails