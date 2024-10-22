import React from 'react'
import './archive.scss'
import Recherche from '../recherche/Recherche'
import TableauEmprunt from '../table/TableauEmp'
import Stat from '../stat/Stat'

const Archive = () => {

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
        <div className="contenu">
            <div className="enTete">
                <Recherche val = {false}/>

                <div className="filtre">
                    <select 
                        id="device" 
                        name="device"
                        value = {""}
                        onChange={() => {}}
                        >
                        <option value="nomMat">Nom du matériel</option>
                    </select>
                    <span>Générer pdf</span>
                </div>

            </div>
            <div className="tableau">
                <TableauEmprunt val = {false}/>
            </div>
            <div className="stat">
                < Stat 
                    listes = {listes}
                />
            </div>
        </div>
    )
}

export default Archive
