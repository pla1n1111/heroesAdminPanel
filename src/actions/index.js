export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const heroChangingName = (value) => {
    return {
        type: 'HERO_CHANGING_NAME',
        payload: value
    }
}

export const heroChangingDescription = (value) => {
    return {
        type: 'HERO_CHANGING_DESCRIPTION',
        payload: value
    }
}

export const heroChangingElement = (value) => {
    return {
        type: 'HERO_CHANGING_ELEMENT',
        payload: value
    }
}

export const filterActive = (value) => {
    return {
        type: 'FILTER_ACTIVE',
        payload: value
    }
}