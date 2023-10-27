import React from 'react'
import { useSelector } from 'react-redux'

const User = ({user}) => { 
    return (
        <div>
        {user.username} {user.blogs.length}
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