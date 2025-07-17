import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import http from "../../../Http"
import IPrato from "../../../interfaces/IPrato"

const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get<IPrato[]>("pratos/")
            .then(response => {
                setPratos(response.data)
            })
    }, [])

    const excluir = (pratoAhSerExcluido: IPrato) => {
        http.delete(`restaurantes/${pratoAhSerExcluido.id}/`)
            .then(() => {
                const listaDePratos = pratos.filter(prato => prato.id !== pratoAhSerExcluido.id)
                setPratos([...listaDePratos])
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Pesquise seu restaurante:
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map(prato => <TableRow key={prato.id}>
                        <TableCell>
                            {prato.nome}
                        </TableCell>
                        <TableCell>
                            {prato.tag}
                        </TableCell>
                        <TableCell>
                            <a href={prato.imagem} target="_blank" rel="noreferrer">Ver imagem do prato</a>
                        </TableCell>
                        <TableCell>
                            [<RouterLink to={`/admin/pratos/${prato.id}`}>Editar</RouterLink>]
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoPratos
