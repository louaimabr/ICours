import React, {useState} from 'react';
import ModalFriends from "./Modal/ModalFriends"
import {Tabs, Tab} from "./Tabs.jsx"
import {addFriend} from "../utils/utils"
const AddAcceptFriends = () => {
    const [friendAdd, setFriendAdd] = useState("")
    const add = (e) =>{
        e.preventDefault();
        addFriend(friendAdd)
    }
    return (
        <ModalFriends>
            <Tabs>
                <Tab title="Ajouter des amis" color="white" classN="friendAdd" selected>
                    <p>Ajoutez des amis pour pouvoir leur transférer vos <span>IKours</span> facilement.</p>
                    <form onSubmit={(e) => add(e)}>
                        <label htmlFor="friendAdd">Entrez l'adresse email de la personne que vous souhaitez ajoutez en ami.</label>
                        <input type="text" name="friendAdd" id="friendAdd" value={friendAdd} placeholder="Exemple : louaimabr@gmail.com" onChange={(e) => setFriendAdd(e.target.value)} required/>
                        <input type="submit" value="Ajouter" id="submitAddFriend"/>
                    </form>
                </Tab>
                <Tab title="Demandes d'amis" color="#44318d" classN="friendAsk">
                </Tab>
            </Tabs>
        </ModalFriends>
    );
};

export default AddAcceptFriends;