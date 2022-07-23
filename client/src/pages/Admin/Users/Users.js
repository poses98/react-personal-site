import React, {useEffect} from "react"
import {getUsersApi} from '../../../api/user'
import "./Users.scss"

export default function Users() {
    let userList = getUsersApi();

    
    console.log(userList)
    
    return (
        <div>
            <h2>Users</h2>
            <div>
            
            </div>
        </div>
        
    )
}