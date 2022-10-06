/* eslint-disable import/no-anonymous-default-export */
import * as types from '../types';

const initialState = {
    botaoClicado: false,
};


export default (state = initialState, action) => {
    switch (action.type) {
        case types.BOTAO_CLICADO_SUCCESS: {
            console.log('Sucesso Total!');
            const newState = { ...state };
            newState.botaoClicado = !newState.botaoClicado;
            return state;
        }

        case types.BOTAO_CLICADO_FAILURE: {
            console.log('Deu Rum =(');
            return state;
        }

        case types.BOTAO_CLICADO_REQUEST: {
            console.log('estou fazendo a requisição');
            return state;
        }

        default: {
            return state;
        }

    }

}