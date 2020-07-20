import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions, FlatList } from 'react-native';
import { uppercaseLetter, pokemonImageTypes, getPokemonImage } from '../utils/Utils';
import { values } from 'pokedex-promise-v2/src/default';
import { color } from 'react-native-reanimated';

const PokemonEvolution = (props) => {
    let dataPokemonChains = props.pokemonEvolutionData
    let pokemonSpeciesData = props.pokemonSpeciesData
    let pokemonTypesColor = props.pokemonTypesColor
    let rgbColor = 'rgb('+pokemonTypesColor[0]+','+pokemonTypesColor[1]+','+pokemonTypesColor[2]+')'

    return(
        <View style={styles.containerPokemonEvolution}>
            {dataPokemonChains.chain.evolves_to.length === 0 ? 
                <View style={styles.containerPokemonChains}>
                    <View style={styles.containerPokemonImage}>
                        <Image style={styles.pokemonImageStyle} source={{uri: getPokemonImage(dataPokemonChains.chain.species.url.slice(-5).replace(/[^0-9]/g,''))}}/>
                        <Text>{uppercaseLetter(dataPokemonChains.chain.species.name)}</Text>
                    </View>
                    <View style={styles.containerArrowChains}>
                        <Image style={{height: 20, width: 40}} source={require('../assets/icons/right-arrow.png')}/>
                    </View>
                    <View style={styles.containerPokemonImage}>
                        <Text style={{textAlign: 'center'}}>This Pokémon cannot be evolved</Text>
                    </View>
                </View>
                :
                <>
                {renderEvolutionPokemon(dataPokemonChains, pokemonTypesColor)}
                <View>
                    {dataPokemonChains.chain.evolves_to[0].evolves_to.length !== 0 ?
                        <View style={styles.containerPokemonChains}>
                            <View style={styles.containerPokemonImage}>
                                <Image style={styles.pokemonImageStyle} source={{uri: getPokemonImage(dataPokemonChains.chain.evolves_to[0].species.url.slice(-5).replace(/[^0-9]/g,''))}}/>
                                <Text>{uppercaseLetter(dataPokemonChains.chain.evolves_to[0].species.name)}</Text>
                            </View>
                            <View style={styles.containerArrowChains}>
                                <Text style={{...styles.evolutionTriggerText, color: rgbColor}}>
                                    {getTriggerText(dataPokemonChains.chain.evolves_to[0].evolves_to[0].evolution_details[0])}
                                </Text>
                                <Image style={{height: 20, width: 40}} source={require('../assets/icons/right-arrow.png')}/>
                            </View>
                            <View style={styles.containerPokemonImage}>
                                <Image style={styles.pokemonImageStyle} source={{uri: getPokemonImage(dataPokemonChains.chain.evolves_to[0].evolves_to[0].species.url.slice(-5).replace(/[^0-9]/g,''))}}/>
                                <Text>{uppercaseLetter(dataPokemonChains.chain.evolves_to[0].evolves_to[0].species.name)}</Text>
                            </View>
                        </View>
                        :
                        null
                    }
                </View>
                </>
            }
        </View>
    );
}

const getTriggerText = (text) => {
    if(text.min_level){
        if(text.relative_physical_stats !== null){
            if(text.relative_physical_stats === 1){
                return "Lv. " + text.min_level + " if stats Atk > Def"
            } else if(text.relative_physical_stats === 0){
                return "Lv. " + text.min_level + " if stats Atk = Def"
            } else if(text.relative_physical_stats === -1){
                return "Lv. " + text.min_level + " if stats Atk < Def"
            } 
        }
        return "Lv. " + text.min_level
    } else if(text.min_happiness){
        if(text.time_of_day){
            return "Min. Happiness " + text.min_happiness + " at " + text.time_of_day
        }
        return "Min. Happiness " + text.min_happiness
    } else if(text.held_item){
        return text.held_item.name
    } else if(text.item){
        return text.item.name
    } else if(text.time_of_day){
        return text.time_of_day 
    } else if(text.location){
        return "Lv. Up at " + text.location.name 
    } else if(text.known_move){
        return "Must known move " + text.known_move.name
    } else {
        return text.trigger.name
    }
}

const renderEvolutionPokemon = (dataPokemonChains, pokemonTypesColor) => {
    let data = dataPokemonChains.chain.evolves_to;
    let rgbColor = 'rgb('+pokemonTypesColor[0]+','+pokemonTypesColor[1]+','+pokemonTypesColor[2]+')'
    return data.map((res)=>{
        return(
            <View style={styles.containerPokemonChains}>
                <View style={styles.containerPokemonImage}>
                    <Image style={styles.pokemonImageStyle} source={{uri: getPokemonImage(dataPokemonChains.chain.species.url.slice(-5).replace(/[^0-9]/g,''))}}/>
                    <Text>{uppercaseLetter(dataPokemonChains.chain.species.name)}</Text>
                </View>
                <View style={styles.containerArrowChains}>
                    {dataPokemonChains.chain.evolves_to.length > 0 ? 
                        <Text style={{...styles.evolutionTriggerText, color: rgbColor}}>
                            {getTriggerText(res.evolution_details[0])}
                        </Text>
                        : 
                        null
                    }
                    <Image style={{height: 20, width: 40}} source={require('../assets/icons/right-arrow.png')}/>
                </View>
                <View style={styles.containerPokemonImage}>
                    {dataPokemonChains.chain.evolves_to.length === 0 ? 
                        <Text style={{textAlign: 'center'}}>This Pokémon cannot be evolved</Text>
                        :
                        <>
                        <Image style={styles.pokemonImageStyle} source={{uri: getPokemonImage(res.species.url.slice(-5).replace(/[^0-9]/g,''))}}/>
                        <Text>{uppercaseLetter(res.species.name)}</Text>
                        </>
                    }
                </View>
            </View>
        )
    })
}

const styles = StyleSheet.create({
    containerPokemonEvolution: {
        flexDirection: 'column',
        marginTop: 20,
        paddingHorizontal: 20
    },
    containerPokemonChains:{
        height: 100,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 40,
    },
    containerPokemonImage: {
        flex: 0.3,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerArrowChains: {
        flex: 0.4,
        height:100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pokemonImageStyle: {
        width: Dimensions.get('screen').height * 0.1, 
        height: Dimensions.get('screen').height * 0.1,
        marginBottom: 5
    },
    evolutionTriggerText: {
        fontSize: 12,
        marginBottom: 10,
        marginHorizontal: 10,
        textAlign: 'center'
    }
})

export default PokemonEvolution;