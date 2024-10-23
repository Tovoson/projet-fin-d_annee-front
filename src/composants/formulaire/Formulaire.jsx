import { useEffect, useState } from 'react'
import './formulaire.scss'
import Recherche from '../recherche/Recherche'
import {Button} from '@mui/material'
import { useLocation } from 'react-router-dom';
import AxiosInstance from '../Axios';


const Formulaire = () => {

    const [nom, setNom] = useState('')
    const [qte, setQte] = useState('')
    const [dispo, setDispo] = useState('Disponible')
    const { state } = useLocation(); // Récupère les données passées via la navigation

    useEffect(() =>{
        if (state) {
            setNom(state.noms || '')
            setQte(state.nbrs || '')
            setDispo(state.stat || 'Disponible')
        }else{
            console.log('Aucun state')
        }
    }, [state])

    const handleSubmit = () => {
        console.log('Nom du matériel:', nom);
        console.log('Qté:', qte);
        console.log('Disponibilité:', dispo);
        console.log(Date.now());

        AxiosInstance.post('materiel/',{
            nom_materiel: nom,
            nombre: qte,
            id_admin: 'Tovoson_Admin',
            status: dispo
            }
        ).then(response => {
            console.log('Réponse réussie:', response);
        })
        .catch(error => {
            console.log('Erreur:', error.response.data);  // Affiche les détails de l'erreur
        });
    }

    const handleModifier = () =>{

        console.log('Modifié');
        console.log('Nom du matériel:', nom);
        console.log('Qté:', qte);
        console.log('Disponibilité:', dispo);
        console.log(Date.now());
    }

    return (
        <div className="m-formulaire">
            <Recherche/>
            <div className="form">
                <div className="inputs">
                    <input 
                        type="text" 
                        value = {nom} 
                        onChange={(e) => setNom(e.target.value)} 
                        placeholder='Nom du matériel'
                    />

                    <input 
                        type="text" 
                        placeholder='text' 
                        value={qte}
                        onChange={(e) => setQte(e.target.value)}
                        
                    />

                    <select 
                        id="device" 
                        name="device"
                        value = {dispo}
                        onChange={(e) => setDispo(e.target.value)}
                    >
                        <option value="disponible">Disponible</option>
                        <option value="utilise">Utilisé</option>
                        <option value="rendu">Rendu</option>
                    </select>
                    <Button 
                        variant='contained' 
                        onClick={ state ? handleModifier : handleSubmit}
                    >
                        Ajouter
                    </Button>
                </div>
                
            </div>
        </div>
    )
}

export default Formulaire

