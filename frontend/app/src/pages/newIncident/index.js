import React, { useState } from 'react'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../service/api'
export default function Incident() {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    async function handleNewincident(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            value,
        }
        try {
            api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }

            });
            history.push('/profile');
        } catch (e) {
            alert('erro ao cadastrar')
        }

    }
    return (

        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>


                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="E02041" />
                        Voltar para home
                    </Link>
                </section>
                <form action="">

                    <input
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        placeholder="Título do caso" />

                    <textarea
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        placeholder="Descrição" />

                    <input
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        placeholder="Valor em reais" />

                    <button className="button" onClick={handleNewincident} type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}