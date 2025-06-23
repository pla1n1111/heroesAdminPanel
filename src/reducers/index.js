const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    heroDeletingStatus: 'idle',
    filtersLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all',
    newHero: {
        name: '',
        description: '',
        element: ''
    }
}

const reducer = (state = initialState, action) => {
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
            case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
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
            case 'FILTER_ACTIVE':
                return {
                    ...state,
                    activeFilter: action.payload 
                }
        default: return state
    }
}

export default reducer;