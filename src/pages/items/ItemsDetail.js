import React, {Component} from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    Platform,
    Image,
    FlatList,
    ActivityIndicator
  } from 'react-native';
import { getPokemonImage, uppercaseLetter, pokemonTag, pokemonImageTypes, getPokemonBaseTypeColor } from '../../utils/Utils';
import MoveDetailSpecific from '../../components/MoveDetailSpesific';
import { variable } from '../../utils/Variable';

export default class ItemsDetail extends Component {

    state={
        itemDescription: null,
        itemName: null,
    }

    componentDidMount(){
        console.log("PROPS MOVESSS ", this.props.route.params.itemData)
    }

    componentWillMount(){
        let flavors_text = this.props.route.params.itemData.flavor_text_entries.filter((data)=>{
            return data.language.name === "en"
        })
        let name = this.props.route.params.itemData.names.filter((res)=>{
            return res.language.name === "en"
        })

        this.setState({
            itemDescription: flavors_text,
            itemName: name,
        })

        // console.log("FLAVOR TEXT : ", name)
    }

    render(){
        return (
            <>
            <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/splash-bg.png')} resizeMode={'cover'}>
            </ImageBackground>
            <View style={styles.screenContainer}>
                <ScrollView>
                    <View style={{flex: 1, height: Dimensions.get('screen').height, flexDirection: 'column'}}>
                        <View style={styles.viewSpaceTop}></View>
                        <View style={styles.containerPokemonDetail}>
                            <Image style={styles.pokemonImageDetail} source={{uri: this.props.route.params.itemData.sprites.default}}/>
                            <View style={styles.containerName}>
                                <Text style={styles.pokemonNameTextStyle}>{this.state.itemName[0].name}</Text>
                            </View>
                            <View style={styles.containerTag}>
                                <Text style={{color: variable.textColor, marginRight: 15}}>1200</Text>
                                <Image style={{width: 10, height: 20}} source={require('../../assets/icons/ic-curreny.png')} resizeMode='contain' />
                            </View>
                            <View style={{flex: 0.15, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
                                {this.renderAttributes()}
                            </View>
                            <View style={styles.containerDescription}>
                                    <Text style={{textAlign: 'center', color: '#4F4F4F'}}>{this.state.itemDescription[this.state.itemDescription.length - 1].text}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            </>
        );
    }

    renderAttributes(){
        let att = this.props.route.params.itemData.attributes
        return att.map((res)=>{
            return(
                <View style={{marginVertical: 5, marginHorizontal: 5, borderRadius: 10, backgroundColor: variable.lightGrey, paddingHorizontal: 10, paddingVertical: 10}}>
                    <Text>{res.name}</Text>
                </View>
            )
        })
    }
}


const styles = StyleSheet.create({
    backgroundTypes: {
        flex: 1, 
        position: 'absolute', 
        top: 0, 
        bottom: 0, 
        right: 0, 
        left: 0
    },
    screenContainer: {
        flex: 1, 
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight * 2 : Dimensions.get('screen').height * 0.1
    },
    viewSpaceTop: {
        flex: 0.15,
        width: '100%', 
    },
    containerPokemonDetail: {
        flex: 0.85, 
        width: '100%', 
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center', 
        borderRadius: 40,
        backgroundColor: 'white',
        marginBottom: 25,
    },
    pokemonImageDetail: {
        height: 100, 
        width: 100, 
        marginTop: Platform.OS === 'android' ? Dimensions.get('screen').height * -0.06 : Dimensions.get('screen').height * -0.06
    },
    pokemonNameTextStyle:{
        fontSize: 32,
        color: '#4F4F4F'
    },
    containerName: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
    },
    containerTag:{
        flex: 0.05,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerDescription: {
        flex: 0.15, 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: 5,
        paddingHorizontal: 25,
        marginVertical: Platform.OS === 'android' ? 25 : 20,
    },
    containerDamageClass: {
        flex: 0.1, 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: 5,
        paddingHorizontal: 25,
        marginBottom: 20,
    },
    containerMovesSpecificDetail: {
        flex: 0.2,
        width: '100%',
        marginVertical: 20
    }
})