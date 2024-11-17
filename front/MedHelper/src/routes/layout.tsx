import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../pages/Login/Index';
import AddMedication from '../pages/medication/addMedication';
import Home from "../pages/Home"
import Profille from "../pages/Perfil/index"

const Tab = createBottomTabNavigator();

const Layout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Adicionar medicamentos" component={AddMedication} />
        <Tab.Screen name="Perfil" component={Profille} />

  
        
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Layout;
