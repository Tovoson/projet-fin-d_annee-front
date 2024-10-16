import { useState } from 'react'
import './formulaire.scss'
import Recherche from '../recherche/Recherche'
import {Button} from '@mui/material'
import { useLocation } from 'react-router-dom';


const Formulaire = () => {
    const [age, setAge] = useState('');
    const { state } = useLocation(); // Récupère les données passées via la navigation
    
    const matric = state?.Matric || null;
    const nom = state?.Noms || '';
    const niveaux = state?.niveaux || '';
    const roles = state?.roles || '';
    const tels = state?.tels || '';
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className="m-formulaire">
            <Recherche/>
            <div className="form">
                <div className="inputs">
                    <input type="text" value = {matric ? matric : ""} placeholder='Matricule'/>
                    <input type="text" placeholder='Nom et Prenom' value={matric ? nom : ""}/>
                    <input type="tel" placeholder='Téléphone' value={matric ? tels : ''}/>
                    <Button variant='contained'>Ajouter</Button>
                </div>
                <div className="radios">
                    <div className="element1">
                        <span>Niveau</span>
                        <label>
                            <input type="radio" name="niveau" value="L1"/> L1
                        </label>
                        <label>
                            <input type="radio" name="niveau" value="L2"/> L2
                        </label>
                        <label>
                            <input type="radio" name="niveau" value="L3"/> L3
                        </label>
                        <label>
                            <input type="radio" name="niveau" value="M1"/> M1
                        </label>
                        <label>
                            <input type="radio" name="niveau" value="M2"/> M2
                        </label>
                    </div>
                    <div className="element2">
                        <span>Rôle</span>
                        <label>
                            <input type="radio" name="role" value="Etudiant"/> Etudiant
                        </label>
                        <label>
                            <input type="radio" name="role" value="Enseingant"/> Enseignant
                        </label>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Formulaire
