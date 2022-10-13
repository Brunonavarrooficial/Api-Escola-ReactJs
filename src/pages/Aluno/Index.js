import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/loading';
import axios from '../../services/axios'
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Alunos({ match }) {
    const dispatch = useDispatch();
    const id = get(match, 'params.id', 0);
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('');
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(!id) return;

        async function getData(){
            try {
                setIsLoading(true);
                const { data } = await axios.get(`/alunos/${id}`);
                const Foto = get(data, 'Fotos[0].url', '');
                
                setNome(data.nome);
                setSobrenome(data.sobrenome);
                setEmail(data.email);
                setIdade(data.idade);
                setPeso(data.peso);
                setAltura(data.altura);

                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                const status = get(err, 'response.status', 0);                                
                const errors = get(err, 'response.data.erros', []);                                

                if(status === 400) errors.map(error => toast.error(error));
                history.push('/');
            }
        }
        getData();
        
    },[id]);

    const handleSubmit = e => {
        e.preventDefault();
        let formErrors = false;

        if(nome.length < 3 || nome.length > 255) {
            toast.error('nome precisa ter entre 3 e 255 caracteres');
            formErrors = true;
        }
        
        if(sobrenome.length < 3 || sobrenome.length > 255) {
            toast.error('Sobrenome precisa ter entre 3 e 255 caracteres');
            formErrors = true;
        }

        if(!isEmail(email)){
            toast.error('E-mail inválido');
            formErrors = true;
        }

        if(!isInt(String(idade))) {
            toast.error('Idade inválida');
            formErrors = true;
        }

        if(!isFloat(String(peso))) {
            toast.error('Peso inválida');
            formErrors = true;
        }

        if(!isFloat(String(altura))) {
            toast.error('Altura inválida');
            formErrors = true;
        }
        if (formErrors)return;

        try {
            setIsLoading(true);
            if(id) {
                // Editando
                axios.put(`/alunos/${id}`, {
                    nome,
                    sobrenome,
                    email,
                    idade,
                    peso,
                    altura,
                });
                toast.success('Aluno(a) editado(a) com sucesso');                
            } else {
                // criando
                const { data } = axios.post(`/alunos/`, {
                    nome,
                    sobrenome,
                    email,
                    idade,
                    peso,
                    altura,
                });                
                toast.success('Aluno(a) criado(a) com sucesso');                
                history.push(`/aluno/${data.id}/edit`);
            }

            setIsLoading(false);
        } catch (err) {
            const status = get(err, 'response.status', 0);
            const data = get(err, 'response.data', {});
            const errors = get(data, 'errors', []);

            if (errors.length > 0){
                errors.map(error => toast.error(error));
            }else {
                toast.error('Erro Desconhecido');
            }

            if(status === 401) dispatch(actions.loginFailure()); 
        }      
        
    };

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <h1>{id ? 'Editar Aluno' : 'Novo Aluno'}</h1>

            <Form onSubmit={handleSubmit}>
                <input
                    type={'text'}
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    placeholder='Nome'
                 />
                <input
                    type={'text'}
                    value={sobrenome}
                    onChange={e => setSobrenome(e.target.value)}
                    placeholder='Sobrenome'
                 />
                <input
                    type={'text'}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='E-mail'
                 />
                <input
                    type={'number'}
                    value={idade}
                    onChange={e => setIdade(e.target.value)}
                    placeholder='Idade'
                 />
                <input
                    type={'text'}
                    value={peso}
                    onChange={e => setPeso(e.target.value)}
                    placeholder='Peso'
                 />
                <input
                    type={'text'}
                    value={altura}
                    onChange={e => setAltura(e.target.value)}
                    placeholder='Altura'
                 />

                 <button type='submit'>Enviar</button>
            </Form>
        </ Container>
    );
}

Alunos.protoType = {
    match: PropTypes.shape({}).isRequired,
};