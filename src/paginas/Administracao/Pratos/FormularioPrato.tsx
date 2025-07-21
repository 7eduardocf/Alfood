import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../Http"
import ITag from "../../../interfaces/ITag"
import IRestaurante from "../../../interfaces/IRestaurante"


const FormularioPrato = () => {


    const [nomeDoPrato, setNomeDoPrato] = useState("")
    const [descricao, setDescricaoDoPrato] = useState("")

    const [restaurante, setRestaurante] = useState("")
    const [tag, setTag] = useState("")

    const [imagem, setImagem] = useState<File | null>(null)

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [tags, setTags] = useState<ITag[]>([])

    useEffect(()=>{
        http.get< {tags: ITag[]} >("tags/")
            .then(response => setTags(response.data.tags))
        http.get<IRestaurante[]>("restaurantes/")
            .then(response => setRestaurantes(response.data))
    },[])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) =>{
        if(evento.target.files?.length){
            setImagem(evento.target.files[0])
        }else{
            setImagem(null)
        }
    }

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
                    label="Nome do prato"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                <TextField
                    value={descricao}
                    onChange={evento => setDescricaoDoPrato(evento.target.value)}
                    label="Descrição do prato"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                <FormControl margin="dense" fullWidth required>
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                        {tags.map(tag => <MenuItem value={tag.id} key={tag.id}>
                            {tag.value}
                        </MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl margin="dense" fullWidth required>
                    <InputLabel id="select-restaurante">Restaurante</InputLabel>
                    <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                        {restaurantes.map(restaurante => <MenuItem value={restaurante.id} key={restaurante.id}>
                            {restaurante.nome}
                        </MenuItem>)}
                    </Select>
                </FormControl>

                <input type="file" onChange={selecionarArquivo}/>

                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>

    )
}

export default FormularioPrato
