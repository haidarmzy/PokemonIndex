import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { uppercaseLetter, pokemonImageTypes, getPokemonImage, getPokemonBaseTypeColor } from '../utils/Utils';
import { values } from 'pokedex-promise-v2/src/default';
import { PokeAPI } from '../api/PokeAPI';
import { variable } from '../utils/Variable';

const PokemonMultipliers = (props) => {
    let data = props.pokemonTypeMultiplierData
    let rgbColor;
    if(data){
        rgbColor = 'rgb('+getPokemonBaseTypeColor(data.name)[0]+','+getPokemonBaseTypeColor(data.name)[1]+','+getPokemonBaseTypeColor(data.name)[2]+')'
    }

    return(
        <View style={styles.containerMultiplier}>
            <View style={styles.containerTitle}>
                <Text style={{...styles.titleTextStyle, color: data? rgbColor : variable.textColor}}>Multipliers</Text>
            </View>
            <View style={styles.containerContentMultipliers}>
                <View style={styles.containerTypeMultipliers}>
                    <View style={styles.containerTitleType}>
                        <Text style={{color: data? rgbColor : variable.textColor}}>Attack</Text>
                    </View>
                    <View style={data ? styles.containerItemsMultipliers : {...styles.containerItemsMultipliers, alignItems: 'center', justifyContent: 'center'}}>
                        {data ? 
                            attackMultiplier(data) : 
                            <View style={{alignSelf: 'center'}}>
                                <ActivityIndicator/>
                            </View>
                        }
                    </View>
                </View>
                <View style={styles.dividerContainer}>
                    <View style={styles.divider}></View>
                </View>
                <View style={styles.containerTypeMultipliers}>
                    <View style={styles.containerTitleType}>
                        <Text style={{color: data? rgbColor : variable.textColor}}>Defense</Text>
                    </View>
                    <View style={data ? styles.containerItemsMultipliers : {...styles.containerItemsMultipliers, alignItems: 'center', justifyContent: 'center'}}>
                        {data ? 
                            defenseMultiplier(data) : 
                            <View style={{alignSelf: 'center'}}>
                                <ActivityIndicator/>
                            </View>
                        }
                    </View>
                </View>
            </View>
        </View>
    );
}

const attackMultiplier = (data) => {
    let dataMultiplier = []
    if(data.damage_relations.double_damage_to.length > 0){
        data.damage_relations.double_damage_to.map((res)=>{
            let type = {
                name : res.name,
                text : "2x"
            }
            dataMultiplier.push(type)
        })
    } 
    if(data.damage_relations.half_damage_to.length > 0){
        data.damage_relations.half_damage_to.map((res)=>{
            let type = {
                name : res.name,
                text : "0.5x"
            }
            dataMultiplier.push(type)
        })
    }
    if(data.damage_relations.no_damage_to.length > 0){
        data.damage_relations.no_damage_to.map((res)=>{
            let type = {
                name : res.name,
                text : "0x"
            }
            dataMultiplier.push(type)
        })
    }

    return dataMultiplier.map((res)=>{
        return (
            <View style={styles.itemTypes}>
                <Image style={styles.typesImgStyle} source={getImage(res.name)}/>
                <Text style={styles.textMultiplier}>{res.text}</Text>
            </View>
        )
    })

}

const defenseMultiplier = (data) => {
    let dataMultiplier = []
    if(data.damage_relations.double_damage_from.length > 0){
        data.damage_relations.double_damage_from.map((res)=>{
            let type = {
                name : res.name,
                text : "2x"
            }
            dataMultiplier.push(type)
        })
    } 
    if(data.damage_relations.half_damage_from.length > 0){
        data.damage_relations.half_damage_from.map((res)=>{
            let type = {
                name : res.name,
                text : "0.5x"
            }
            dataMultiplier.push(type)
        })
    }
    if(data.damage_relations.no_damage_from.length > 0){
        data.damage_relations.no_damage_from.map((res)=>{
            let type = {
                name : res.name,
                text : "0x"
            }
            dataMultiplier.push(type)
        })
    }

    return dataMultiplier.map((res)=>{
        return (
            <View style={styles.itemTypes}>
                <Image style={styles.typesImgStyle} source={getImage(res.name)}/>
                <Text style={styles.textMultiplier}>{res.text}</Text>
            </View>
        )
    })

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
    containerMultiplier: {
        flex: 1,
        flexDirection: 'column',
        marginVertical: 25
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
    containerContentMultipliers: {
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
    containerTypeMultipliers: {
        flex: 0.45,
    },
    containerTitleType: {
        flex: 0.2,
        alignItems:  'center'
    },
    containerItemsMultipliers: {
        flex: 0.8,
        marginTop: 20,
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

export default PokemonMultipliers;