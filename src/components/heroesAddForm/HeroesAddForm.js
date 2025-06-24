import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetched, heroesFetchingError, heroChangingDescription, heroChangingName, heroChangingElement } from '../heroesList/heroesSlice';
import { useHttp } from '../../hooks/http.hook';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const heroes = useSelector(state => state.heroes.heroes);
    const filters = useSelector(state => state.filters.filters);
    const {name, description, element} = useSelector(state => state.heroes.newHero);
    const {request} = useHttp();

    const dispatch = useDispatch();

    const changeName = (e) => {
        dispatch(heroChangingName(e.target.value));
    }

    const changeDescription = (e) => {
        dispatch(heroChangingDescription(e.target.value));
    }

    const changeElement = (e) => {
        dispatch(heroChangingElement(e.target.value));
    }

    const createNewCharacter = (e) => {
        e.preventDefault();
        const body = {id: uuidv4(), name, description, element};
        request("http://localhost:3001/heroes", 'POST', JSON.stringify(body))
            .then(() => dispatch(heroesFetched([...heroes, body])))
            .catch(() => dispatch(heroesFetchingError()))
    }

    const renderOptionsList = (arr) => {
            return arr.map(({name, label}) => {
                if (name !== 'all') {
                    return <option key={uuidv4()} value={name}>{label}</option>;    
                } else return null;
                
            })
        }

    const options = renderOptionsList(filters);

    return (
        <form onSubmit={createNewCharacter} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    onChange={changeName}
                    value={name}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    onChange={changeDescription}
                    value={description}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    onChange={changeElement}
                    value={element}>
                    <option >Я владею элементом...</option>
                    {options}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;