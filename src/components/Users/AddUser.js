

import Card from '../UI/Card';
import React, { useState } from'react'; 

import classes from './AddUser.module.css'; 
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

const AddUser = (props) => {

   const [enteredUsername, setEnteredUsername] = useState('');
   const [enteredAge, setEnteredAge]= useState(''); 
   const [error, setError]= useState(); 


    const addUserHandler = (event) => {
        event.preventDefault();
        if(enteredUsername.trim().length ===0 || enteredAge.trim().length ===0){
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            });
            return;
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
        <input id="username" type ="text" value={enteredUsername} onChange={usernameChangeHandler}/>
        <label htmlFor="age">Age(Years)</label>
        <input id="age" type ="number" value={enteredAge}  onChange={ageChangeHandler}/>
        <Button type="submit">Add User </Button>
     </form>
     
    </Card>
</div>
    
    );
};

export default AddUser;
