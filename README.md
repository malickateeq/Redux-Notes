# Redux Notes

# Introduction
- Redux is a state management library. It handles React state for entire app rahter then for a single component.
- It can work with other languages and libraries, not just for React.

# General

## `async` `await`

- `async` will always return a promise.
- To To actually consume the value returned when the promise fulfills, since it is returning a promise, we could use a .then() block:
- So the async keyword is added to functions to tell them to return a promise rather than directly returning the value.
```js
function hello() { return "Hello" };
hello();  // Output: Hello;

let hello = async function() { return "Hello" };
hello();  // Output: Promise {<fulfilled>: "Hello"}

// To consume output/response
hello().then(console.log)
```

- `await` await only works inside async functions
- `await` can be put in front of any async promise-based function to pause your code on that line until the promise fulfills, then return the resulting value.

```js
async function hello() { return greeting = await Promise.resolve("Hello"); };
hello().then(console.log);  // Hello 
```

## Named export
- A named export allows us to export many functions from a single file.
- To achieve this just place `export` keyword before each function.
```js
export const myFunc = (){};
```
- To import named functions
```js
import {myFunc, myFunc2, so on..} from "someFile.js";
```

## Mutation in JS
- Mutation is the modifying (add, update, delete) of contents/data of an array, object or otherwise.
```js
const colors = ['red', 'blue'];
colors.push('yellow');  // mutation!!!
colors.pop(); // remove yellow and return it // mutation!!!
colors[0] = 'reddish'; // mutation!!!
```

* Pro Tips!
- In JS strings and numbers are immutable values. Below is the demonstration
```js
const name = "Malik";
name[0]; // Output: Malik

// Try to mutate
name[0] = "Z";
name; // Output: Malik; It remains the same 

// So no need to worry about mutation in strings or nunbers only in objects and array mutation is possible.
```

## Comparisons in JS (Pro)

- In strings and numbers === compares values.
- In arrays and objects it compares for the exact same arrays or objects stored in memory reference.

```js
// 1. Here it is comparing values 
1 === 1   // Output: true
"hi" === "hi" // Output: true

// But in arrays and objects
const numbers = [1, 2, 3];
numbers === numbers // Output: true
// !!!
numbers === [1, 2, 3]; // Output: false
```

## _.memoize(arg1, arg2)
- memoize is an helper function of lodash library.
- It execute network request for a function only once with the same arguments.
- Next time memoize return the already fetched response.

## `find` method in JS
```js
const colors = ['red', 'green', 'blue'];
colors.find(color => color === blue); // Will return 'blue'
```


# Redux Cycle

> 1. Action Creator > 2. Action > 3. Dispatch > 4. Reducers > 5. State 

## Analogy with Insurance Company

> Action Creator > 2. Action > 3. Dispatch > 4. Reducers > 5. State 
VerSus
> Customer > 2. the form > 3. form receiver > 4. Departments > 5. Compiled Department Data

## Analogy In Action

### 1. Actions
- Action is just like submiting a data with its type / relevance. Then send it to Dispatcher to broadcast it to the Reducers.
- Actions describe how we want to change data in our application.
- Actions must return an JS object hence it can't be markes as `async`. As `async` will first return a request then other code exec.
- There're `async` Action Creators which are used to fetch data from APIs or execure `async` code.

```js
// People Dropping off form (Action Creator)
const createPolicy = (name, amount) => {
  return {  // Action (A form in our analogy)
    type: "CREATE_POLICY",
    payload: {
      name: name,
      amount: amount
    }
  }
};

const deletePolicy = (name) => {
  return { 
    type: "DELETE_POLICY",
    payload: {
      name: name
    }
  }
};

const createClaim = (name, amount) => {
  return { 
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      amountOfMoneytoCollect: amount
    }
  }
};
```


### 2. Reducers:
- The overall goal of reducers is to take some (existing data AND action) and then modify and return that existing data based on the type of an action.

```js

const claimsHistory = (oldListOfClaims = [], action) => {  // Action is just Like a form
    if(action.type == "CREATE_CLAIM")
    {
      // We will entertain this form
      return [...oldListOfClaims, action.payload];
    }
    else
    {
      // This form is of no relevance to us.
      return oldListOfClaims;
    }
};

const accounting = (bagOfMoney = 0, action) => {
    if(action.type == "CREATE_CLAIM")
    {
      return bagOfMoney - action.payload.amountOfMoneyToCollect;
    }
    else if(action.type == "CREATE_POLICY")
    {
        return bagOfMoney + action.payload.amount;
    }
    else
    {
      return bagOfMoney;
    }
};

const policies = (listOfPolicies = [], action) => {
    if(action.type == "CREATE_POLICY")
    {
      return [...listOfPolicies, action.payload.name];
    }
    else if(action.type == "DELETE_POLICY")
    {
        return listOfPolicies.filter( policy => {
        if(action.payload.name !== policy.name)
            return true;
        });
    }
    else
    {
      return listOfPolicies;
    }
};
```

### 3. Redux
- Redux in itself provides 1. centeral Store, 2. combineReducers, 3. applyMiddlewares, 4. bindActionCreators and 5. composing them off.
- So initially we take from Redux: `const {createStore, combineReducers} = Redux`
- A store in Redux is essentially the assembly of a collection of different Reducers and Action Creators.

```js
// 1. Combine All Reducers
const ourDepartments = combineReducers({
    accounting: accounting,
    claimsHistory: claimsHistory,
    policies: policies
});

// 2. Create a Store and bind Reducers with it.
const store = createStore(ourDepartments);
```

### 4. Dispatch
- Store will dispatch the actions to all departments, whoever needs them.

```js
// Creating an action
const action = createPolicy("malik", 20);

// Dispatching it to all departments
store.dispatch(action);

// One Centeral Store for all data
console.log(store.getState());
```

### Key Points
- There's no way that we can directly modify the store contents. The only way is through actions > reducers.

# React + Redux

This is how we use Redux in a React app.
The `React-Redux` library is use to connect the React app with Redux. Or provide an interface to use Redux.
> React (Library) + React-Redux (Interface Library) + Redux (The actual redux library)

## Installation
`npm install --save redux react-redux`
> React (Library) + React-Redux (Interface Library) + Redux (The actual redux library)

## Connect React with Redux
To connect React with Redux we will use `Provider` and `Connect` components provided by `React-Redux` library.

## How we will Connect
1. Pass the `store` to the `Provider` as prop.
2. Use the above `Provider` in root component. Declare it at the top!
3. Now to access `store` data in any component just use the `Connect`. Or wrap the component within `Connect`

### Provider:
* This provider will provide information or data to the App.

### Connect:
* The `Connect` will communicates with the `Provider`.
* It used the context system to communicate.
* The `Context Communication System` allows the components to communicate from Paret to the Child EVEN if many components presents within the hirarchy of Child and Parent. 
* `Connect` component harness the `Action Creators` capability to communicate data. 

|`Provider`|
<App />
....
..Entire App..
|`Connect`|

## Let's Connect

### Actions
- Place Actions inside `src/actions`
- Create `actions/index.js` to bundle up all actions in one file.
- Pro Tip: If you name any file `index.js` by importing it you can specify its folder and the index file therein will automatically be imported.
- Example;
```js
// Named export!
// Action Creator
export const selectSong = (song) => 
{
    // Return an action
    return {
        type: "SONG_SELECTED",
        payload: song
    };
};
```

### Reducers
- Place Reducers inside `src/reducers`. Bundle up in `index.js` file
- Example;
```js
import {combineReducers} from "redux";

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
    // selectedSong: selectedSongReducer
    // Other Reducers ...
});
```

### Set Up Provider
1. Use `Provider` in in App
- Goto index.js file
```js
ReactDOM.render(
    // Import createStore and all reducers from src dir files
    <Provider store={createStore(reducers)}>
        <App />
    </Provider>,
    document.getElementById("root")
);
```

### Use Connect to access data

- connect any component by just using connect function inside it.
```js
import { connect } from "react-redux";

...

export default connect()(SongList);
```
#### Pro Explaination behind above synax

```js
function connect()
{
	return function()
  {
    return "Hi there!";
  }
}
connect()();

// 1. `connect()` will call a function and return a function.
// 2. `()` additional parenthesis will call this returned function.
// Obviously we can add params to this functions.
```

### Access Data using Connect
- Specify just above the connect()()
```js

// This function name is just a convention it can be any name.
// It means goto `state/store` (ACTION)filter/calculations.. then send/map it to props(GET).
// The `state` in param is refer to all of the data inside Redux store.
// This function will runs everytime the state object changes.
const mapStatetoProps = (state) => 
{
    console.log(state);
    return state;
    // return { songs: state.songs };
}
export default connect(mapStatetoProps)(SongList);

// Now the data is accessible in `this.props` for class components. And in `props` for functional components.
```

### Action Creators in Connect

```js
const mapStatetoProps = (state) => 
{
    console.log(state);
    return state;
    // return { songs: state.songs };
}
export default connect(mapStatetoProps, {
    reducer1, myReducer1
    // It will automatically dispatches these functions/actions.
})(SongList);

// Call this reducer from props not directly!!!
@click => reducer1()
// This is because we need to tell Redux that this function call belongs to you. It can not listen to all function calls and decide on which call it need to perform some action.
// It can not automatically dispatch to the reducers.
```

# ~~~~~~~~~~ Detailed Redux ~~~~~~~~~~

## General Data Loading In Redux

1. Component rendered onto the screen
2. Component's `componentDidMount` lifecycle method gets called
3. We call action creator from `componentDidMount`
4. Action creator runs code to make an API request
5. API respond with data
6. Action creator returns an `action` with the fetched data on the payload property
7. Some reducer sees the action, returns the data off the payload
8. Because we generated some new state object, redux/react-redux cause our React app to be rerendered

### General Practices
* In general, components are responsible for fetching the data they need by calling actions.
* Action creators are usually responsible for making API requests.
* When we get data in store then we use `mapStateToProps` (data from `store` -> `components`) to get data in component's props
* We use async action creators to fetch data from APIs.

## Middlewares in Redux
> Action Creator > Action > Dispatch > Middleware > Reducers > State

- A middleware is a JS function that gets called with every action we dispatch.
- It has the ability to `STOP`, `MODIFY`, or otherwise mess around with actions.
- Most popular middleware in redux is for dealing with async actions is `redux-thunk`

### Redux Thunk (14 Lines of code :P)
- Can make Action Creators to return action `objects` or `functions`.
- Imp!! Redux thunk will wait for async call then manually `dispatch` the action creators to the Reducers.
- `thunk` will pass `dispatch` and `useState` to the function.

![Redux Thunk](public/git/thunk.png)

- Applying the middleware
```js
import thunk from "redux-thunk";
ReactDOM.render(
    <Provider store={createStore(reducers, applyMiddleware(thunk) )}>
        <App />
    </Provider>,
    document.getElementById("root")
);
```

## Action Creators

### Async Action Creator
- Async action creators runs async code therein. Can execute APIs etc.
- It requires `redux-thunk` middleware to make `async` action creator. `npm install redux-thunk`
```js
export const fetchPosts = () =>
{
  // We can use `async` with reduc-thunk function
  return async function(dispatch, getState)// 2nd arg optional
  {
      const response = await jsonPlaceholder.get("/posts");
      dispatch({
          type: "FETCH_POSTS",
          payload: response
      });
  }
};

// Pro: If we refactor this code ;)
// Here we're defining a function which is returning a function.
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");
  dispatch({ type: "FETCH_POSTS", payload: response });
};
```

## Thunk Action Creator

- Thunk will take-over this action creator when it is completed it will dispatch it to reducers
- Arg1: The first argument is the `dispatch` function provided by thunk to pipeline functions.
- Arg2: The `getState` 2nd argument is also a function to access entire state data
- You may not call `store.getState()` while the reducer is executing. 

```js
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
```

## Thunk Action Creator Delegation / Calling action creators from an action creator
- This method will show you how to pipeline action creators using thunk
- Whenever we `dispatch` a function `redux-thunk` will automatically pick it up and invoke it.
```js
export const fetchPostsAndUsers = () =>
{
    return async (dispatch, getState) =>
    {
        // Calling another action creator inside an action creator and then dispatching it.
        // `await` is to make sure wait for this action to complete then go next
        // Here await is waiting for this API request to complete. "jsonPlaceholder.get("/posts")"; Network request wait
        // If you remove `await` it will continue execyting next line without the network request complete response.
        await dispatch(fetchPosts());

        // Lodash library to fetch all `userId` then get unique array in them 
        const userIds = _.uniq(_.map(getState().posts, 'userId'));
        userIds.forEach( id => 
        {
            // Its optional to put `await` here as I don't care when it'll complete. Coz this data is not dependent on next execution line.
            dispatch(fetchUser(id));
        });

        // Or a compact rafactor for above 6 Lines
        _.chain(getState().posts)
        .map("userId")  // Inject 1st agr (posts) automatically by lodash
        .uniq() // Inject 1st agr (result from previos function map()) automatically by lodash
        .forEach(id => dispatch(fetchUser(id))) // Inject 1st agr (result from previos function uniq()) automatically by lodash
        .value();   // mandatory at the end to execute the _.chain() method.
    }
};
```

## Redcuers

- The main purpose of it is to store data in store when it is invoked.

### Rules of Reducer

0. Reducers get called automatically the first time for once `initialization` and then when it manually called.
1. Reducer must return any value besides 'undefined'.
2. Reducers produce 'state' or data to be used inside the app using only previous state and the action.
3. Upon initialization provide default value as `null` instead of `undefined`
4. We shall not make API request or other dummy data inside Reducers. Allowed (previos-state + action)
5. Must not mutate its input `state` argument.

```js
const selectedContracts = (contracts = null, action) => // initially contracts will be null isntead of undefined 
{
  // 1. first initialization call
  initialization...
  // 2. No api requests or other data
  NO API requests
  // 3. Must return valid data
  return except-undefined
  // 4. Pro: Must not mutate its `state` object. It is possible to mutate but will cause various problems
  // Mostly the `react-redux` is handling it in a bit different way. If changed it is returning new values for all reducers otherwise only updaing relevant.
  // Bottom line it will affect rest of the reducers. Cause the entire application to rerender.
}
```

### Safe State Updates in Reducers

- It will and should return a brand new sate object.

#### Arrays

1. Removing an element
```js
state.filter(element => element === "check");
```

2. Adding an element
```js
[...state, 'new Values'];
```

3. Replacing an element
```js
state.map(element => element === "check" ? 'newValue' : element);
```

#### Objects

1. Updating a property
```js
{ ...state, name: 'malik' }
```

2. Adding a property
```js
{ ...state, age: 97 }
```

2. Removing a property
```js
// Not recommended
{ ...state, age: undefined }
// OR be a Pro ;) recommended
_.omit(state, 'age');
// _.omit() is a lodash library
```

- Lodash is a popular JS library for working with objects, arrays, functions, numbers etc.

### Writing Code in Reducers - Practices
- We usually use `switch` inside reducers instead of `if-else`
- The first argument `state` will always be the previous value in `state/store`
```js
export default (state = [], action) =>
{
    switch(action.type)
    {
        case "FETCH_POSTS":
            return action.payload;
        default:
            return state;
    }
}
```