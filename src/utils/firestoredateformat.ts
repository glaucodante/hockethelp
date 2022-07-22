import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp) {
    if (timestamp) {
        const date = new Date(timestamp.toDate());


        const day = date.toLocaleDateString('pt-BR');
        const hour = date.toLocaleTimeString('pt-BR');

        // `` (ASPAS) = ITERPOLAR = MISTURAR CONTEUDOS DE VARIAVEIS COMTEXTO
        return `${day} às ${hour}`;
    }
}