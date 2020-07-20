import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { uppercaseLetter, pokemonImageTypes, getPokemonImage } from '../utils/Utils';
import { values } from 'pokedex-promise-v2/src/default';

const SearchPokemonView = (props) => {
    let data = props.searchedPokemonData
    console.log("HASIL DATA DI RENDER ", data)
    return(
        <TouchableOpacity style={styles.containerTouchable} onPress={props.onPressResult}>
            <View style={{flex: 0.2}}>
                {/* <Image style={{width: 60,height: 60}} source={{uri: getPokemonImage(pokemonId)}}/> */}
                <Image style={{width: 60,height: 60}} source={{uri: data.sprites.front_default}}/>
            </View>
            <View style={{flex: 0.5, flexDirection: 'column'}}>
                <Text style={{fontSize: 18}}>{uppercaseLetter(data.name)}</Text>
                <Text style={{fontSize: 16, color: '#989898', marginTop: 5}}>#{data.id}</Text>
            </View>
            <View style={{flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                    {data.types.map((values)=>{
                        let imgSource;
                        if(values.type.name === 'grass'){
                            imgSource = pokemonImageTypes.grass.uri
                        } else if(values.type.name === 'fire'){
                            imgSource = pokemonImageTypes.fire.uri
                        } else if(values.type.name === 'bug'){
                            imgSource = pokemonImageTypes.bug.uri
                        } else if(values.type.name === 'dark'){
                            imgSource = pokemonImageTypes.dark.uri
                        } else if(values.type.name === 'dragon'){
                            imgSource = pokemonImageTypes.dragon.uri
                        } else if(values.type.name === 'electric'){
                            imgSource = pokemonImageTypes.electric.uri
                        } else if(values.type.name === 'fairy'){
                            imgSource = pokemonImageTypes.fairy.uri
                        } else if(values.type.name === 'fighting'){
                            imgSource = pokemonImageTypes.fighting.uri
                        } else if(values.type.name === 'flying'){
                            imgSource = pokemonImageTypes.flying.uri
                        } else if(values.type.name === 'ghost'){
                            imgSource = pokemonImageTypes.ghost.uri
                        } else if(values.type.name === 'ground'){
                            imgSource = pokemonImageTypes.ground.uri
                        } else if(values.type.name === 'ice'){
                            imgSource = pokemonImageTypes.ice.uri
                        } else if(values.type.name === 'normal'){
                            imgSource = pokemonImageTypes.normal.uri
                        } else if(values.type.name === 'poison'){
                            imgSource = pokemonImageTypes.poison.uri
                        } else if(values.type.name === 'psychic'){
                            imgSource = pokemonImageTypes.psychic.uri
                        } else if(values.type.name === 'rock'){
                            imgSource = pokemonImageTypes.rock.uri
                        } else if(values.type.name === 'steel'){
                            imgSource = pokemonImageTypes.steel.uri
                        } else if(values.type.name === 'water'){
                            imgSource = pokemonImageTypes.water.uri
                        }
                        return(
                            <Image style={{width: 40, height: 40}} source={imgSource}/>
                        )
                    })}
                    {/* <Image style={{width: 40, height: 40}} source={require('../assets/icons/ic-water-types.png')}/> */}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerTouchable:{
        flexDirection: 'row',
        paddingRight: 15,
        marginLeft: 15,
        marginBottom: 5,
        paddingVertical: 5,
        paddingTop: 15,
        borderBottomColor: '#b0b0b0',
        borderBottomWidth: 1,
    },

})

export default SearchPokemonView;