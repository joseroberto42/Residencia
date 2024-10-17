import React from 'react'
import {View,Image} from 'react-native'
import styles from './style'

export default function Login(){
    return(
        <View>
            <View >
                <Image
                style={styles.logo}
                resizeMode='contain'
                source={require('../../assents/Logo.png')}/>
            </View>
        </View>
    )
}