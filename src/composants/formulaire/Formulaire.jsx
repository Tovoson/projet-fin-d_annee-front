import { useEffect, useState } from 'react'
import './formulaire.scss'
import Recherche from '../recherche/Recherche'
import {Button} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../Axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Formulaire = () => {

    const [nom, setNom] = useState('')
    const [qte, setQte] = useState('')
    const [dispo, setDispo] = useState('Disponible')
    const navigate = useNavigate()
    const MyParam = useParams()
    const MyId = MyParam.id
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const storedAdmin = localStorage.getItem('admin');
        if (storedAdmin) {
        setAdminData(JSON.parse(storedAdmin));
        }
    }, []);

    const GetData = () =>{
        AxiosInstance.get(`materiel/${MyId}/`).then((res)=>{
            setNom(res.data.nom_materiel)
            setQte(res.data.nombre)
            setDispo(res.data.status)
        }).catch(error => {
            if (error.response) {
                // Le backend a renvoyé une réponse d'erreur
                console.log('Erreur:', error.response.data);
            } else if (error.request) {
                // La requête a été envoyée mais aucune réponse n'a été reçue
                console.log('Erreur de réseau ou absence de réponse du serveur');
            } else {
                // Une autre erreur s'est produite
                console.log('Erreur:', error.message);
            }
        });
    }

    useEffect(() =>{
        GetData();
        
    }, [MyId])

    const handleSubmit = () => {

        AxiosInstance.post('materiel/',{
            nom_materiel: nom,
            nombre: qte,
            id_admin: adminData.id_admin,
            status: dispo
            }
        ).then(response => {
            toast.success('Matériel ajouté avec succès !', {
                autoClose: 3000, // Durée d'affichage en millisecondes
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            console.log('Réponse réussie:', response);
            navigate('../liste')
            
        })
        .catch(error => {
            console.log('Erreur:', error.response.data);
            toast.error('Une erreur est survenue.', {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });  // Affiche les détails de l'erreur
        });

        
    }

    const handleModifier = () =>{

        AxiosInstance.put(`materiel/${MyId}/`,{
            nom_materiel: nom,
            nombre: qte,
            id_admin: 1,
            status: dispo
            }
            
        ).then(response => {
            navigate('../liste')
            console.log('Réponse réussie:', response);
            toast.success('Matériel ajouté avec succès !', {
                autoClose: 3000, // Durée d'affichage en millisecondes
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        })
        .catch(error => {
            console.log('Erreur:', error.response.data);
            toast.error('Une erreur est survenue.', {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });  // Affiche les détails de l'erreur
        });
    }

    return (
        <div className="m-formulaire">
        
            <h1>{ MyId ? "Modifier les matériels" : "ajouter Matériel"}</h1>
            <div className="form">
                <div className="inputs">
                    <input 
                        type="text" 
                        value = {nom} 
                        onChange={(e) => setNom(e.target.value)} 
                        placeholder='Nom du matériel'
                    />

                    <input 
                        type="number" 
                        placeholder='nombre' 
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
                        {/* <option value="utilise">Utilisé</option>
                        <option value="rendu">Rendu</option> */}
                    </select>
                    <Button 
                        variant='contained' 
                        onClick={ MyId ? handleModifier : handleSubmit}
                    >
                        {MyId ? "Modifier" : "Ajouter"}
                    </Button>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Formulaire

