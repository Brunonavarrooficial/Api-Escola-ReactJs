import React from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';

import Loading from '../../components/loading';

export default function Login(props) {
    const dispatch = useDispatch();

    const prevPath = get(props, 'location.state.prevPath', '/');

    const isLoading = useSelector(state => state.auth.isLoading);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    

    const handleSubmit = e => {
        e.preventDefault();
        console.log('HandleSubmit-Index');

        let formErrors = false;

        if (!isEmail(email)) {
            formErrors = true;
            toast.error('E-mail inválido');
        }
        if (password.length < 3 || password.length > 50) {
            formErrors = true;
            toast.error('Senha Invalida.');
        }
        console.log('passando nos ifs');
        dispatch(actions.loginRequest({ email, password, prevPath }));

        if (formErrors) return;
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
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
                <button type='submit'>Acessar</button>
            </Form>
        </ Container>
    );
}