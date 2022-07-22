import { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key, Password } from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';

import { Input } from '../components/input';
import { Button } from '../components/button';

export function SignIn() {

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const { colors } = useTheme();
    // PARAR O USUARIO CASO FAÇA O LOGIN ERRADO
    // A ! (EXCLAMAÇÃO) FOI USADA PARA VERIFICAR SE O EMAIL OU A SENHA É NULA
    // || OPERADOR (OU) = ||

    function handleSignIn() {
        if (!email || !password) {
            return Alert.alert('Entrar', 'Informe e - mail e senha.');
        }

        //  QUANDO ESTE VALOR FOR VERDADEIRO SERÁ ATIVADO
        setIsLoading(true);
        // FORMA DE AUTENTICAÇÃO
        auth()
            .signInWithEmailAndPassword(email, password)
            // .then(response => {
            //     console.log(response);
            // })
            .catch((error) => {
                console.log(error);
                // SE DEU ERRO PODE TIRAR O EFEITO DE LOADING
                setIsLoading(false);

                // if = SE
                if (error.code === 'auth/invalid-email') {
                    return Alert.alert('Entrar', 'E-mail inválido.');
                }

                if (error.code === 'auth/wrong-password') {
                    return Alert.alert('Entrar', 'E-mail ou senha inválida.');
                }

                if (error.code === 'auth/user-not-found') {
                    return Alert.alert('Entrar', 'E-mail ou senha inválida.');
                }
                // EXCEÇÃO GERAL
                return Alert.alert('Entrar', 'Não foi possível acessar.')

            });



    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo />
            <Heading color="gray.100" fontSize="xl" mt={20} mb={6} >
                Acesse sua conta
            </Heading>

            <Input placeholder="E-mail"
                mb={4}
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={3} />}
                onChangeText={setEmail} //OBSERVANDO TODA A VEZ QUE O CONTEUDO MUDA
            />
            <Input placeholder="Senha"
                mb={8}
                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={3} />}
                secureTextEntry //BOLINHAS DO PASSWORD
                onChangeText={setPassword}
            />

            <Button
                title='Entrar'
                w='full'
                onPress={handleSignIn}
                isLoading={isLoading}
            />



        </VStack >
    )
}

// COMPONENTE <View>