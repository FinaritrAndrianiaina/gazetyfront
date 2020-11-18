import Axios from 'axios';
import React, { Component, useState } from 'react'
import { render } from 'react-dom';
import axiosInstance from '../axiosInstance'


class Home extends Component {
    state = {
        article:[]
    }
    constructor(props){
        super(props);
        axiosInstance.get("Article")
            .then((response) => this.setState({article:response.data}))
            .catch((error) => console.error(error));
    }
    render(){

        return (
            <>
            <p>This is home</p>
            {this.state.article.map((v,index)=>(
                <p>{v.titre}</p>
                ))}
        </>
    )
    }
}


export default Home
