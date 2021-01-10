import React, {useState} from 'react';
//Components
import NavbarConnect from "./Navbar"
import SvgTemplate from "./SvgTemplate"
import EachFriends from "./EachFriends"
import AddAcceptFriends from './AddAcceptFriends'

const Friends = ({user}) => {
    const [modal,setModal] = useState(true)
    const friends = user.friends
    return (
        <>
        <SvgTemplate>
            {modal &&(
                <AddAcceptFriends/>
            )}
            <NavbarConnect />
            <div className="friends">
                <div className="addFriendImg" onClick={() => setModal(true)}>
                    <img src={require('../img/add-friend.png')} alt="add-friend"/>
                </div>
            {friends.length === 0 ? (
                <p className="noFriends">Vous n'avez aucun amis pour l'instant</p>
            ) :(
                friends.map(friend =>(
                    <EachFriends key={friend.uid} friend={friend}/>
                ))
            )
            }
            </div>
        </SvgTemplate>
        </>
    )
};

export default Friends;