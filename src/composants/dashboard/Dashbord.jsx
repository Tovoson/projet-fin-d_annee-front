// import React from 'react'
import './dashboard.scss'
import Stat from '../stat/Stat'
import Charts from './figure/Chart'

const Dashbords = () => {
    const listes = [
        {
            id : 1,
            img : "./icons8-tous-96.png",
            nbr : 20,
            texte : "matériel emprunté le plus"
        },
        {
            id : 2,
            img : "./icons8-ok-188.png",
            nbr : 40,
            texte : "étudiant qui emprunte le plus"
        },
        {
            id : 3,
            img : "./icons8-en-attente-100.png",
            nbr : 70,
            texte : "admin qui fait emprunter le plus"
        }
    ]

    return (
        <div className="dashboard">
            < Stat 
                    listes = {listes}
                />
            <div className="stat">
                <Charts/>
            </div>
            <div className="composant3">
                comp3
            </div>
        </div>
    )
}

export default Dashbords
