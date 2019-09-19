import React, {Component} from 'react';

class Signin extends Component{
    constructor(props){
        super(props);
        this.state={
            signInEmail:'',
            signInPassword:''
        }
    }

    onEmailChange=(event)=>{
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange=(event)=>{
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn=(e)=>{
        e.preventDefault();
        fetch('https://afternoon-ravine-32146.herokuapp.com/signin', 
        {method: 'post', 
        headers:{'Content-Type':'application/json'}, 
        body: JSON.stringify(
            {
                email: this.state.signInEmail,
                password: this.state.signInPassword
            }
        )})
        .then(response=> response.json())
        .then(user =>{
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        }) 
    }
    render(){
        const {onRouteChange} = this.props;
        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <article className="pa4 white-80">
                    <form action="sign-up_submit">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="ph0 mh0 fw6 clip">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                            <input onChange={this.onEmailChange} 
                            className="pa2 input-reset ba bg-white w-100 measure" 
                            type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordChange} 
                            className="b pa2 input-reset ba bg-white" 
                            type="password" name="password"  id="password" />
                        </div>
                        </fieldset>
                        <div className="mt3"><input onClick={this.onSubmitSignIn} 
                        className="b ph3 pv2 input-reset ba b--black bg-white grow pointer f6" 
                        type="submit" value="Sign In" /></div>
                        <p className='f5 link underline pa2 pointer' 
                        onClick={()=>onRouteChange('register')}>Register</p>
                    </form>
                </article>
            </article>
            );
    }
    
    
}


export default Signin;