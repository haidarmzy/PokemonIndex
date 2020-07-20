import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { uppercaseLetter, pokemonImageTypes, getPokemonImage } from '../utils/Utils';
import { values } from 'pokedex-promise-v2/src/default';
import { PokeAPI } from '../api/PokeAPI';

const PokemonDetailMoves = (props) => {
    let data = props.pokemonMoves;
    let imgSource;
    return data.map((res)=>{
        if (res.move_type){
            if(res.move_type.type.name === 'grass'){
                imgSource = pokemonImageTypes.grass.uri
            } else if(res.move_type.type.name=== 'fire'){
                imgSource = pokemonImageTypes.fire.uri
            } else if(res.move_type.type.name=== 'bug'){
                imgSource = pokemonImageTypes.bug.uri
            } else if(res.move_type.type.name=== 'dark'){
                imgSource = pokemonImageTypes.dark.uri
            } else if(res.move_type.type.name=== 'dragon'){
                imgSource = pokemonImageTypes.dragon.uri
            } else if(res.move_type.type.name=== 'electric'){
                imgSource = pokemonImageTypes.electric.uri
            } else if(res.move_type.type.name=== 'fairy'){
                imgSource = pokemonImageTypes.fairy.uri
            } else if(res.move_type.type.name=== 'fighting'){
                imgSource = pokemonImageTypes.fighting.uri
            } else if(res.move_type.type.name=== 'flying'){
                imgSource = pokemonImageTypes.flying.uri
            } else if(res.move_type.type.name=== 'ghost'){
                imgSource = pokemonImageTypes.ghost.uri
            } else if(res.move_type.type.name=== 'ground'){
                imgSource = pokemonImageTypes.ground.uri
            } else if(res.move_type.type.name=== 'ice'){
                imgSource = pokemonImageTypes.ice.uri
            } else if(res.move_type.type.name=== 'normal'){
                imgSource = pokemonImageTypes.normal.uri
            } else if(res.move_type.type.name=== 'poison'){
                imgSource = pokemonImageTypes.poison.uri
            } else if(res.move_type.type.name=== 'psychic'){
                imgSource = pokemonImageTypes.psychic.uri
            } else if(res.move_type.type.name=== 'rock'){
                imgSource = pokemonImageTypes.rock.uri
            } else if(res.move_type.type.name=== 'steel'){
                imgSource = pokemonImageTypes.steel.uri
            } else if(res.move_type.type.name=== 'water'){
                imgSource = pokemonImageTypes.water.uri
            }
        }
        return(
            <TouchableOpacity style={styles.containerTouchable}>
                <View style={{flex: 0.7, flexDirection: 'column'}}>
                    <Text style={{fontSize: 18}}>{uppercaseLetter(res.move.name)}</Text>
                    <Text style={{fontSize: 16, color: '#989898', marginTop: 5}}>Level {res.version_group_details[res.version_group_details.length-1].level_learned_at}</Text>
                </View>
                <View style={{flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Image style={{width: 40, height: 40}} source={imgSource}/>
                </View>
            </TouchableOpacity>
        );

    })
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

export default PokemonDetailMoves;