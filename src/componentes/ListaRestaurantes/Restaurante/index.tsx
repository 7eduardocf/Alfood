import { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import Prato from '../Prato';
import estilos from './Restaurante.module.scss';
import axios from 'axios';
import IPrato from '../../../interfaces/IPrato';

interface RestauranteProps {
    restaurante: IRestaurante
}

const Restaurante = ({ restaurante }: RestauranteProps) => {

    const [pratos, setPratos] = useState<IPrato[]>()

    useEffect(()=>{
        axios.get("http://localhost:8000/api/v1/pratos/")
        .then(response =>{
            setPratos(response.data.results)
        })
    },[restaurante.id])

    return (<section className={estilos.Restaurante}>
        <div className={estilos.Titulo}>
            <h2>{restaurante.nome}</h2>
        </div>
        <div>
            {pratos?.map(item =>{
                return <Prato prato={item} key={item.id} />
            })}
        </div>
    </section>)
}

export default Restaurante