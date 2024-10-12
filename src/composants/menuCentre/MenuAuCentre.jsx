import React from 'react'
import './menuCentre.scss'
import SearchIcon from '@mui/icons-material/Search';

const Centre = () => {
    return (
        <div className="m-centre">
            <div className="recherche">
                <SearchIcon className="icon"/>
                <input type="text" placeholder='Rechercher ...'/>
            </div>

            <div className="affiche">
                <div className="texte">
                    <h2>On peut voir tous les Utilisateur 
                        <br /> dans l'établissement ici</h2>
                </div>
            </div>
        </div>
    )
}

export default Centre