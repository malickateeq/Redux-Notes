import React from 'react';
import { connect } from "react-redux";

const SongDetail = ({song}) => 
{
    if(!song)
    {
        return (
            <div>
                No Song Selected.
            </div>
        )
    }
    else
    {
        return (
            <div>
                Song Details:
                <br/>
                Title: {song.title}
                <br/>
                Duration: {song.duration}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { song: state.selectedSong };
};

export default connect(mapStateToProps)(SongDetail);