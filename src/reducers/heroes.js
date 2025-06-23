const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    newHero: {
        name: '',
        description: '',
        element: ''
    }
}

const heroes = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_CHANGING_NAME':
            return {
                ...state,
                newHero: {
                    ...state.newHero,
                    name: action.payload
                }
            }
        case 'HERO_CHANGING_DESCRIPTION':
            return {
                ...state,
                newHero: {
                    ...state.newHero,
                    description: action.payload
                }
            }
        case 'HERO_CHANGING_ELEMENT':
            return {
                ...state,
                newHero: {
                    ...state.newHero,
                    element: action.payload
                }
            }
        default: return state
    }
}

export default heroes;