import React from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux'; 

import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/loading';
import { Title, Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import { get } from 'lodash';
import * as actions from '../../store/modules/auth/actions';


export default function Fotos({ match }) {
    const dispatch = useDispatch();
    const id = get(match, 'params.id', '');
    
    const [isLoading, setIsLoading] = React.useState(false);
    const [foto, setFoto] = React.useState('');

    React.useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const {data} = await axios.get(`/alunos/${id}`);
                setFoto(get(data, 'Fotos[0].url', ''));
                setIsLoading(false);            
            } catch (err) {
                toast.error('Erro ao obter a imagem');
                setIsLoading(false);
                history.push('/');
            }
        }
        getData();
    }, [id]);

    const handleChange = async e =>{        
        const file = e.target.files[0];
        const FotoURL = URL.createObjectURL(file);

        setFoto(FotoURL);

        const formData = new FormData();
        formData.append('aluno_id', id);
        formData.append('foto', file);

        try {
            setIsLoading(true);
            await axios.post('/fotos', formData, {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            });

            toast.success('Foto enviada com suceso!');

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            const { status } = get(err, 'response', '');
            toast.error('Erro ao enviar foto');

            if(status === 401) dispatch(actions.loginFailure);
        }
    };        


    return (
        <Container>
            <Loading isLoading={isLoading} />

            <Title>Fotos</Title>
            <Form>
                <label htmlFor='foto'>
                    {foto ? <img src={foto} alt='foto' /> : 'Selecionar'}
                    <input type='file' id='foto' onChange={handleChange}/>
                </label>
            </Form>
        </ Container>
    );
}

Fotos.propTypes = {
    match: PropTypes.shape({}).isRequired,    
};