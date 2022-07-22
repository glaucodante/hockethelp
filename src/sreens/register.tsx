import { useState } from 'react';
import { Alert } from 'react-native';
import { VStack } from 'native-base';
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { Header } from '../components/header';
import { Input } from '../components/input';
import { Button } from '../components/button';

export function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [patrimony, setPatrimony] = useState('');
    const [description, setDescription] = useState('');

    const navigation = useNavigation();
    // VALIDAÇÃO SE O PATRIMONIO E A DESCRIÇÃO FORAM INFORMADOS
    function handleNewOrderRegister() {
        if (!patrimony || !description) {
            return Alert.alert('Registrar', 'Preencha todos os campos.');
        }

        setIsLoading(true);

        // ENVIAR AS INFORMAÇÕES PARA O FIREBASE (BANCO DE DADOS)
        // VAI NA COLEÇÃO DE ORDENS, SE NÃO EXISTIR, ELE IRÁ CRIÁ-LA
        firestore()
            .collection('orders')
            .add({
                patrimony,
                description,
                status: 'open',

                // PARA SABER QUANDO A SOLICITAÇÃO FOI ENVIADA
                created_at: firestore.FieldValue.serverTimestamp()
            })

            .then(() => {
                Alert.alert("Solicitação", "Solicitação resgistrada com sucesso.");
                // PARA VOLTAR A TELA ANTERIOR
                navigation.goBack();

            })
            // SE DER ERRADO
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                return Alert.alert('Solicitação', 'Não foi possível registrar o pedido.');
            })


    }



    return (
        <VStack flex={1} p={6} bg="gray.600">
            <Header title='Solicitação' />
            <Input
                placeholder='Número do Patrimônio'
                mt={4}
                onChangeText={setPatrimony}
            />
            <Input
                placeholder='Descrição do problema'
                flex={1}
                mt={5}
                multiline // PARA O USUARIO PODER DAR ENTER DENTRO DO CAMPO DESCRIÇÃO DO PROBLEMA
                textAlignVertical="top"
                onChangeText={setDescription}
            />

            <Button
                title='Cadastrar'
                mt={5}
                isLoading={isLoading}
                onPress={handleNewOrderRegister}
            />
        </VStack>
    );
}