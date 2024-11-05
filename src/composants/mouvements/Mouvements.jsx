import React, { useEffect, useState } from 'react'
import './mouvement.scss'
import { Button } from '@mui/material'
import TableauEmprunt from '../table/TableauEmp'
import ConfirmationModal from './modale/Modale'
import Stat from '../stat/Stat'
import AxiosInstance from '../Axios'
import { toast, ToastContainer } from 'react-toastify'
import Example from '../table/Tableau'
import Tb2 from '../table/TableauEmp'

const Mouvements = () => {
    const [afficheModale, setAfficheModale] = useState(false)
    const [matr, setMatricule] = useState('')
    const [noms, setNom] = useState('')
    const [tel, setTel] = useState('')
    const [niv, setNiveau] = useState('')
    const [debut, setDebut] = useState('')
    const [fin, setFin] = useState('')
    const [nbr, setNbr] = useState('')
    const [materiel, setMateriel] = useState('')
    const [dispo, setDispo] = useState('')
    const [myData, setMyData] = useState()
    const [myAllData, setAllMyData] = useState()
    const [Id, setId] = useState('')
    const [Id2, setId2] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const val = true


    const handleFermerModale = () =>{
        setAfficheModale(false)
    }

    const handleClickElement = (nombres) =>{
        // if(nombres < 1){
        //     setDisabled(true)
        // }
        console.log(nombres)
    }

    const GetAllData = () =>{
        AxiosInstance.get('utilisation/').then((res)=>{
            console.log(res.data)
            setAllMyData(res.data)
            // setLoading(false)
        })
        .catch((error) => {
            console.error("Erreur dans GetAllData:", error);
        });
    }

    const GetData = () =>{
        AxiosInstance.get('materiel/').then((res)=>{
            // console.log(res.data)
            setMyData(res.data)
            // setLoading(false)
        })
    }

    useEffect(()=>{
        GetData();
        GetAllData();
    },[])

    const handleValide = () =>{

        const dateD = new Date(debut);
        const dateF = new Date(fin);
        const formattedDateDebut = `${String(dateD.getDate()).padStart(2, '0')}/${String(dateD.getMonth() + 1).padStart(2, '0')}/${dateD.getFullYear()} ${String(dateD.getHours()).padStart(2, '0')}h${String(dateD.getMinutes()).padStart(2, '0')}`;
        const formattedDateFin = `${String(dateF.getDate()).padStart(2, '0')}/${String(dateF.getMonth() + 1).padStart(2, '0')}/${dateF.getFullYear()} ${String(dateF.getHours()).padStart(2, '0')}h${String(dateF.getMinutes()).padStart(2, '0')}`;
    
        AxiosInstance.post('utilisation/',{
            id_admin: 1,
            id_materiel: Id,
            matricule: matr,
            nom: noms,
            telephone: tel,
            niveau: niv,
            date_debut: dateD,
            date_fin_prevu: dateF,
            nombre: nbr,
            estRendu: false,
            
            }
        ).then(response => {
            toast.success('utilisation ajouté avec succès !', {
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
            console.log('Erreur:', error.response);
            // toast.error('Une erreur est survenue.', {
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            // });  // Affiche les détails de l'erreur
        });

    }

    const handleChange = (event) => {
        const selectedNomMateriel = event.target.value;
        const selectedItem = myData.find(item => item.nom_materiel === selectedNomMateriel);
        console.log('id_materiel ' +selectedItem.id_materiel)
        setId(selectedItem.id_materiel)

        if (selectedItem) {
            console.log(selectedItem.nombre); // Affiche la valeur de 'nombre'
            
            setMateriel(selectedNomMateriel);
            // Mettez à jour le disabled en fonction de la valeur de nombres
            if (selectedItem.nombre < 1) {
                setDisabled(true);

            } else {
                setDisabled(false);
            }
        }
    };

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
                    <div className="elem1">

                        <select 
                            id="device" 
                            name="device"
                            value = {materiel}
                            // onChange={(e) => setMateriel(e.target.value)}
                            onChange={handleChange}
                            >
                            {
                                myData && myData.length > 0 && myData.map((myD) =>(
                                    <option 
                                        value={myD.nom_materiel} 
                                        key={myD.id_materiel}
                                        // onClick={() => handleClickElement(myD.nombre)}
                                    >
                                        {myD.nom_materiel}
                                    </option>
                                ))
                            }
                        </select>
                        <input 
                            type="datetime-local" 
                            className='dates'
                            value = {debut}
                            onChange={(e) => setDebut(e.target.value)}
                        />
                        <input 
                            type="datetime-local" 
                            className='dates'
                            value = {fin}
                            onChange={(e) => setFin(e.target.value)}
                        />
                        <input 
                            type="number" 
                            placeholder="Nombre"
                            value = {nbr}
                            onChange={(e) => setNbr(e.target.value)}
                        />
                        <select 
                            id="device" 
                            name="device"
                            disabled = { disabled }
                            value = {dispo}
                            onChange={(e) => setDispo(e.target.value)}
                            >
                            <option value="Disponible">Disponible</option>
                            <option value="nonDispo">Non disponible</option>
                        </select>
                    </div>
                    {/* --------------------------- */}
                    {/* --------------------------- */}
                    <div className="elem2">
                        <input 
                            type="text" 
                            placeholder='Matricule'
                            value={matr}
                            onChange={(e) => setMatricule(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder='Nom'
                            value={noms}
                            onChange={(e) => setNom(e.target.value)}
                        />
                        <select 
                            id="device" 
                            name="device"
                            value={niv}
                            onChange={(e) => setNiveau(e.target.value)}
                            >
                            <option value="L1">L1</option>
                            <option value="L2">L2</option>
                            <option value="L3">L3</option>
                            <option value="M1">M1</option>
                            <option value="M2">M2</option>
                        </select>
                        <input 
                            type="tel" 
                            placeholder='telephone'
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                        />
                    </div>
                </div>
                <div className="btn">
                    <Button variant='contained' onClick={handleValide} disabled = {disabled}>Valider</Button>
                    <Button variant='contained' sx={{ backgroundColor: '#d0e1ff', color : '#1a3d7c'}}>Reinitialiser</Button>
                </div>
            </div>
            <div className="tableau">
                {/* <TableauEmprunt setAfficheModale = {setAfficheModale} val ={true} /> */}
                < Tb2 
                    myData = {myAllData}
                    setAfficheModale = {setAfficheModale}
                    setId = {setId2}
                />
            </div>
            < Stat 
                    listes = {listes}
                />
            
            {afficheModale ? 
                <ConfirmationModal 
                    afficheModale = {afficheModale} 
                    onClose = {handleFermerModale} 
                    val = {val} 
                    id = {Id2}
                /> : ''}
            <ToastContainer />
        </div>
    )
}

export default Mouvements
