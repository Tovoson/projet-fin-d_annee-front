import React, { useState } from 'react'
import './login.scss'
import { Button } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Login = () => {
    const [visibilite, setVisibilite] = useState(false)
    const [visibiliteReg, setVisibiliteReg] = useState(false)
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


    const handleRegister = (e) =>{
        e.preventDefault()
    }

    const handleClick = () =>{
        setVisibilite(!visibilite)
    }
    const handleClickReg = () =>{
        setVisibiliteReg(!visibiliteReg)
    }

    

    return (
        <div className="login-page">
            <div className="login">
                <h2>Login</h2>
                <form >
                    <input type="text" className='textIn' required/>
                    <div className="psd">
                        <input 
                            type={visibilite ? "text" :"password"} 
                            className="psd_champ"
                            required
                        />
                        <div onClick={handleClick}>
                            { visibilite 
                                ? <Visibility />
                                :<VisibilityOff />
                            }
                        </div>
                    </div>
                    <Button variant='contained'>Connexion</Button>
                </form>
            </div>
            <div className="register">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || './icons8-g-48.png'} alt="" /> Telechager une image
                    </label>
                    <input type="file" id='file' style={{display: 'none'}} onChange={handleAvatar}/>
                    <input type="text" className='textIn' placeholder='Id' required/>
                    <input type="text" className='textIn' placeholder='Nom et prenom' required/>
                    <input type="text" className='textIn' placeholder='fonction' required/>
                    <input type="text" className='textIn' placeholder='tel' required/>
                    <div className="psd">
                        <input 
                            type={visibiliteReg ? "text" :"password"} 
                            className="psd_champ"
                            required
                        />
                        <div onClick={handleClickReg}>
                            { visibiliteReg 
                                ? <Visibility />
                                :<VisibilityOff />
                            }
                        </div>
                    </div>
                    <Button variant='contained'>Créer</Button>
                </form>
            </div>
        </div>
    )
}

export default Login
