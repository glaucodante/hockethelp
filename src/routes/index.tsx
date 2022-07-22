// useEffect É UTILIZADO QUANDO O APP É RENDERIZADO, PARA USAR UMA LOGICA
// useState É UM ESTADO DE GERAR NOVA RENDERIZAÇÃO
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
// SE O USUARIO TA LOGADO ELE VAI ACESSAR O ROUTES, 
// CASO CONTRARIO FICARÁ EM SIGNIN

import { Loading } from '../components/loading';
import { SignIn } from '../sreens/signin';
import { AppRoutes } from './app.routes';


export function Routes() {

    const [loading, setIsLoading] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User>();
    // FUNÇÃO QUE ATUALIZA COMEÇA COM A PALAVRA set...

    // useEffect PARA VERIFICAR SE O USUÁRIO ESTA LOGADO OU NÃO
    // TEM ESSA ESTRUTURA useEffect(() => {},[]);
    // subscriber = VAI FICAR OBSERVANDO 
    // SE O USUARIO ESTÁ AUTENTICADO OU NÃO
    useEffect(() => {
        const subscriber = auth()
            .onAuthStateChanged(response => {
                setUser(response);
                setIsLoading(false);
            });

        return subscriber;
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <NavigationContainer>
            {/*  SE O USUARIO EXISTIR ENTÃO VAI MOSTRAR O AppRoutes, CASO CONTRARIO CARREGARAO SIGNIN*/}
            {user ? <AppRoutes /> : <SignIn />}
        </NavigationContainer>
    )

}