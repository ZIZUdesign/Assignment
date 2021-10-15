

import Card from '../UI/Card';
import React, { useState } from 'react'; 

import classes from './AddUser.module.css'; 
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

const AddUser = (props) => {

    // this can be also done using useRef()
    // const nameInputRef = useRef();
    // const ageInputRef = useRef();



   const [enteredUsername, setEnteredUsername] = useState('');
   const [enteredAge, setEnteredAge]= useState(''); 
   const [error, setError] = useState(); 


    const addUserHandler = (event) => {
        event.preventDefault();
        // const enteredName = nameInputRef.current.value;
        // const enteredUserAge = ageInputRef.current.value; 
        if(enteredUsername.trim().length === 0 || enteredAge.trim().length ===0){
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            });
            return;

            // if(enteredName.trim().length ===0 || entereUserdAge.trim().length ===0){
            //     setError({
            //         title: 'Invalid input',
            //         message: 'Please enter a valid name and age (non-empty values).'
            //     });
            //     return;

            
        }
        //since the user input is a string and should be converted into number. 
        if(+enteredAge < 1){
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (> 0).'
            });
            return; 
        }
        //  lifting the state up: This sendes the user inputs up to the parent component i.e, App comp and the 
        //  the comp saves the incoming user in the users array and then sendes down to its child UserList via props 
        props.onAddUser(enteredUsername, enteredAge);

        setEnteredUsername(''); 
        setEnteredAge('');

    };

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value); 

    };

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value); 
    };

    const errorHandler = () => {
        setError(null);
    };

    return (
<div>
    { error && <ErrorModal title= {error.title} message={error.message} onConfirm= {errorHandler}/>}
    <Card className= {classes.input}> 
     <form onSubmit={addUserHandler} >
        <label htmlFor="username">Username</label>
        <input id="username" type ="text" value={enteredUsername} 
        onChange={usernameChangeHandler}
        // ref={nameInputRef}
        />
        <label htmlFor="age">Age(Years)</label>
        <input id="age" type ="number" value={enteredAge}  
        onChange={ageChangeHandler}
        // ref={ageInputRef}
        />
        <Button type="submit"> Add user </Button>
     </form>
      </Card>
</div>
    
    );

    
// How TO USE useRef() TO READ THE CURRENT VALUE OF THE USER INPUT 
// --------------------------------------------------------------------------
// // we can also get access to the value of the input fields using useRef() react hook

// const nameInputRef = useRef();
// const ageInputRef = useRef();

// // and in the input fields 
// <input id= "username" type= "text" ref= {nameInputRef} />
// <input id="age" type="number" ref= {ageInputRef} /> 
// useRef has a 'current' property and, using this current propery we access the 
// value of the user input 

// when the form is submitted 
// const addUserHandler = (event) => {
//     event.preventDefault();

//     const enteredName = nameInputRef.current.value();
//     const enteredUserAge = ageInputRef.current.value();

//     // check if the inputs are valid 
//     if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0){
//         setError({
//             title: 'Invlaid input',
//             message: 'Please enter a valid name and age (non-empty values.)',
//         });
//         return;
//     }
//     if(+enteredUserAge < 1){
//         setError({
//             title: 'Invalid age',
//             message: 'Please enter a valid age (>0)',
//         });

//         return; 
//     }

//     props.onAddUser(enteredName, enteredUserAge);
//     // Thought it is not recommended to manipulate the DOM using Refs, but it can 
//     // be resett the values of the input fields as following
//     nameInputRef.current.value = '';
//     ageInputRef.current.value=''; 

//           useRef vs useState
//           ----------------------------
// if your target is to read the value of the user input, but not to change it , 
// better to use useRef() react hook.
// if you want to get acces and at the same time to change the value of the input fields, better
// to use useState() react hook
//       controlled and un-controlled controls 
//       -------------------------------------------
// input fields which we have access using useRef are un-controlled. since we can't change
// the values of the fields. 
// input filds which have access to using useState are controlled since we can change the 
// values of the input fields. 

// }

};

export default AddUser;


