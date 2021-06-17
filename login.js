function Login(){
    const [show,setShow]          = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const ctx = React.useContext(UserContext);

    function validate(field, label){
        if(!field){
            setStatus('Error: ' + label);
            setTimeout(() =>setStatus(''),3000);
            return false;
        }
        return true;
    }
    function handleLogin(){
        //check if the user exist in our context
        // if exist add a property current user
        // if does not exist we display a message to create a account and direct to create account
        
        const foundUser = ctx.users.find(user => user.email === email && user.password === password);
        if(foundUser){
            foundUser.current = true
            window.location.href = "/index.html#/balance/";
        }else{
            console.log('This User does not exist.')
           
        };
       











        
    }
    function handleCreate(){
        console.log(email,password);
        if(!validate(email,     'email'))    return;
        if(!validate(password,  'password')) return;
        ctx.users.push({email,password,balance:100});
        setShow(false);
    }
    function clearForm(){
        setEmail('');
        setPassword('');
        setShow(true);
    }

    return (
        <Card
            bgcolor="primary"
            header="Login"
            status={status}
            body={show ? (
                <>
                Email Address<br/>
                <input type="input" className="form-control" id="email"
                placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                Password<br/>
                <input type="password" className="form-control" id="password"
                placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
                </>
            ):(
                <>
                <h5>Sucess</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
                </>
            )}
        />
  )
}