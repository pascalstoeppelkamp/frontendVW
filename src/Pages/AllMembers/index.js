import React, { Component } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'Vorname',
        headerName: 'Vorname',
        width: 150,
        editable: false,
    },
    {
        field: 'Nachname',
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
        field: 'role',
        headerName: "Benutzerrolle",
        width: 150,
        editable: false
    },
    {
        field: 'Beruf',
        headerName: "Beruf",
        width: 150,
        editable: false
    },
    {
        field: 'Wohnort',
        headerName: 'Stadt',
        width: 150,
        editable: false,
    },
    {
        field: 'Tel_NR',
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
            .then(res => {
                this.setRows(res);

            })
            .catch(e => {
                console.log(e)
                toast.error("Beim Laden der Mitglieder ist etwas schief gelaufen.")
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
                refID: res[i].id,
                id: i,
                Vorname: res[i].Vorname,
                Nachname: res[i].Nachname,
                Email: res[i].Email,
                Wohnort: res[i].Wohnort,
                Tel_NR: res[i].Tel_NR,
                KontoName: res[i].Konto[0]?.KontoName,
                IBAN: res[i]?.Konto[0]?.IBAN,
                password: res[i]?.password,
                role: res[i]?.role,
                Beruf: res[i]?.Beruf,
                hasPremium: res[i].hasPremium

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

    _editMember = () => {
        this.props.editMember(this.state.selectedRow)
    }

    _deleteMember = () => {
        axios.post('http://localhost:5001/api/v1/Vereinsmitglied/' + this.state.selectedRow.refID)
            .then(res => {
                toast.success("Mitglied wurde erfolgreich gelöscht.")
                this.getAllMembers()
            })
            .catch(e => {
                if (e !== {})
                    toast.error("Mitglied konnte nicht gelöscht werden.")
            });
    }
    render() {
        return (
            <div style={{ justifyContent: "flex-start", height: '100%', display: "flex", }}>
                <div style={{ display: 'flex', flexDirection: "column", flex: 1, minHeight: 600, padding: 20 }}>
                    <div style={{ alignSelf: "flex-start", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <IconButton disabled={!this.state.selected} aria-label="edit" style={{ margin: 5 }} onClick={() => this._editMember()}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => this._deleteMember()} disabled={!this.state.selected} aria-label="delete" style={{ margin: 5 }}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                    <Box
                        sx={{
                            height: 550,
                            width: 1,
                            '& .super-app-theme--true': {
                                backgroundColor: '#b9d5ff91',
                                color: '#1a3e72',
                            },
                            '& .super-app-theme--false': {
                                backgroundColor: '#ff999995',
                                color: '#1a3e72',
                            },

                        }}
                    >
                        <DataGrid
                            onSelectionModelChange={(item) => this.selected(item)}
                            style={{ backgroundColor: "white", width: '100%' }}
                            rows={this.state.rows}
                            columns={columns}
                            pageSize={15}
                            checkboxSelection
                            disableSelectionOnClick
                            getRowClassName={(params) => `super-app-theme--${params.row.role !== 'verwalter' ? params.row.hasPremium : null}`}
                        />
                    </Box>
                </div>
            </div>
        )
    }
}
