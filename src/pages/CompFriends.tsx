import React, {useContext} from 'react';
import {UserContext} from '../providers/userProvider'
//Components
import Friends from "../components/Friends.jsx"
import Chargment from '../components/Chargment';
//Type
import { USER } from "./Comp"

const CompFriends = () => {
    const user : USER = useContext(UserContext)
    if(user && user.friends){
        return <Friends user={user}/>
    }else{
        return <Chargment />
    }
};

export default CompFriends;