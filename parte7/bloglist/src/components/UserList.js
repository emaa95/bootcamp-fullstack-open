import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({user}) => { 
    return (
        <div>
            <Link to={`/users/${user.id}`}>{user.username}</Link>  {user.blogs.length}
        </div>
    )

}

function UserList() {
    
    const users = useSelector(state => state.user)
    console.log(users)
    return (
    <div>
    <h2>Users</h2>
    {users.map(user => 
        <User key={user.id} user = {user}/>
    )}
    </div>

  )
}

export default UserList