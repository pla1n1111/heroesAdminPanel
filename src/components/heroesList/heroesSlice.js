import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    newHero: {
        name: '',
        description: '',
        element: ''
    }
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        heroesFetched: (state, action) => {
                    state.heroesLoadingStatus = 'idle';
                    state.heroes = action.payload;
                },
        heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},
        heroChangingDescription: (state, action) => {
            state.newHero.description = action.payload;
        },
        heroChangingName: (state, action) => {
            state.newHero.name = action.payload;
        },
        heroChangingElement: (state, action) => {
            state.newHero.element = action.payload;
        }
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroChangingDescription,
    heroChangingElement,
    heroChangingName
} = actions;