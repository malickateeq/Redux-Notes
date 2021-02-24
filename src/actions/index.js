import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from "lodash";

export const fetchPostsAndUsers = () =>
{
    return async (dispatch, getState) =>
    {
        // Calling another action creator inside an action creator and then dispatching it.
        // `await` is to make sure wait for this action to complete then go next
        // Here await is waiting for this API request to complete. "jsonPlaceholder.get("/posts")"; Network request wait
        // If you remove `await` it will continue execyting next line without the network request complete response.
        await dispatch(fetchPosts());

        // // Lodash library to fetch all `userId` then get unique array in them 
        // const userIds = _.uniq(_.map(getState().posts, 'userId'));
        // userIds.forEach( id => 
        // {
        //     // Its optional to put `await` here as I don't care when it'll complete. Coz this data is not dependent on next execution line.
        //     dispatch(fetchUser(id));
        // });

        // Or a compact rafactor for above 6 Lines
        _.chain(getState().posts)
        .map("userId")  // Inject 1st agr (posts) automatically by lodash
        .uniq() // Inject 1st agr (result from previos function map()) automatically by lodash
        .forEach(id => dispatch(fetchUser(id))) // Inject 1st agr (result from previos function uniq()) automatically by lodash
        .value();   // mandatory at the end to execute the _.chain() method.
    }
};

export const fetchPosts = () =>
{
    // We can use `async` with reduc-thunk function
    return async function(dispatch, getState)   // 2nd arg optional
    {
        const response = await jsonPlaceholder.get("/posts");
        dispatch({
            type: "FETCH_POSTS",
            payload: response.data
        });
    }
};


export const fetchUser = (id) =>
{
    return async function(dispatch)
    {
        const response = await jsonPlaceholder.get("/users/"+id);
        dispatch({
            type: "FETCH_USER",
            payload: response.data
        });
    }
};