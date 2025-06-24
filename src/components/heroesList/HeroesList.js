import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetched, heroesFetchingError } from './heroesSlice';
import { fetchHeroes } from '../../actions/index'
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
 
// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const heroes = useSelector(state => state.heroes.heroes);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus)
    const activeFilter = useSelector(state => state.filters.activeFilter);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));

        // eslint-disable-next-line
    }, []);
    const delHero = (id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(() => dispatch(heroesFetched(heroes.filter(item => item.id !== id))))
            .catch(() => dispatch(heroesFetchingError()))
    };
    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, element, ...props}) => {
            if (element === activeFilter || activeFilter === 'all') {
                return <HeroesListItem element={element} key={id} id={id} delHero={delHero} {...props}/>
            } else return null;
        })
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;