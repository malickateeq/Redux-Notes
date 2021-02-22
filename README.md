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

