import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"
import http from "../../../Http"


const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then(response => setNomeDoRestaurante(response.data.nome))
        }
    }, [parametros])

    const [nomeDoRestaurante, setNomeDoRestaurante] = useState("")

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeDoRestaurante
            })
                .then(() => {
                    alert("Atualizado com sucesso")
                })
        } else {
            http.post("restaurantes/", {
                nome: nomeDoRestaurante
            })
                .then(() => {
                    alert("Dado enviado")
                })
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Box component="form" sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={aoSubmeterForm}>
                <Typography component="h1" variant="h6">
                    Formulario de restaurantes
                </Typography>
                <TextField
                    value={nomeDoRestaurante}
                    onChange={evento => setNomeDoRestaurante(evento.target.value)}
                    label="Nome do restaurante"
                    variant="standard"
                    fullWidth
                    required
                />
                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>

    )
}

export default FormularioRestaurante
