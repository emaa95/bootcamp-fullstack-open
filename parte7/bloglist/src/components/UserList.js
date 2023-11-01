import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';

function UserList() {
  const users = useSelector(state => state.user);



  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper} sx={{ width: '50%'}}>
        <Table sx={{ minWidth: 650 }} aria-label="user table" size='small'>
          <TableHead>
            <TableRow>
              <TableCell size='small' align='center'>User</TableCell>
              <TableCell size='small' align='center'>Cantidad de blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell align='center' size='small'>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </TableCell>
                <TableCell align="center" size='small'>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserList;