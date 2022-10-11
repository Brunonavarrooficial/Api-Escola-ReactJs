import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
/*import { get } from 'lodash';*/
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
/*import axios from '../../services/axios';
import history from '../../services/history';*/
import Loading from '../../components/loading';
import * as actions from '../../store/modules/auth/actions';


export default function Register() {
    const dispath = useDispatch();

    const id = useSelector(state => state.auth.user.id);
    const nomeStored = useSelector(state => state.auth.user.nome);
    const emailStored = useSelector(state => state.auth.user.email);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsloading] = useState(false);

    React.useEffect(() => {
        if(!id) return;
        setNome(nomeStored);
        setEmail(emailStored);
    }, [emailStored, id, nomeStored]);

    async function handleSubmit(e) {        
        e.preventDefault();
        console.log('apertou botão');
        console.log('Dados Declarados: ',{ nome, email, password });
        
        let formErrors = false;

        if (nome.length < 3 || nome.length > 255) {
            formErrors = true;
            toast.error('Nome deve ter entre 3 a 255 caracteres.');
        }
        if (!isEmail(email)) {
            formErrors = true;
            toast.error('E-mail inválido.');
        }
        if (!id && (password.length < 3 || password.length > 50)) {
            formErrors = true;
            toast.error('Senha deve ter entre 6 a 50 caracteres.');
        }

        if (formErrors) return;

        dispath(actions.registerRequest({ nome, email, password, id }));

        /*setIsloading(true);

        try {
            await axios.post('/users/', {
                nome,
                password,
                email,
            });
            toast.success('Você fez seu cadastro');
            setIsloading(false);
            history.push('/');
        } catch (err) {
            const errors = get(err, 'response.data.errors', []);
            errors.map(error => toast.error(error));
            setIsloading(false);            
        } */
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <h1>{id ? 'Editar dados' : 'Criar Conta'}</h1>
            <Form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    placeholder='Seu Nome'
                />
                <input
                    type='text'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Seu E-mail'
                />
                <input
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Sua senha'
                />
                <button type='submit'>Registrar</button>
            </Form>
        </ Container>
    );
}