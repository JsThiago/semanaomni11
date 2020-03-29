import React, { useState } from 'react'
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'
import api from '../../service/api'
export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setcity] = useState('');
    const [uf, setUf] = useState('');
    const history = useHistory();
    async function handleRegister(e) {
        e.preventDefault();
        const data = { name, email, Whatsapp: whatsapp, city, uf }

        try {
            console.log('oi')
            const response = await api.post('ongs', data);
            console.log(response)
            alert(`seu ID se acesso: ${response.data.id}}`);
            history.push('/');
        } catch (e) {

            alert('Erro no cadastro, tente novamente.')
        }
    }
    return (
        <div className="registre-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>


                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="E02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input type="email" placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} />
                    <div className="input-group">
                        <input placeholder="Cidade"
                            value={city}
                            onChange={e => setcity(e.target.value)} />
                        <input placeholder="UF" style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)} />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}