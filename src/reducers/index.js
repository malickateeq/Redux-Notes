import {combineReducers} from "redux";


const songsReducer = () =>
{
    return [
        {
            title: "No Scrubs",
            duration: "4:05"
        },
        {
            title: "Macarena",
            duration: "2:30"
        },
        {
            title: "All Star",
            duration: "5:49"
        },
        {
            title: "I want it that way",
            duration: "99:59"
        },
    ];
};

const selectedSongReducer = (selectedSong = null, action) =>
{
    if(action.type === "SONG_SELECTED")
    {
        return action.payload;
    }
    return selectedSong;
};

// Combine the above reducers
export default combineReducers({
    songs: songsReducer,
    selectedSong: selectedSongReducer
});