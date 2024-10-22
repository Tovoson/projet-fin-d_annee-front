import React, { useState } from 'react'
import './mouvement.scss'
import { Button } from '@mui/material'
import TableauEmprunt from '../table/TableauEmp'
import ConfirmationModal from './modale/Modale'
import Stat from '../stat/Stat'

const Mouvements = () => {
    const [afficheModale, setAfficheModale] = useState(false)

    const handleFermerModale = () =>{
        setAfficheModale(false)
    }

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
            <div className="form">
                <div className="element">

                    <input type="text" placeholder="Nom de l'emprenteur"/>
                    <select 
                        id="device" 
                        name="device"
                        value = {""}
                        onChange={() => {}}
                    >
                        <option value="nomMat">Nom du matériel</option>
                    </select>
                    <input type="number" placeholder="Nombre"/>
                    <input type="text" placeholder='date retour prévu'/>
                    <select 
                        id="device" 
                        name="device"
                        value = {"dispo"}
                        onChange={() => {}}
                    >
                        <option value="Disponible">Disponible</option>
                        <option value="nonDispo">Non disponible</option>
                    </select>
                </div>
                <div className="btn">
                    <Button variant='contained'>Valider</Button>
                    <Button variant='contained' sx={{ backgroundColor: '#ff5722'}}>Annuler</Button>
                </div>
            </div>
            <div className="tableau">
                <TableauEmprunt setAfficheModale = {setAfficheModale} val ={true} />
            </div>
            < Stat 
                    listes = {listes}
                />
            
            {afficheModale ? <ConfirmationModal afficheModale = {afficheModale} onClose = {handleFermerModale}/> : ''}
        </div>
    )
}

export default Mouvements
