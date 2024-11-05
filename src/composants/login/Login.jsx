import React, { useState } from 'react'
import './login.scss'
import { Button } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import AxiosInstance from '../Axios'
import { useLocalStorage } from '../../../useLocalStorage'

const Login = () => {
    const [visibilite, setVisibilite] = useState(false)
    const [visibiliteReg, setVisibiliteReg] = useState(false)
    const [nom, setNom] = useState('')
    const [id, setId] = useState('')
    const [mdp, setMdp] = useState('')
    const [btn, setBtn] = useState(false)

    const [logNom, setLogNom] = useLocalStorage("nom", '')

    const [mdpLog, setMdpLog] = useLocalStorage("psd", '')
    
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })

    const handleAvatar = (e) =>{
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const formData = new FormData();
    formData.append('id_admin', id);
    formData.append('nom_admin', nom);
    formData.append('photo_admin', avatar.file);
    formData.append('mot_de_passe', mdp);


    const handleRegister = (e) =>{
        e.preventDefault()
        AxiosInstance.post('admins/',formData,{
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        }
        ).then(response => {
            console.log('données ajouté avec succès:', response);
            setAvatar({
                file: null,
                url: ""
            })
       
        })
        .catch(error => {
            console.log('Erreur:', error.response);  // Affiche les détails de l'erreur
        });
        console.log( "identification " + id, nom, mdp, avatar)
            //  setBtn(true)
            
    }

    const handleClick = () =>{
        setVisibilite(!visibilite)
    }

    const handleClickReg = () =>{
        setVisibiliteReg(!visibiliteReg)
    }

    const handleLogin = () =>{
        
        // console.log(logNom + "Les formulaires")
        // console.log(mdpLog + "Les formulaires")
    }

    return (
        <div className="login-page">
            <div className="login">
                <h2>Login</h2>
                <form >
                    <input 
                        type="text" 
                        className='textIn' 
                        required
                        onChange={ (e) => setLogNom(e.target.value) }
                    />
                    <div className="psd">
                        <input 
                            type={visibilite ? "text" :"password"} 
                            className="psd_champ"
                            required
                            onChange={(e) => setMdpLog(e.target.value) }
                        />
                        <div onClick={handleClick}>
                            { visibilite 
                                ? <Visibility />
                                : <VisibilityOff />
                            }
                        </div>
                    </div>
                    <Button variant='contained' onClick={ handleLogin }>Connexion</Button>
                </form>
            </div>
{/* ---------------------------------------------------------------------------------------------------- */}
{/* ---------------------------------------Register------------------------------------------------------------- */}
{/* ---------------------------------------------------------------------------------------------------- */}
            <div className="register">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || './icons8-g-48.png'} alt="" /> Telechager une image
                    </label>
                    <input 
                        type="file" 
                        id='file' 
                        style={{display: 'none'}} 
                        onChange={handleAvatar}
                    />
                    <input 
                        type="text" 
                        className='textIn' 
                        placeholder='Id' 
                        required
                        onChange={(e) => setId(e.target.value) }
                    />
                    <input 
                        type="text" 
                        className='textIn' 
                        placeholder='Nom et prenom' 
                        required
                        onChange={(e) => setNom(e.target.value) }
                    />
                    
                    <div className="psd">
                        <input 
                            type={visibiliteReg ? "text" :"password"} 
                            className="psd_champ"
                            required
                            onChange={(e) => setMdp(e.target.value) }
                        />
                        <div onClick={handleClickReg}>
                            { visibiliteReg 
                                ? <Visibility />
                                :<VisibilityOff />
                            }
                        </div>
                    </div>
                    <Button 
                        variant='contained' 
                        onClick={handleRegister}
                        className={btn ? 'btn' : ''}
                    >
                        { btn ? 'Chargement...' : 'Créer'}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Login
