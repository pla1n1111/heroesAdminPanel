import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {useHttp} from '../../hooks/http.hook';

// const heroesAdapter = createEntityAdapter();

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    newHero: {
        name: '',
        description: '',
        element: ''
    }
}

// const initialState = heroesAdapter.getInitialState({
//     heroesLoadingStatus: 'idle'
// });

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/heroes");
    }
);

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
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;

// export const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroChangingDescription,
    heroChangingElement,
    heroChangingName
} = actions;