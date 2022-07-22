import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type OrderFirestoreDTO = {
    patrimony: string;
    description: string;
    status: 'open' | 'closed',
    // ?: = SOLUÇÃO OPCIONAL
    solution?: string;
    created_at: FirebaseFirestoreTypes.Timestamp;
    // ?: FECHAMENTO OPCIONAL
    closed_at?: FirebaseFirestoreTypes.Timestamp;
}