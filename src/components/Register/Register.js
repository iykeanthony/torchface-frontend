import React from 'react';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            name:''
        }
    }

    onEmailChange=(event)=>{
        this.setState({email: event.target.value});
    }

    onPasswordChange=(event)=>{
        this.setState({password: event.target.value});
    }

    onNameChange=(event)=>{
        this.setState({name: event.target.value});
    }

    onSubmitSignIn=(e)=>{
        e.preventDefault();
        fetch('https://afternoon-ravine-32146.herokuapp.com/register', 
        {method: 'post', 
        headers:{'Content-Type':'application/json'}, 
        body: JSON.stringify(
            {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            }
        )})
        .then(response=> response.json())
        .then(user =>{
            if(user){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    render(){
        return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <article className="pa4 white-80">
                <form action="sign-up_submit">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6 clip">Register</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="name">Name</label>
                        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-white w-100 measure" type="text" name="name"  id="name" required />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-white w-100 measure" type="email" name="email-address"  id="email-address" required/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-white" type="password" name="password"  id="password" required/>
                    </div>
                    </fieldset>
                    <div className="mt3"><input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-white grow pointer f6" type="submit" value="Sign Up" /></div>
                </form>
            </article>
        </article>
        );
}}


export default Register;