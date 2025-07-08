import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"

const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(()=>{
        if(parametros.id){
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
                .then(response => setNomeDoRestaurante(response.data.nome))
        }
    },[parametros])

    const [nomeDoRestaurante, setNomeDoRestaurante] = useState("")

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>)=>{
        evento.preventDefault()

        if (parametros.id) {
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
                nome: nomeDoRestaurante
            })
            .then(()=>{
                alert("Atualizado com sucesso")
            })
        }else{
            axios.post("http://localhost:8000/api/v2/restaurantes/", {
                nome: nomeDoRestaurante
            })
            .then(()=>{
                alert("Dado enviado")
            })
        }
    }

    return (
        <form onSubmit={aoSubmeterForm}>
            <TextField value={nomeDoRestaurante} onChange={evento => setNomeDoRestaurante(evento.target.value)} label="Nome do restaurante" variant="standard" />
            <Button type="submit" variant="outlined">Salvar</Button>
        </form>
    )
}

export default FormularioRestaurante
