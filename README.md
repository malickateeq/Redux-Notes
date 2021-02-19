# Redux Notes

# Introduction
- Redux is a state management library. It handles React state for entire app rahter then for a single component.
- It can work with other languages and libraries, not just for React.

# Redux Cycle

> 1. Action Creator > 2. Action > 3. Dispatch > 4. Reducers > 5. State 

## Analogy with Insurance Company

> Action Creator > 2. Action > 3. Dispatch > 4. Reducers > 5. State 
VerSus
> Customer > 2. the form > 3. form receiver > 4. Departments > 5. Compiled Department Data

# 1. Actions
- Action is just like submiting a data with its type / relevance. Then send it to Dispatcher to broadcast it to the Reducers.

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


# 2. Reducers:
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

# 3. Redux
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

# 4. Dispatch
- Store will dispatch the actions to all departments, whoever needs them.

```js
// Creating an action
const action = createPolicy("malik", 20);

// Dispatching it to all departments
store.dispatch(action);

// One Centeral Store for all data
console.log(store.getState());
```