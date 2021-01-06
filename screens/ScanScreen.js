import * as React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class ScanScreen extends React.Component {
    constructor(){
        super();
        this.state={
            hasCameraPerm: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }
    getCameraPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({
        hasCameraPerm: status === 'granted', //the grated is true the user has aalowed or false if the user has denied
        buttonState: 'clicked',
      });
    };
    handleBarCodeScan = async ({ type, data }) => {
      this.setState({
        scanned: true,
        scanData: data,
        buttonState: 'normal',
      });
    };
    render() {
        const hasCamPerm = this.state.hasCameraPerm;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if (buttonState === 'clicked' && hasCamPerm) {
          return (
            <BarCodeScanner
              style={StyleSheet.absoluteFillObject}
              onBarCodeScanned={scanned ? undefined : this.handleBarCodeScan}
            />
          );
        } else if (buttonState === 'normal') {
            return (
              <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={styles.img}
                    source={require('../assets/barcode-scanner.jpg')}/>
                <Text style={styles.text}>
                    Barcode-Scanner
                </Text>
                <Text style={styles.displaytext}>
                  {hasCamPerm === true
                    ? this.state.scanData
                    : 'Request Camera Permisson'}
                </Text>
                <TouchableOpacity
                  style={styles.scanbutton}
                  onPress={this.getCameraPermission}>
                  <Text style={styles.scantext}>Scan The QR Code</Text>
                </TouchableOpacity>
              </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    scanbutton: {
      backgroundColor: '#2897EE',
      padding: 10,
      margin: 10,
    },
    scantext: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
    },
    displaytext: {
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    img: {
        width:200,
        height:200
    },
    text:{
        fontSize:30,
        fontWeight:'bold'
    }
});