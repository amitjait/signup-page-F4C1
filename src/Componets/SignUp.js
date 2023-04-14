import React, { useState } from "react";

const SignUp = () =>{
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [pass, setPass] = useState("");
    let [cPass, setCPass] = useState(""); 

    let [error, setError] = useState("");
    let [success, setSucess] = useState("");

    function submit(e){
        e.preventDefault();

        if(checkFullName(name) && validateEmail(email) && validatePass(pass) && passCheck(pass, cPass)){
            setError("");
            setSucess("Successfully signed Up!")
        }else{
            setSucess("");
        }
        
    }

    function checkFullName(name){
        let spaces = false;

        if(name.length >= 1 && name.charAt(0) === " "){
            setError("Please Enter a valid full name!");
            return false;
        }

        let currName = "";
        for(let i=0; i<name.length; i++){
            if(name.charAt(i) !== " "){
                currName += name.charAt(i);
                spaces = false;
            }else{
                if(!spaces && i !== name.length-1){
                    currName += " ";
                    spaces = true;
                }
            }
        }
        
        let userName = currName.split(" ");

        if(userName.length < 2){
            setError("Enter Full Name!");
            return false;
        }

        return true;
    }

    function validateEmail(email){
        let regex = new RegExp('[a-z0-9]+@[a-z]+/.[a-z]{2,3}');

        if(!regex.test(email)){
            setError("Enter a valid Email ID!");
            return false;
        }
        return true;
    }

    function validatePass(pass){
        if(pass.length < 6){
            setError("Password should have at least 6 characters!")
            return false;
        }

        for(let i=0; i<pass.length; i++){
            if(pass.charAt(i) === ' '){
                setError("Enter a valid password!")
                return false;
            }
        }

        return true;
    }

    function passCheck(p, cp){
        if(p === cp){
            return true;
        }
        setError("Password should be same!");

        return false;
    }



    return (
        <div className="sign-up">
            <form className="form" onSubmit={submit}>
                <h1>Signup</h1>
                <input type="text" name="name" placeholder="Full Name" onChange={(e) => setName(e.target.value)}/>
                <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" name="password" placeholder="Password" onChange={(e) => setPass(e.target.value)}/>    
                <input type="password" name="c-password" placeholder="Confirm Password" onChange={(e) => setCPass(e.target.value)}/>
                {
                    error && 
                    <p className="error">{error}</p>
                }
                {
                    success &&
                    <p className="success">{success}</p>
                }
                
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUp;