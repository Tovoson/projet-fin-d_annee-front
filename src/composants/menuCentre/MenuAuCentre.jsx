import React from 'react'
import './menuCentre.scss'
import DenseTable from '../table/Tableau';
import Recherche from '../recherche/Recherche';

const Centre = () => {
    return (
        <div className="m-centre">
            <Recherche/>
            
            <div className="tableau">
                <DenseTable />
            </div>
        </div>
    )
}

export default Centre