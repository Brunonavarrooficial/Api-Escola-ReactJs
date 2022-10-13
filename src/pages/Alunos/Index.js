import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';

import { AlunoContainer, ProfilePicture, NovoAluno } from './styled';

import axios from '../../services/axios';

import Loading from '../../components/loading';
import { toast } from 'react-toastify';

export default function Alunos() {
    const [alunos, setAlunos] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    React.useEffect(() => {
        async function getData() {            
            setIsloading(true);
            const response = await axios.get('/alunos');                                                
            setAlunos(response.data);
            if (response.data === 401 || response.data === 500) return toast.error('Sem Conexão http');                        
            setIsloading(false);
        }
        getData();
        
    }, []);

    const handleDeleteAsk = e => {
        e.preventDefault();
        const exclamation = e.currentTarget.nextSibling;
        exclamation.setAttribute('display', 'block');
        e.currentTarget.remove();
    };

    const handleDelete = async (e, id, index) => {
        e.persist();

        try {
            setIsloading(true);
            await axios.delete(`/alunos/${id}`);
            const novosAlunos = [...alunos];
            novosAlunos.splice(index, 1);
            setAlunos(novosAlunos);
            setIsloading(false);
        } catch (err) {
            const status = get(err, 'responde.status', 0);

            if(status === 401){
                toast.error('Você precisa fazer login');
            } else {
                toast.error('Ocorreu um erro ao excluir alunos');
            }
            
            setIsloading(false);
        }
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <h1>Alunos</h1>
            <NovoAluno to={'/aluno/'}>Novo Aluno</NovoAluno>
            <AlunoContainer>
                {alunos.map((aluno, index) => (
                    <div key={String(aluno.id)}>
                        <ProfilePicture>
                            {get(aluno, 'Fotos[0].url', false) ? (
                                <img src={aluno.Fotos[0].url} alt='' />
                            ) : (
                                <FaUserCircle size={36} />
                            )}
                        </ProfilePicture>
                        <span>{aluno.nome}</span>
                        <span>{aluno.email}</span>
                        <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/edit`}><FaEdit size={16} /></Link>
                        <Link to={`/aluno/${aluno.id}/delete`}><FaWindowClose size={16} /></Link>
                        <FaExclamation size={16} display='none' cursor='pointer' onClick={e => handleDelete(e, aluno.id, index)} />
                    </div>
                ))}
            </AlunoContainer>
        </ Container>
    );
}