import React, { useEffect, useState } from 'react'
import './menuCentre.scss'
import Recherche from '../recherche/Recherche';
import AxiosInstance from '../Axios';
import Example from '../table/Tableau';
import ConfirmationModal from '../mouvements/modale/Modale';
import { useNavigate } from 'react-router-dom';

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const Centre = () => {
    const [loading, setLoading] = useState(true)
    const [myData, setMyData] = useState()
    const [afficheModale, setAfficheModale] = useState(false)
    const [id, setId] = useState('')

    const navigate = useNavigate()
    const rediriger = () =>{
        navigate('../ajoutMateriel')
    }

    const handleFermerModale = () =>{
        setAfficheModale(false)
    }

    const GetData = () =>{
        AxiosInstance.get('materiel/').then((res)=>{
            console.log(res.data)
            setMyData(res.data)
            setLoading(false)
        })
    }

    useEffect(()=>{
        GetData();
    },[])

    return (
        <div className="m-centre">
            <h2>Liste des matériels</h2>
            <div className="tableau">
                <div className="ajouter" onClick={rediriger}>
                    <PersonAddAlt1Icon className='icon_ajout'/>
                    <span>Nouveau étudiant</span>
                </div>
                {loading ? 
                    <h2>Données en chargement ...</h2>
                    : 
                    <Example
                        myData = {myData}
                        setAfficheModale = {setAfficheModale}
                        setId = {setId}
                     
                     />
                }
            </div>
            {afficheModale ? 
                <ConfirmationModal 
                    afficheModale = {afficheModale} 
                    onClose = {handleFermerModale}
                    val = {false}
                    id = {id}
                    actualiserData = {GetData}
                   
                /> 
                : ''}
        </div>
    )
}

export default Centre