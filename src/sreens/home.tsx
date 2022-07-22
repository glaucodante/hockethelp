import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from "native-base";
import { SignOut } from 'phosphor-react-native';
import { ChatTeardropText } from 'phosphor-react-native';
import Logo from '../assets/logo_secondary.svg';
import { Filter } from "../components/filter";
import { Button } from "../components/button";
import { Loading } from '../components/loading';
import { Order, OrderProps } from "../components/order";

import { dateFormat } from '../utils/firestoredateformat';
import { isLoading } from 'expo-font';

// import { ItemClick } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types";



export function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const [orders, setOrders] = useState<OrderProps[]>([]);

    const navigation = useNavigation();
    const { colors } = useTheme();
    //AÇÃO EM DECORRENCIA DE UM CLIQUE OU AÇÃO DO USUÁRIO = handleNewOrder()
    function handleNewOrder() {
        navigation.navigate('new');
    }

    function handleOpenDetails(orderId: string) {
        navigation.navigate('details', { orderId });
    }

    // UTILIZO A PALAVRA handle PARA IDENTIFICAR FUNÇÕES DISPARADAS BASEADAS NA INTERÇÃO DO USUARIO - AJUDA A IDENTIFICAR

    // VAI DESCONECTAR O USUÁRIO DA APLICAÇÃO
    function handleLogout() {
        auth()
            .signOut()
            // catch VAI FAZER UM TRATAMENTO PARA ERROS
            .catch(error => {
                console.log(error);
                return Alert.alert('Sair', 'Não foi possível sair.');

            });

    }


    useEffect(() => {
        setIsLoading(true);


        const subscriber = firestore()
            .collection('orders')
            // FAZER UM FILTRO ONDE STATUS SEJA IGUAL AO STATUS QUE ESTA SELECIONADO
            .where('status', '==', statusSelected)
            // ATUALIZA OS DADOS EM TEMPO REAL = onSnapshot
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => {
                    const { patrimony, description, status, created_at } = doc.data();

                    return {
                        id: doc.id,
                        patrimony,
                        description,
                        status,
                        when: dateFormat(created_at)

                    }
                });

                setOrders(data);
                setIsLoading(false);
            });

        return subscriber;

        // QUANDO O ESTADO MUDA, 
    }, [statusSelected]);

    // O FIREBASE UTILIZA OS RECURSOS NATIVOS DO DISPOSITIVO

    // ANTES DO return SE COLOCA TODAS AS LOGICAS DO COMPONENTE
    return (
        <VStack flex={1} pb={6} bg="gray.700">
            <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.600"
                pt={12}
                pb={5}
                px={6}
            >
                <Logo />
                {/* BOTÃO DE SAIR */}
                <IconButton
                    icon={<SignOut size={26} color={colors.gray[300]} />}
                    onPress={handleLogout}
                />
            </HStack>


            {/* vStack UM ABAIXO DO OUTRO */}
            <VStack flex={1} px={6}>

                {/* HStack UM AO LADO DO OUTRO */}
                <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                    <Heading color="gray.100">
                        Solicitações
                    </Heading>
                    <Text color="gray.200">
                        {/* PEGAR DA LISTA DE ORDENS O PROPRIO TAMANHO DELA */}
                        {orders.length}
                    </Text>
                </HStack>
                <HStack space={3} mb={8}>
                    <Filter
                        type="open"
                        title="em andamento"
                        onPress={() => setStatusSelected('open')} //FUNÇÃO QUE RECEBE PARAMENTRO
                        isActive={statusSelected === 'open'}
                    >
                    </Filter>
                    <Filter
                        type="closed"
                        title="finalizados"
                        onPress={() => setStatusSelected('closed')}
                        isActive={statusSelected === 'closed'}
                    >
                    </Filter>
                </HStack>
                {/* FlatLista PARA EXIBIR VARIOS ELEMENTOS EM LISTA */}

                {
                    isLoading ? <Loading /> :

                        <FlatList
                            data={orders}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
                            showsVerticalScrollIndicator={false}  // COMANDO PARA RETIRAR A BARRA DE ROLAGEM
                            contentContainerStyle={{ paddingBottom: 100 }}
                            // RENDERIZAR QUANDO NÃO HÁ NENHUM ITEM EM ANDDAMENTO, PARA NÃO FOCAR VAZIO, SEM CHAMADOS
                            ListEmptyComponent={() => (
                                <Center>
                                    <ChatTeardropText color={colors.gray[300]} size={40} />
                                    <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                                        Você ainda não possui {'\n'}
                                        solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                                        {/* {'\n'} => PARA QUEBRA DE LINHA */}
                                    </Text>
                                </Center>
                            )}

                        // <Text color="white">{item.patrimony} </Text>}

                        />
                }

                <Button title="Nova solicitação" onPress={handleNewOrder} />
            </VStack>
        </VStack >
    );
}