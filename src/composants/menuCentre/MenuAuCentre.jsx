import React from 'react'
import './menuCentre.scss'
import DenseTable from '../table/Tableau';
import Recherche from '../recherche/Recherche';

const Centre = () => {
    return (
        <div className="m-centre">
            <Recherche val ={true} />
            
            <div className="tableau">
                <DenseTable 
                    IdMat = {'idMats'} 
                    Nom = {'Nom'} 
                    Nombre = {"Nombre"} 
                    Status = {"Status"}
                    DateEnr = {"Date Enr"}/>
            </div>
        </div>
    )
}

export default Centre