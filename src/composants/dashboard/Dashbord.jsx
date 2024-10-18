import React from 'react'
import './dashboard.scss'
import Recherche from '../recherche/Recherche'

const Dashbords = () => {
    return (
        <div className="dashboard">
            <div className="composant1">
                <div className='Tous'>
                    <img src="./icons8-tous-96.png" alt="" />
                    <div className="texte">
                        <span>58</span>
                        <span>Toutes les matériels</span>
                    </div>
                </div>
                <div className='Tous'>
                    <img src="./icons8-ok-188.png" alt="" />
                    <div className="texte">
                        <span>58</span>
                        <span>Matériels dispo</span>
                    </div>
                </div>
                <div className='Tous'>
                    <img src="./icons8-en-attente-100.png" alt="" />
                    <div className="texte">
                        <span>58</span>
                        <span>Utilisé</span>
                    </div>
                </div>
                
                
            </div>
            <div className="stat">
                stat
            </div>
            <div className="composant3">
                comp3
            </div>
        </div>
    )
}

export default Dashbords
