import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { uppercaseLetter, pokemonImageTypes, getPokemonImage } from '../utils/Utils';
import { values } from 'pokedex-promise-v2/src/default';
import { variable } from '../utils/Variable';

const ItemList = (props) => {
    let data = props.pokemonItemData
    let name = data.names.filter((res)=>{
        return res.language.name === "en"
    })
    return(
        <TouchableOpacity style={styles.containerTouchable} onPress={props.itemPressed}>
            <View style={{flex: 0.2}}>
                <Image style={{width: 60,height: 60}} source={{uri: data.sprites.default}}/>
            </View>
            <View style={{flex: 0.5, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={{fontSize: 18}}>{name[0].name}</Text>
            </View>
            <View style={{flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                <Text style={{color: variable.textColor, marginRight: 15}}>{data.cost}</Text>
                <Image style={{width: 10, height: 20}} source={require('../assets/icons/ic-curreny.png')} resizeMode='contain' />
            </View>
        </TouchableOpacity>
    );
}

const showMovesTypeIcon = (data) => {
    let imgSource;
    if(data.type.name === 'grass'){
        imgSource = pokemonImageTypes.grass.uri
    } else if(data.type.name === 'fire'){
        imgSource = pokemonImageTypes.fire.uri
    } else if(data.type.name === 'bug'){
        imgSource = pokemonImageTypes.bug.uri
    } else if(data.type.name === 'dark'){
        imgSource = pokemonImageTypes.dark.uri
    } else if(data.type.name === 'dragon'){
        imgSource = pokemonImageTypes.dragon.uri
    } else if(data.type.name === 'electric'){
        imgSource = pokemonImageTypes.electric.uri
    } else if(data.type.name === 'fairy'){
        imgSource = pokemonImageTypes.fairy.uri
    } else if(data.type.name === 'fighting'){
        imgSource = pokemonImageTypes.fighting.uri
    } else if(data.type.name === 'flying'){
        imgSource = pokemonImageTypes.flying.uri
    } else if(data.type.name === 'ghost'){
        imgSource = pokemonImageTypes.ghost.uri
    } else if(data.type.name === 'ground'){
        imgSource = pokemonImageTypes.ground.uri
    } else if(data.type.name === 'ice'){
        imgSource = pokemonImageTypes.ice.uri
    } else if(data.type.name === 'normal'){
        imgSource = pokemonImageTypes.normal.uri
    } else if(data.type.name === 'poison'){
        imgSource = pokemonImageTypes.poison.uri
    } else if(data.type.name === 'psychic'){
        imgSource = pokemonImageTypes.psychic.uri
    } else if(data.type.name === 'rock'){
        imgSource = pokemonImageTypes.rock.uri
    } else if(data.type.name === 'steel'){
        imgSource = pokemonImageTypes.steel.uri
    } else if(data.type.name === 'water'){
        imgSource = pokemonImageTypes.water.uri
    }
    return(
        <Image style={{width: 40, height: 40}} source={imgSource}/>
    )
    
}

const styles = StyleSheet.create({
    containerTouchable:{
        flexDirection: 'row',
        paddingRight: 15,
        marginLeft: 15,
        marginBottom: 5,
        paddingVertical: 5,
        borderBottomColor: '#b0b0b0',
        borderBottomWidth: 1,
    },

})

export default ItemList;