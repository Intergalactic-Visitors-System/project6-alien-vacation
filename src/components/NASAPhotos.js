import React, { Component } from "react";
import axios from "axios";
import apiKeys from "../data/secrets";
import defaultPicture from "../assets/default.png";

class NASAPhotos extends Component {
    constructor(){
        super();
        this.state = {
            // empty string to store photo URL
            NASAPhoto: ""
        }
    }

    componentDidMount(){
        // axios request
        axios({
            url: `https://api.nasa.gov/planetary/earth/imagery`,
            dataResponse: 'json',
            method: 'GET',
            params: {
                lat: this.props.lat,
                lon: this.props.lng,
                cloud_score: true,
                api_key: apiKeys.nasa
            }
        }).then((response) => {
            this.setState({
                // store photo URL in state
                NASAPhoto: response.data.url
            })
        })
    }

    render(){
        let image;
        if (this.state.NASAPhoto !== '') {
            image = this.state.NASAPhoto;
        }
        else {
            image = defaultPicture;
        }
        return(
            // add alt
            <img className=
                "nasa" src={image} alt="Satellite View" />
        )
    }
}

export default NASAPhotos
