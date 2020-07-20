import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { uppercaseLetter, pokemonImageTypes, getPokemonImage, getPokemonBaseTypeColor } from '../utils/Utils';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { values } from 'pokedex-promise-v2/src/default';
import { variable } from '../utils/Variable';

const PokemonAbilities = (props) => {
    let data = props.pokemonAbilitiesData
    let typeColor = props.pokemonTypesColor[0].type.name
    let rgbColor = 'rgb('+getPokemonBaseTypeColor(typeColor)[0]+','+getPokemonBaseTypeColor(typeColor)[1]+','+getPokemonBaseTypeColor(typeColor)[2]+')'
    return(
        <View style={styles.containerAbility}>
            <View style={styles.containerTitle}>
                <Text style={{...styles.titleTextStyle, color: rgbColor}}>Abilities</Text>
            </View>
            {data.length > 0 ?
                renderAbility(data, rgbColor)
                : 
                <View style={styles.containerTitle}>
                    {/* <Text style={{color: variable.textColor}}>This Pokémon has no abilites</Text> */}
                    <ActivityIndicator/>
                </View>
            }

        </View>
    );
}

const renderAbility = (data, rgbColor) => {
    return data.map((res)=> {
        return (
            <View style={styles.containerAbilities}>
                <View style={styles.containerRow}>
                    <Text style={{color: rgbColor, marginBottom: 10}}>{uppercaseLetter(res.ability.name)}</Text>
                    {res.is_hidden ? 
                        <IonIcon name="eye-off-outline" size={18} color={rgbColor} style={{marginLeft: 5}}/>
                        :
                        null
                    }
                </View>
                <Text style={{color: variable.textColor}}>{res.description_ability[0].effect}</Text>
            </View>
        )
    })
}

const styles = StyleSheet.create({
    containerAbility: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        marginTop: 25,
    },
    containerTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    titleTextStyle: {
        fontSize: 18
    },
    containerRow: {
        flexDirection: 'row'
    },
    containerAbilities: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginBottom: 20
    }
})

export default PokemonAbilities;