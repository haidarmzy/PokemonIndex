import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { uppercaseLetter, pokemonImageTypes, getPokemonImage, getPokemonBaseTypeColor } from '../utils/Utils';
import { values } from 'pokedex-promise-v2/src/default';
import { PokeAPI } from '../api/PokeAPI';
import { variable } from '../utils/Variable';

const PokemonSprites = (props) => {
    let data = props.pokemonSpritesData
    console.log("DATA SPRITES ", data)
    let typeColor = props.pokemonTypesColor[0].type.name
    let rgbColor = 'rgb('+getPokemonBaseTypeColor(typeColor)[0]+','+getPokemonBaseTypeColor(typeColor)[1]+','+getPokemonBaseTypeColor(typeColor)[2]+')'

    return(
        <View style={styles.containerSprites}>
            <View style={styles.containerTitle}>
                <Text style={{...styles.titleTextStyle, color: rgbColor}}>Sprites</Text>
            </View>
            <View style={styles.contentContainerSprites}>
                <View style={styles.containerImageSprites}>
                    <View style={styles.containerTitleType}>
                        <Text style={{color: rgbColor}}>Normal</Text>
                    </View>
                    <View style={{...styles.containerItemsMultipliers, alignItems: 'center', justifyContent: 'center'}}>
                        <Image style={{height: 150, width: 150}} source={{uri: data.front_default}}/>
                    </View>
                </View>
                <View style={styles.containerImageSprites}>
                    <View style={styles.containerTitleType}>
                        <Text style={{color: rgbColor}}>Shiny</Text>
                    </View>
                    <View style={{...styles.containerItemsMultipliers, alignItems: 'center', justifyContent: 'center'}}>
                        <Image style={{height: 150, width: 150}} source={{uri: data.front_shiny}}/>
                    </View>
                </View>
            </View>
        </View>
    );
}

const getImage = (name) => {
    let imgSource;
    if(name === 'grass'){
        imgSource = pokemonImageTypes.grass.uri
    } else if(name=== 'fire'){
        imgSource = pokemonImageTypes.fire.uri
    } else if(name=== 'bug'){
        imgSource = pokemonImageTypes.bug.uri
    } else if(name=== 'dark'){
        imgSource = pokemonImageTypes.dark.uri
    } else if(name=== 'dragon'){
        imgSource = pokemonImageTypes.dragon.uri
    } else if(name=== 'electric'){
        imgSource = pokemonImageTypes.electric.uri
    } else if(name=== 'fairy'){
        imgSource = pokemonImageTypes.fairy.uri
    } else if(name=== 'fighting'){
        imgSource = pokemonImageTypes.fighting.uri
    } else if(name=== 'flying'){
        imgSource = pokemonImageTypes.flying.uri
    } else if(name=== 'ghost'){
        imgSource = pokemonImageTypes.ghost.uri
    } else if(name=== 'ground'){
        imgSource = pokemonImageTypes.ground.uri
    } else if(name=== 'ice'){
        imgSource = pokemonImageTypes.ice.uri
    } else if(name=== 'normal'){
        imgSource = pokemonImageTypes.normal.uri
    } else if(name=== 'poison'){
        imgSource = pokemonImageTypes.poison.uri
    } else if(name=== 'psychic'){
        imgSource = pokemonImageTypes.psychic.uri
    } else if(name=== 'rock'){
        imgSource = pokemonImageTypes.rock.uri
    } else if(name=== 'steel'){
        imgSource = pokemonImageTypes.steel.uri
    } else if(name=== 'water'){
        imgSource = pokemonImageTypes.water.uri
    }

    return imgSource
}

const styles = StyleSheet.create({
    containerSprites: {
        flex: 1,
        flexDirection: 'column',
        marginVertical: 25,
        paddingVertical: 10,

    },
    containerTitle: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    titleTextStyle: {
        fontSize: 18
    },
    textMultiplier: {
        color: variable.textColor
    },
    contentContainerSprites: {
        flex: 0.8,
        flexDirection: 'row',
    },
    dividerContainer: {
        flex: 0.1,
        height: '100%',
        justifyContent:'center',
        alignItems: 'center'
    },
    divider:{
        height: '90%',
        width: 1,
        backgroundColor: variable.lightGrey
    },
    containerImageSprites: {
        flex: 0.5,
    },
    containerTitleType: {
        flex: 0.2,
        alignItems:  'center',
    },
    containerItemsMultipliers: {
        flex: 0.8,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemTypes: {
        width: Dimensions.get('screen').width * 0.18,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        marginHorizontal: 5,
    },
    typesImgStyle: {
        width: Dimensions.get('screen').width * 0.1, 
        height: Dimensions.get('screen').width * 0.1,
    },
    textMultiplier: {
        marginLeft: 5
    }
})

export default PokemonSprites;