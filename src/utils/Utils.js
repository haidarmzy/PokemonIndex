import { color } from 'react-native-reanimated';

export function uppercaseLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1)
}

export const pokemonImageTypes = {
    grass : {
        uri: require('../assets/icons/ic-grass-types.png'),
        color: [93,190,98]
    },
    fire : {
        uri: require('../assets/icons/ic-fire-types.png'),
        color: [248,165,79]
    },
    bug : {
        uri: require('../assets/icons/ic-bugs-types.png'),
        color: [157,193,48]
    },
    dark : {
        uri: require('../assets/icons/ic-dark-types.png'),
        color: [95,96,109]
    },
    dragon : {
        uri: require('../assets/icons/ic-dragon-types.png'),
        color: [7,115,199]
    },
    electric : {
        uri: require('../assets/icons/ic-electric-types.png'),
        color: [242,215,83]
    },
    fairy : {
        uri: require('../assets/icons/ic-fairy-types.png'),
        color: [239,151,230]
    },
    fighting :{
        uri: require('../assets/icons/ic-fight-types.png'),
        color: [217,66,86]
    },
    flying :{
        uri: require('../assets/icons/ic-flying-types.png'),
        color: [155,180,232]
    },
    ghost :{
        uri: require('../assets/icons/ic-ghost-types.png'),
        color: [105,112,197]
    },
    ground :{
        uri: require('../assets/icons/ic-ground-types.png'),
        color: [215,133,85]
    },
    ice :{
        uri: require('../assets/icons/ic-ice-types.png'),
        color: [126,212,201]
    },
    normal :{
        uri: require('../assets/icons/ic-normal-types.png'),
        color: [154,157,161]
    },
    poison :{
        uri: require('../assets/icons/ic-poison-types.png'),
        color: [181,99,206]
    },
    psychic :{
        uri: require('../assets/icons/ic-psychic-types.png'),
        color: [248,124,122]
    },
    rock :{
        uri: require('../assets/icons/ic-rock-types.png'),
        color: [206,193,140]
    },
    steel :{
        uri: require('../assets/icons/ic-steel-types.png'),
        color: [85,150,164]
    },
    water :{
        uri: require('../assets/icons/ic-water-types.png'),
        color: [85,158,223]
    }, 
}

export const pokemonTag = {
    grass : {
        uri: require('../assets/icons/ic-grass-tag.png')
    },
    fire : {
        uri: require('../assets/icons/ic-fire-tag.png')
    },
    bug : {
        uri: require('../assets/icons/ic-bug-tag.png')
    },
    dark : {
        uri: require('../assets/icons/ic-dark-tag.png')
    },
    dragon : {
        uri: require('../assets/icons/ic-dragon-tag.png')
    },
    electric : {
        uri: require('../assets/icons/ic-electric-tag.png')
    },
    fairy : {
        uri: require('../assets/icons/ic-fairy-tag.png')
    },
    fighting :{
        uri: require('../assets/icons/ic-fighting-tag.png')
    },
    flying :{
        uri: require('../assets/icons/ic-flying-tag.png')
    },
    ghost :{
        uri: require('../assets/icons/ic-ghost-tag.png')
    },
    ground :{
        uri: require('../assets/icons/ic-ground-tag.png')
    },
    ice :{
        uri: require('../assets/icons/ic-ice-tag.png')
    },
    normal :{
        uri: require('../assets/icons/ic-normal-tag.png')
    },
    poison :{
        uri: require('../assets/icons/ic-poison-tag.png')
    },
    psychic :{
        uri: require('../assets/icons/ic-psychic-tag.png')
    },
    rock :{
        uri: require('../assets/icons/ic-rock-tag.png')
    },
    steel :{
        uri: require('../assets/icons/ic-steel-tag.png')
    },
    water :{
        uri: require('../assets/icons/ic-water-tag.png')
    }, 
}

export function getPokemonImage(pokemonId){
    return 'https://pokeres.bastionbot.org/images/pokemon/'+pokemonId+'.png'
}

export function removeLineBreaks(text){
    return text.replace(/(\r\n|\n|\r)/gm, "");
}

export function getPokemonBaseTypeColor(type){
    let color;
    if(type=== 'grass'){
        color = pokemonImageTypes.grass.color
    } else if(type=== 'fire'){
        color = pokemonImageTypes.fire.color
    } else if(type=== 'bug'){
        color = pokemonImageTypes.bug.color
    } else if(type=== 'dark'){
        color = pokemonImageTypes.dark.color
    } else if(type=== 'dragon'){
        color = pokemonImageTypes.dragon.color
    } else if(type=== 'electric'){
        color = pokemonImageTypes.electric.color
    } else if(type=== 'fairy'){
        color = pokemonImageTypes.fairy.color
    } else if(type=== 'fighting'){
        color = pokemonImageTypes.fighting.color
    } else if(type=== 'flying'){
        color = pokemonImageTypes.flying.color
    } else if(type=== 'ghost'){
        color = pokemonImageTypes.ghost.color
    } else if(type=== 'ground'){
        color = pokemonImageTypes.ground.color
    } else if(type=== 'ice'){
        color = pokemonImageTypes.ice.color
    } else if(type=== 'normal'){
        color = pokemonImageTypes.normal.color
    } else if(type=== 'poison'){
        color = pokemonImageTypes.poison.color
    } else if(type=== 'psychic'){
        color = pokemonImageTypes.psychic.color
    } else if(type=== 'rock'){
        color = pokemonImageTypes.rock.color
    } else if(type=== 'steel'){
        color = pokemonImageTypes.steel.color
    } else if(type=== 'water'){
        color = pokemonImageTypes.water.color
    }

    return color
}

export function calculateCaptureRate(value) {
    let result;
    result = ((value/255)*100).toFixed(1).toString()

    return result
}