import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"


const FormularioPrato = () => {


    const [nomeDoPrato, setNomeDoPrato] = useState("")

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Box component="form" sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={aoSubmeterForm}>
                <Typography component="h1" variant="h6">
                    Formulario de Pratos
                </Typography>
                <TextField
                    value={nomeDoPrato}
                    onChange={evento => setNomeDoPrato(evento.target.value)}
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

export default FormularioPrato
