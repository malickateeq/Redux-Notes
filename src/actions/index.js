import jsonPlaceholder from "../apis/jsonPlaceholder";

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