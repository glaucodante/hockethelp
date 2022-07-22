import { ReactNode } from 'react';
import { IconProps } from 'phosphor-react-native';
import { VStack, HStack, Text, Box, useTheme } from 'native-base';

type Props = {
    title: string;
    description?: string;
    footer?: string;
    icon: React.ElementType<IconProps>;
    // ELEMENTO NÓ DO NODE ELEMENTO FILHO CAIXA DE TEXTO
    children?: ReactNode;
}


export function Carddetails({
    title,
    description,
    footer = null,
    // COMPONENTE COMEÇA COM LETRA MAIUSCULA
    icon: Icon,
    children

}: Props) {
    const { colors } = useTheme();

    return (
        <VStack bg="gray.600" p={5} mt={5} rounded="sm">
            <HStack alignItems="center" mb={4}>
                <Icon color={colors.primary[700]} />
                <Text ml={2} color="gray.300" fontSize="sm" textTransform="uppercase">
                    {title}

                </Text>

            </HStack>

            {
                // DUAS !! PARA TRANSFORMAR EM VALOR BOLEANO 
                // VERIFICAR SE SEM CONTEÚDO OU NÃO, SE EXISTE VOU RENDERIZAR UM TEXTO
                // SE ISSO É VERDADE ENTÃO RENDERIZA...
                !!description &&
                <Text color="gray.100" fontSize="md">
                    {description}
                </Text>
            }
            {/* PARA INSERIR O FILHO - CAIXA DE TEXTO */}
            {children}

            {
                !!footer &&
                <Box borderTopWidth={1} borderTopColor="gray.400" mt={3} >
                    <Text mt={3} color="gray.300" fontSize="sm">
                        {footer}
                    </Text>
                </Box>
            }

        </VStack>
    );
}