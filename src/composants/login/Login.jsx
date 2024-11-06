import { useState } from 'react'
import './login.scss'
import { Button } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import AxiosInstance from '../Axios'

const Login = ({setAdmin, baseURL}) => {
    const [visibilite, setVisibilite] = useState(false)
    const [visibiliteReg, setVisibiliteReg] = useState(false)
    const [nom, setNom] = useState('')
    const [id, setId] = useState('')
    const [mdp, setMdp] = useState('')
    const [btn, setBtn] = useState(false)
    const [loading, setLoading] = useState(false);
    
  const [error, setError] = useState('');
    
  const [idAdmin, setIdAdmin] = useState('');
  const [password, setPassword] = useState('');
    
    
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })

  const handleAvatar = (e) => {
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

  const handleRegister = (e) => {
    e.preventDefault()
    AxiosInstance.post('admins/', formData, {
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
    }).catch(error => {
      console.log('Erreur:', error.response);  // Affiche les détails de l'erreur
    });
    console.log("identification " + id, nom, mdp, avatar)
    setBtn(true)
  }

  const handleClick = () => {
    setVisibilite(!visibilite)
  }

  const handleClickReg = () => {
    setVisibiliteReg(!visibiliteReg)
  }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
    
        try {
            const response = await AxiosInstance.post('admins/auth_admin/', {
                id_admin: idAdmin,
                mot_de_passe: password
              });
    
          if (response.status === 200) {
            const adminData = response.data;
            // Construire l'URL complète pour la photo
            if (adminData.photo_admin) {
              adminData.photo_admin = `${baseURL}${adminData.photo_admin}`;
            }
            setAdmin(adminData);
            localStorage.setItem('admin', JSON.stringify(adminData));
          }
        } catch (error) {
          setError(error.response?.data?.error || 'Erreur lors de la connexion');
          localStorage.removeItem('admin');
          setAdmin(null);
        } finally {
          setLoading(false);
        }
      };

    return (
        <div className="login-page">
            <div className="login">
                <h2>Login</h2>
                <form >
                    <input 
                        type="text" 
                        className='textIn' 
                        required
                        onChange={ (e) => setIdAdmin(e.target.value) }
                    />
                    <div className="psd">
                        <input 
                            type={visibilite ? "text" :"password"} 
                            className="psd_champ"
                            required
                            onChange={(e) => setPassword(e.target.value) }
                        />
                        <div onClick={handleClick}>
                            { visibilite 
                                ? <Visibility />
                                : <VisibilityOff />
                            }
                        </div>
                    </div>
                    <Button variant='contained' onClick={ handleLogin } disabled={loading}>
                    {loading ? 'Connexion en cours...' : 'Se connecter'}
                    </Button>
                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md">
                        {error}
                        </div>
                    )}
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
