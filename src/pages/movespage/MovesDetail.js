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

export default class MovesDetail extends Component {

    state={
        movesDescription: null,
        moveName: null,
        colorBase: null
    }

    componentDidMount(){
        console.log("PROPS MOVESSS ", this.props.route.params.movesData)
    }

    componentWillMount(){
        let flavors_text = this.props.route.params.movesData.flavor_text_entries.filter((data)=>{
            return data.language.name === "en"
        })
        let name = this.props.route.params.movesData.names.filter((res)=>{
            return res.language.name === "en"
        })

        let typeColor = this.props.route.params.movesData.type.name
        let rgbColor = 'rgb('+getPokemonBaseTypeColor(typeColor)[0]+','+getPokemonBaseTypeColor(typeColor)[1]+','+getPokemonBaseTypeColor(typeColor)[2]+')'

        this.setState({
            movesDescription: flavors_text,
            moveName: name,
            colorBase: rgbColor
        })

        console.log("FLAVOR TEXT : ", name)
    }

    render(){
        return (
            <>
            {this.renderBackgroundTypes(this.props.route.params.movesData.type.name)}
            <View style={styles.screenContainer}>
                <ScrollView>
                    <View style={{flex: 1, height: Dimensions.get('screen').height, flexDirection: 'column'}}>
                        <View style={styles.viewSpaceTop}></View>
                        <View style={styles.containerPokemonDetail}>
                            {this.renderIconTypes(this.props.route.params.movesData.type.name)}
                            <View style={styles.containerName}>
                                {this.state.moveName ? 
                                    <Text style={styles.pokemonNameTextStyle}>{uppercaseLetter(this.state.moveName[0].name)}</Text>
                                    :
                                    null
                                }
                            </View>
                            <View style={styles.containerTag}>
                                {this.renderTagTypes(this.props.route.params.movesData.type.name)}
                            </View>
                            <View style={styles.containerDescription}>
                                {this.state.movesDescription ? 
                                    <Text style={{textAlign: 'center', color: '#4F4F4F'}}>{this.state.movesDescription[this.state.movesDescription.length - 1].flavor_text}</Text>
                                    :
                                    <ActivityIndicator/>
                                }
                            </View>
                            <View style={styles.containerDamageClass}>
                                <Text style={{ color: this.state.colorBase}}>Damage Class</Text>
                                <Text style={{marginTop: 15, color: variable.textColor, fontSize: 16}}>{
                                    this.props.route.params.movesData.damage_class.name === "status" ?
                                    "Increase/Decrease " + uppercaseLetter(this.props.route.params.movesData.damage_class.name)
                                    :
                                    uppercaseLetter(this.props.route.params.movesData.damage_class.name) + " Damage"
                                }</Text>
                            </View>
                            <View style={styles.containerMovesSpecificDetail}>
                                <MoveDetailSpecific 
                                    moveData = {this.props.route.params.movesData}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            </>
        );
    }

    renderBackgroundTypes(type){
        if(type === 'water'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/water-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(type === 'fire'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/fire-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(type === 'bug'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/bug-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(type === 'dark'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/dark-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(type === 'dragon'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/dragon-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(type === 'electric'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/electric-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(type === 'fairy'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/fairy-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(type === 'fighting'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/fighting-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(type === 'flying'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/flying-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(type === 'ghost'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/ghost-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(type === 'ground'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/ground-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(type === 'ice'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/ice-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(type === 'normal'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/normal-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(type === 'poison'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/poison-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(type === 'psychic'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/psychic-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(type === 'rock'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/rock-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(type === 'steel'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/steel-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(type === 'grass'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/grass-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        }
    }

    renderIconTypes(type){
        let imgSource;
        if(type === 'grass'){
            imgSource = pokemonImageTypes.grass.uri
        } else if(type === 'fire'){
            imgSource = pokemonImageTypes.fire.uri
        } else if(type === 'bug'){
            imgSource = pokemonImageTypes.bug.uri
        } else if(type === 'dark'){
            imgSource = pokemonImageTypes.dark.uri
        } else if(type === 'dragon'){
            imgSource = pokemonImageTypes.dragon.uri
        } else if(type === 'electric'){
            imgSource = pokemonImageTypes.electric.uri
        } else if(type === 'fairy'){
            imgSource = pokemonImageTypes.fairy.uri
        } else if(type === 'fighting'){
            imgSource = pokemonImageTypes.fighting.uri
        } else if(type === 'flying'){
            imgSource = pokemonImageTypes.flying.uri
        } else if(type === 'ghost'){
            imgSource = pokemonImageTypes.ghost.uri
        } else if(type === 'ground'){
            imgSource = pokemonImageTypes.ground.uri
        } else if(type === 'ice'){
            imgSource = pokemonImageTypes.ice.uri
        } else if(type === 'normal'){
            imgSource = pokemonImageTypes.normal.uri
        } else if(type === 'poison'){
            imgSource = pokemonImageTypes.poison.uri
        } else if(type === 'psychic'){
            imgSource = pokemonImageTypes.psychic.uri
        } else if(type === 'rock'){
            imgSource = pokemonImageTypes.rock.uri
        } else if(type === 'steel'){
            imgSource = pokemonImageTypes.steel.uri
        } else if(type === 'water'){
            imgSource = pokemonImageTypes.water.uri
        }
        return(
            <Image style={styles.pokemonImageDetail} source={imgSource}/>
        )
    }
    
    renderTagTypes(type){
        let imgSource;
        if(type === 'grass'){
            imgSource = pokemonTag.grass.uri
        } else if(type === 'fire'){
            imgSource = pokemonTag.fire.uri
        } else if(type === 'bug'){
            imgSource = pokemonTag.bug.uri
        } else if(type === 'dark'){
            imgSource = pokemonTag.dark.uri
        } else if(type === 'dragon'){
            imgSource = pokemonTag.dragon.uri
        } else if(type === 'electric'){
            imgSource = pokemonTag.electric.uri
        } else if(type === 'fairy'){
            imgSource = pokemonTag.fairy.uri
        } else if(type === 'fighting'){
            imgSource = pokemonTag.fighting.uri
        } else if(type === 'flying'){
            imgSource = pokemonTag.flying.uri
        } else if(type === 'ghost'){
            imgSource = pokemonTag.ghost.uri
        } else if(type === 'ground'){
            imgSource = pokemonTag.ground.uri
        } else if(type === 'ice'){
            imgSource = pokemonTag.ice.uri
        } else if(type === 'normal'){
            imgSource = pokemonTag.normal.uri
        } else if(type === 'poison'){
            imgSource = pokemonTag.poison.uri
        } else if(type === 'psychic'){
            imgSource = pokemonTag.psychic.uri
        } else if(type === 'rock'){
            imgSource = pokemonTag.rock.uri
        } else if(type === 'steel'){
            imgSource = pokemonTag.steel.uri
        } else if(type === 'water'){
            imgSource = pokemonTag.water.uri
        }
        return(
            <Image style={{height: 30, width: 110}} source={imgSource}/>
        )
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
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight * 1.5 : Dimensions.get('screen').height * 0.05,
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
        height: 90, 
        width: 90, 
        marginTop: Platform.OS === 'android' ? Dimensions.get('screen').height * -0.05 : Dimensions.get('screen').height * -0.05
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
        marginVertical: 20,
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