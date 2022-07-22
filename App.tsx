import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { THEME } from './src/styles/theme';

import { Routes } from './src/routes'; //QUANDO EU OMITO O ARQUIVO POR PADRÃO ELE IRA BUSCAR O index
import { Loading } from './src/components/loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent />
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>

  );
}



























// import { NativeBaseProvider, StatusBar } from 'native-base';
// import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

// import { THEME } from './src/styles/theme';

// import { SignIn } from './src/sreens/signin';
// import { Loading } from './src/components/loading';

// export default function App() {
//   const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
//   return (
//     <NativeBaseProvider theme={THEME}>
//       <StatusBar
//         barStyle='light-content'
//         backgroundColor="transparent"
//         translucent />
//       {fontsLoaded ? <SignIn /> : <Loading />}
//     </NativeBaseProvider>

//   );
// }


