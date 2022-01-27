import React, { Component } from 'react';
import JSONSchemaForm from "react-jsonschema-form";
import axios from 'axios';
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberObj: {
                Vorname: "",
                Nachname: "",
                Email: "",
                Wohnort: "",
                Tel_NR: "",
                KontoName: "",
                IBAN: ""
            },
            pageType: ""
        }
    }
    componentDidMount() {
        let memberData = this.props.memberData;
        if (Object.keys(memberData).length !== 0)
            this.setData(memberData)
        else
            this.setState({ pageType: "addMember" })
    }

    onSubmit = () => {
        let pageType = this.state.pageType;
        let memberObj = this.state.memberObj;
        if (pageType !== "editMember") {
            axios.post('http://localhost:5001/api/v1/Vereinsmitglied', {
                ...memberObj
            })
                .then(res => alert("hat geklappt"))
                .catch(e => {
                    console.log(e);
                    alert("hat nicht geklappt")
                });
        }
        else {
            axios.put('http://localhost:5001/api/v1/Vereinsmitglied/' + memberObj.refID, {
                ...memberObj
            })
                .then(res => alert("hat geklappt"))
                .catch(e => {
                    console.log(e);
                    alert("hat nicht geklappt")
                });
        }
    }

    changeData = (event) => {
        let formData = event.formData;
        let memberData = this.state.memberObj;
        let changed = false;
        for (let item in memberData) {
            if (memberData[item] !== formData[item] && formData[item]) {
                memberData[item] = formData[item];
                if (!changed)
                    changed = true;
            }
        }
        if (changed)
            this.setState({ memberData: memberData })
    }

    setData = (memberData) => {
        this.setState({ memberObj: memberData, pageType: "editMember" })
    }

    render() {

        const postSchemaMember = {
            type: "object",
            properties: {
                Vorname: {
                    title: "Vorname",
                    type: "string",
                    default: this.state.memberObj.Vorname,
                    minLength: 5,
                    maxLength: 140
                },
                Nachname: {
                    title: "Nachname",
                    type: "string",
                    default: this.state.memberObj.Nachname,
                    minLength: 5,
                    maxLength: 140
                },
                Email: {
                    title: "Email",
                    type: "string",
                    default: this.state.memberObj.Email,
                },
                Wohnort: {
                    title: "Wohnort",
                    type: "string",
                    default: this.state.memberObj.Wohnort,
                },
                Tel_NR: {
                    title: "Telefon Nummer",
                    type: "string",
                    default: this.state.memberObj.Tel_NR,
                }
            },
            required: ["Vorname", "Nachname", "Email", "Wohnort", "Tel_NR"]
        };


        const postSchemaAccount = {
            type: "object",
            properties: {
                Name: {
                    title: "Name",
                    default: this.state.memberObj.KontoName,
                    type: "string",
                },
                IBAN: {
                    title: "IBAN",
                    default: this.state.memberObj.IBAN,
                    type: "number",
                },
            },
            required: ["Name", "IBAN"]
        };

        return <div style={{ padding: 10 }}>
            <h2 style={{ padding: 10 }}>Mitglied {this.state.pageType === "editMember" ? "bearbeiten" : "hinzufügen"}</h2>
            <h3 style={{ padding: 20 }}>Mitglied</h3>
            <JSONSchemaForm onChange={(item) => this.changeData(item)} schema={postSchemaMember}>
                <br />
                <h3 style={{ padding: 10 }}>Konto</h3>
            </JSONSchemaForm>
            <JSONSchemaForm onChange={(item) => this.changeData(item)} schema={postSchemaAccount} onSubmit={this.onSubmit} />

        </div>
    }
}
