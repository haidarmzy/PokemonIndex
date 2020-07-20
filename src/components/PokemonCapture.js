import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { uppercaseLetter, pokemonImageTypes, getPokemonImage, getPokemonBaseTypeColor, calculateCaptureRate } from '../utils/Utils';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { values } from 'pokedex-promise-v2/src/default';
import { variable } from '../utils/Variable';

const PokemonCapture = (props) => {
    let data = props.pokemonSpeciesData
    let typeColor = props.pokemonTypesColor[0].type.name
    let rgbColor = 'rgb('+getPokemonBaseTypeColor(typeColor)[0]+','+getPokemonBaseTypeColor(typeColor)[1]+','+getPokemonBaseTypeColor(typeColor)[2]+')'
    return(
        <View style={styles.containerCapture}>
            <View style={styles.containerTitle}>
                <Text style={{...styles.titleTextStyle, color: rgbColor}}>Capture</Text>
            </View>
            <View style={styles.containerColumn}>
                <View style={styles.containerRow}>
                    <View style={styles.containerInnerRow}>
                        <View style={styles.containerTitleHabitat}>
                            <Text style={{color: rgbColor}}>Habitat</Text>
                        </View>
                    </View>
                    <View style={styles.containerDividerRow}>
                        <View style={styles.dividerStyle}></View>
                    </View>
                    <View style={styles.containerInnerRow}>
                        <View style={styles.containerTitleHabitat}>
                            <Text style={{color: rgbColor}}>Generation</Text>
                        </View>
                    </View>
                    <View style={styles.containerDividerRow}>
                        <View style={styles.dividerStyle}></View>
                    </View>
                    <View style={styles.containerInnerRow}>
                        <View style={styles.containerTitleHabitat}>
                            <Text style={{color: rgbColor}}>Capture Rate</Text>
                        </View>
                    </View>
                </View>
                {renderCaptureData(data, rgbColor)}
            </View>
        </View>
    );
}

const renderCaptureData = (data, rgbColor) => {
    if(data === null){
        return(
            <View style={styles.containerRowContent}>
                <View style={styles.containerInnerRow}>
                    <ActivityIndicator/>
                </View>
                <View style={styles.containerDividerRow}>
                    <View style={styles.dividerStyle}></View>
                </View>
                <View style={styles.containerInnerRow}>
                    <ActivityIndicator/>
                </View>
                <View style={styles.containerDividerRow}>
                    <View style={styles.dividerStyle}></View>
                </View>
                <View style={styles.containerInnerRow}>
                    <ActivityIndicator/>
                </View>
            </View>
        )
    } else {
        return(
            <View style={styles.containerRowContent}>
                <View style={styles.containerInnerRow}>
                    <View style={styles.containerItemsHabitat}>
                        {data.habitat ? 
                            <Text style={{color: variable.textColor, textAlign: 'center'}}>{uppercaseLetter(data.habitat.name.replace(/-/g, ' '))}</Text>
                            :
                            <Text style={{color: variable.textColor, textAlign: 'center'}}>Unknown</Text>
                        }
                    </View>
                </View>
                <View style={styles.containerDividerRow}>
                    <View style={styles.dividerStyle}></View>
                </View>
                <View style={styles.containerInnerRow}>
                    <View style={styles.containerItemsHabitat}>
                        <Text style={{color: variable.textColor}}>{generationText(data.generation.name.replace(/-/g, ' '))}</Text>
                    </View>
                </View>
                <View style={styles.containerDividerRow}>
                    <View style={styles.dividerStyle}></View>
                </View>
                <View style={styles.containerInnerRow}>
                    <View style={styles.containerItemsHabitat}>
                        <Text style={{color: rgbColor}}>{calculateCaptureRate(data.capture_rate)} %</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const generationText = (text) => {
    let arrText = []
    let generation;
    let number;
    arrText = text.split(' ')
    if(arrText.length === 2){
        generation = uppercaseLetter(arrText[0])
        number = arrText[1].toUpperCase()
    }

    return generation + " " + number
} 


const styles = StyleSheet.create({
    containerCapture: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 25,
        paddingHorizontal: 10
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
        flexDirection: 'row',
        height: 60
    },
    containerRowContent: {
        flexDirection: 'row'
    },
    containerColumn: {
        flexDirection: 'column',
        marginTop: 15,
    },
    containerDividerRow: {
        flex: 0.05,
        alignItems: 'center',
    },
    containerInnerRow: {
        flex: 0.3,
        flexDirection: 'column'
    },
    dividerStyle: {
        flex: 1,
        backgroundColor: variable.lightGrey,
        width: 1
    },
    containerTitleHabitat: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    containerItemsHabitat: {
        alignItems: 'center',
        marginVertical: 5,
    },
    containerItemsHabitatMarBot: {
        alignItems: 'center',
        marginVertical: 5,
        marginBottom: 20
    },
})

export default PokemonCapture;