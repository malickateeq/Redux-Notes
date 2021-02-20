import React, { Component } from 'react';
import { connect } from "react-redux";
import {selectSong} from "../actions";

class SongList extends Component 
{
    renderList(){
        return this.props.songs.map((song, index) => {
            return (
                <div key={index} className="item">
                    <div className="right floated content">
                        <button onClick={() => { this.props.selectSong(song) }} className="ui button primary">Select</button>
                    </div>
                    <div className="content">
                        {song.title}
                    </div>
                </div>
            );
        });
    };



    render() {
        console.log(this.props);
        return (
            <div className="ui divided list">
                { this.renderList() }
            </div>
        )
    }
}

const mapStatetoProps = (state) => 
{
    console.log(state);
    return { songs: state.songs }; 
}

export default connect(mapStatetoProps, {
    selectSong: selectSong
})(SongList);