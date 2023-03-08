import {useState} from 'react'

// type Props = {}

const Login = ({doLogin, loggedIn, username, doLogOut}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const doSubmit = (e) => {
    e.preventDefault();
    doLogin(email, password);
  }

  return (<>
    <div>{loggedIn?<span>Logged in as {username} <button onClick={doLogOut}>Log out</button></span>:
    <form onSubmit={doSubmit}>
        <input type="text" name="email" placeholder="Email" onChange={(evt)=>setEmail(evt.target.value)}/>
        <input type="password" name="password" placeholder="Password" onChange={(evt)=>setPassword(evt.target.value)}/>
        <input type="submit" value="Login" />
    </form>
    }</div>
  </>
  )
}
export default Login;