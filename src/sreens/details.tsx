import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { VStack, Text, HStack, useTheme, ScrollView, Box } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { OrderFirestoreDTO } from '../sreens/dtos/orderfirestoredto';
import { CircleWavyCheck, Hourglass, DesktopTower, ClipboardText } from 'phosphor-react-native';

import { dateFormat } from '../utils/firestoredateformat';

import { Input } from '../components/input';
import { Button } from '../components/button';
import { Header } from '../components/header';
import { OrderProps } from '../components/order';
import { Loading } from '../components/loading';
import { Carddetails } from '../components/carddetails';




type RouteParams = {
    orderId: string;
}

type OrderDetails = OrderProps & {
    description: string;
    solution: string;
    closed: string;

}

export function Details() {
    const [solution, setSolution] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

    const navigation = useNavigation();
    const route = useRoute();
    const { colors } = useTheme();

    const { orderId } = route.params as RouteParams;


    // PARA ENCERRAR A APLICAÇÃO

    function handleOrderClose() {
        if (!solution) {
            return Alert.alert('Solicitação', 'Informe a solução para encerrar a solicitação');
        }

        firestore()
            .collection<OrderFirestoreDTO>('orders')
            .doc(orderId)
            .update({
                status: 'closed',
                solution,
                closed_at: firestore.FieldValue.serverTimestamp()
            })

            .then(() => {
                Alert.alert('Solicitação', 'Solicitação encerrada.');
                navigation.goBack();
            })

            .catch((error) => {
                console.log(error);
                Alert.alert('Solicitação', 'Não foi possível encerrar a solicitação.');
            });
    }


    useEffect(() => {
        firestore()
            .collection<OrderFirestoreDTO>('orders')
            .doc(orderId)
            .get()
            .then((doc) => {
                const { patrimony, description, status, created_at, closed_at, solution } = doc.data();

                const closed = closed_at ? dateFormat(closed_at) : null;

                setOrder({
                    id: doc.id,
                    patrimony,
                    description,
                    status,
                    solution,
                    when: dateFormat(created_at),
                    closed
                });

                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <Loading />
    }

    return (
        <VStack flex={1} bg="gray.700" >
            <Box px={6} bg="gray.600">
                <Header title='solicitação' />
            </Box>
            <HStack bg="gray.500" justifyContent="center" p={4}>
                {
                    order.status === 'closed'
                        ? <CircleWavyCheck size={22} color={colors.green[300]} />
                        : <Hourglass size={22} color={colors.secondary[700]} />

                }

                <Text
                    fontSize={"sm"}
                    color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
                    ml={2}
                    textTransform="uppercase"
                >
                    {order.status === 'closed' ? 'finalizado' : 'em andamento'}

                </Text>

            </HStack>
            <ScrollView mx={5} showsVerticalScrollIndicator={false}>
                <Carddetails
                    title="equipamento"
                    description={`Patrimônio ${order.patrimony}`}
                    icon={DesktopTower}

                />

                <Carddetails
                    title="descrição do problema"
                    description={order.description}
                    icon={ClipboardText}
                    footer={`Registrado em ${order.when}`}
                />

                <Carddetails
                    title="solução"
                    icon={CircleWavyCheck}
                    description={order.solution}
                    footer={order.closed && `Encerrado em ${order.closed}`}
                >
                    {
                        order.status === 'open' &&
                        <Input
                            placeholder='Descrição da Solução'
                            onChangeText={setSolution}
                            textAlignVertical="top"
                            // INSERE QUEBRA DE LINHA
                            multiline
                            h={24}
                        />
                    }
                </Carddetails>
            </ScrollView>

            {
                order.status === 'open' &&
                <Button
                    title='Encerrar solicitação'
                    m={5}
                    onPress={handleOrderClose}
                />
            }

        </VStack >
    );
}