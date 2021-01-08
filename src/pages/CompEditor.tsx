import React, {useContext} from 'react';
import Editor from "../components/Editor"
import {CurrentLeconContext} from "../providers/currentLeçonProvider"
import NotFound from "../pages/NotFound"

const CompEditor = () => {
    const {currentLeçon , setCurrentLeçon} = useContext(CurrentLeconContext)
    if(currentLeçon.cours){
        return (
            <Editor currentLeçon={currentLeçon}setCurrentLeçon={setCurrentLeçon}/>
        );
    }else{
        return(
            <NotFound />
        )
    }
};

export default CompEditor;