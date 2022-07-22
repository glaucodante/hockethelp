import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
    title: string;
}
export function Button({ title, ...rest }: Props) {
    return (
        < ButtonNativeBase
            bg="green.700"
            h={14}
            fontSize="sm"
            rounded="sm"
            _pressed={{ bg: "gree.500" }}
            {...rest} //ESTA PROPRIEDADE TEM DE SERE A ULTIMA
        >
            <Heading color="white" fontSize="sm">
                {title}
            </Heading>
        </ ButtonNativeBase>
    );
}