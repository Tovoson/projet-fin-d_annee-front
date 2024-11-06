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
import { creerUtilisation } from '../gererMateriel'

const Mouvements = () => {
    const [afficheModale, setAfficheModale] = useState(false)

    const [formData, setFormData] = useState({
        matricule: '',
        nom: '',
        telephone: '',
        niveau: '',
        nombre: '1',
        date_debut: '',
        date_fin_prevu: '',
        id_materiels : '',
    });

    // const [id_materiels, setMateriel] = useState('')

    const [myData, setMyData] = useState()
    const [myAllData, setAllMyData] = useState()
    const [Id, setId] = useState('')
    const [Id2, setId2] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const val = true

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const storedAdmin = localStorage.getItem('admin');
        if (storedAdmin) {
        setAdminData(JSON.parse(storedAdmin));
        }
    }, []);

    const handleFermerModale = () =>{
        setAfficheModale(false)
    }

    const GetAllData = () =>{
        AxiosInstance.get('utilisation/').then((res)=>{
            // console.log(res.data)
            setAllMyData(res.data.non_rendus)
            // setLoading(false)
        })
        .catch((error) => {
            console.error("Erreur dans GetAllData:", error);
        });
    }

    const GetData = () => {
        AxiosInstance.get('materiel/').then((res) => {
            setMyData(res.data);
            // Initialiser id_materiels avec le premier matériel si disponible
            if (res.data && res.data.length > 0) {
                setFormData(prev => ({
                    ...prev,
                    id_materiels: res.data[0].id_materiel
                }));
            }
        }).catch(error => {
            console.error("Erreur lors du chargement des matériels:", error);
            setError("Erreur lors du chargement des matériels");
        });
    }

    useEffect(()=>{
        GetData();
        GetAllData();
    },[])

    
    const handleSubmit = async (e) => {
        setLoading(true);
        setError('');

        if (!formData.id_materiels) {
            setError('Veuillez sélectionner un matériel');
            setLoading(false);
            return;
        }
    
        if (!formData.matricule || !formData.nom || !formData.telephone || 
            !formData.date_debut || !formData.date_fin_prevu) {

            setError('Veuillez remplir tous les champs obligatoires');
            setTimeout(() => {    
                setError('');
            }, 2000);

            setLoading(false);
            return;
        }
    
        const donnees = {
            ...formData,
            id_admin: adminData?.id_admin
        };
    
        console.log(donnees.id_materiels)
        const resultat = await creerUtilisation(donnees);
    
        if (resultat.success) {
        //   onSuccess && onSuccess();
          // Réinitialiser le formulaire
          setFormData({
            matricule: '',
            nom: '',
            telephone: '',
            niveau: '',
            nombre: '1',
            date_debut: '',
            id_materiels: myData[0]?.id_materiel || ''
          });
        } else {
          setError(resultat.message);
        }
    
        setLoading(false);
      };    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
 
    
    return (
        <div className="contenu">
            <div className="form">
                <div className="element">
                    <div className="elem1">

                        <select 
                            id="device" 
                            name="id_materiels"
                            value = {formData.id_materiels}
                            onChange={handleChange}
                            // onChange={(e) => console.log(e.target.value)}
                            
                            >
                            {
                                myData && myData.length > 0 && myData.map((myD) =>(
                                    <option 
                                        value={myD.id_materiel} 
                                        key={myD.id_materiel}
                                    >
                                        {myD.nom_materiel} 
                                    </option>
                                ))
                            }
                        </select>
                        <input 
                            type="datetime-local" 
                            className='dates'
                            name = 'date_debut'
                            value = {formData.date_debut}
                            onChange={handleChange}
                        />
                        <input 
                            type="datetime-local" 
                            className='dates'
                            name='date_fin_prevu'
                            value = {formData.date_fin_prevu}
                            onChange={handleChange}
                        />
                        <input 
                            type="number" 
                            placeholder="Nombre"
                            name = 'nombre'
                            value = {formData.nombre}
                            onChange={handleChange}
                        />
                        
                    </div>
                    {/* --------------------------- */}
                    {/* --------------------------- */}
                    <div className="elem2">
                        <input 
                            type="text" 
                            placeholder='Matricule'
                            name = 'matricule'
                            value={formData.matricule}
                            onChange={handleChange}
                        />
                        <input 
                            type="text" 
                            placeholder='Nom'
                            name = 'nom'
                            value={formData.nom}
                            onChange={handleChange}
                        />
                        <select 
                            id="device" 
                            name="niveau"
                            value={formData.niveau}
                            onChange={handleChange}
                            >
                            <option value="L1">L1</option>
                            <option value="L2">L2</option>
                            <option value="L3">L3</option>
                            <option value="M1">M1</option>
                            <option value="M2">M2</option>
                        </select>
                        <input 
                            type="tel" 
                            name = 'telephone'
                            placeholder='telephone'
                            value={formData.telephone}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="btn">
                    <Button 
                        variant='contained' 
                        onClick={handleSubmit} 
                        // disabled = {loading || parseInt(formData.nombre) > parseInt(materiel.nombre)} 
                    >
                        {loading ? 'En cours...' : 'Valider'}
                    </Button>
                    <Button variant='contained' sx={{ backgroundColor: '#d0e1ff', color : '#1a3d7c'}} type='reset'>Reinitialiser</Button>
                </div>
                {error && <div className="error-message">{error}</div>}
            </div>
            <div className="tableau">
                < Tb2 
                    myData = {myAllData}
                    setAfficheModale = {setAfficheModale}
                    setId = {setId2}
                />
            </div>
            < Stat />
            
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
