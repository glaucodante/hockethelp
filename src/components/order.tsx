import { Box, Circle, HStack, Text, useTheme, VStack, Pressable, IPressableProps } from 'native-base';
import colors from 'native-base/lib/typescript/theme/v33x-theme/base/colors';
// HStack = UM AO LADO DO OUTRO

import { ClockAfternoon, Hourglass, CircleWavyCheck } from 'phosphor-react-native';

export type OrderProps = {
    id: string;
    patrimony: string;
    when: string;
    status: 'open' | 'closed'; //ABERTO OU FECHADO => | = OU

}
type Props = IPressableProps & {
    data: OrderProps;

}

export function Order({ data, ...rest }: Props) {

    const { colors } = useTheme();

    const statusColor = data.status === 'open' ? colors.secondary[700] : colors.green[300];

    return (
        // INICIO DA REGIÃO DE CLIQUE = Pressable
        <Pressable {...rest}>
            <HStack
                bg="gray.600"
                mb={4}
                alignItems="center"
                justifyContent="space-between"
                rounded="sm" // sm = PARA OS CANTINHOS ARREDONDADOS
                overflow="hidden" // BARRINHA LATERAL NÁO PASSE DOS CANTOS ARREDONDADOS

            >
                <Box h="full" w={2} bg={statusColor} />
                {/* my = VERTICAL */}
                <VStack flex={1} my={5} ml={5}>
                    <Text color="white" fontSize="md">
                        Patrimônio {data.patrimony}
                    </Text>
                    <HStack alignItems="center">
                        <ClockAfternoon size={15} color={colors.gray[300]} />
                        <Text color="gray.200" fontSize="xs" ml={1}>
                            {data.when}
                        </Text>
                    </HStack>
                </VStack>

                <Circle bg="gray.500" h={12} w={12} mr={5}>
                    {
                        data.status === 'closed'
                            ? <CircleWavyCheck size={24} color={statusColor} />
                            // : = CASO CONTRARIO 
                            : <Hourglass size={24} color={statusColor} />
                    }

                </Circle>


            </HStack>
        </Pressable> //FINAL DA REGIÃO DE CLIQUE
    );
}