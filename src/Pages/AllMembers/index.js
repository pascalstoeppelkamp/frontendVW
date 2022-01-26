import React, { Component } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'Vorname',
        width: 150,
        editable: false,
    },
    {
        field: 'lastName',
        headerName: 'Nachname',
        width: 150,
        editable: false,
    },
    {
        field: 'Email',
        headerName: 'E-Mail',
        width: 150,
        editable: false,
    },
    {
        field: 'Stadt',
        headerName: 'Stadt',
        width: 150,
        editable: false,
    },
    {
        field: 'Tel',
        headerName: 'Telefon',
        width: 150,
        editable: false,
    },
    {
        field: 'KontoName',
        headerName: 'Konto Name',
        width: 150,
        editable: false,
    },
    {
        field: 'IBAN',
        headerName: 'IBAN',
        width: 150,
        editable: false,
    }
];

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            rows: [],
            selected: false,
            selectedRow: []
        }
    }
    componentDidMount() {
        this.getAllMembers()
    }


    getAllMembers = () => {
        axios.get('http://localhost:5001/api/v1/Vereinsmitglied')
            .then(res => { this.setRows(res) })
            .catch(e => {
                console.log(e)
            });
    }

    setRows = (res) => {
        let ob = this.set(res.data.data)
        this.setState({ rows: ob })
    }

    set = (res) => {
        let arr = []
        for (let i = 0; i < res.length; i++) {
            arr.push({
                id: i,
                firstName: res[i].Vorname,
                lastName: res[i].Nachname,
                Email: res[i].Email,
                Stadt: res[i].Wohnort,
                Tel: res[i].Tel_NR,
                KontoName: res[i].Konto[0]?.Name,
                IBAN: res[i]?.Konto[0]?.IBAN,
            })
        }
        return arr
    }

    selected = (item) => {
        item = item[0];

        if (item || item === 0)
            this.setState({ selectedRow: this.state.rows[item], selected: true });
        else
            this.setState({ selectedRow: {}, selected: false });
    }

    render() {
        return (
            <div style={{ justifyContent: "flex-start", height: '100%', display: "flex", }}>
                <div style={{ display: 'flex', flexDirection: "column", flex: 1, minHeight: 600, padding: 20 }}>
                    <div style={{ alignSelf: "flex-start", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <IconButton disabled={!this.state.selected} aria-label="edit" style={{ margin: 5 }}>
                            <EditIcon />
                        </IconButton>
                        <IconButton disabled={!this.state.selected} aria-label="delete" style={{ margin: 5 }}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                    <DataGrid
                        onSelectionModelChange={(item) => this.selected(item)}
                        style={{ backgroundColor: "white",width:'100%' }}
                        rows={this.state.rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </div>
        )
    }
}
