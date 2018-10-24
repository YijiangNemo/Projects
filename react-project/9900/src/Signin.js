import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component {
    constructor(props) {
         super(props);
         this.state = {status: 'Logout',token: ''};
         this.handleclick = this.handleclick.bind(this);
         this.handleregist = this.handleregist.bind(this);
         this.transfer_token = this.transfer_token.bind(this);
         this.submit_regist = this.submit_regist.bind(this);

    }
    submit_regist(){
        var username  = document.getElementById('regist-username').value;
        var email =document.getElementById('regist-email').value;
        var phone =document.getElementById('regist-phone').value;
        var password =document.getElementById('regist-password').value;
        const url = 'http://127.0.0.1:5000/register?username='+username +'&password='+password+'&email='+email+'&phone='+phone;

         fetch(url, {
             method: 'POST',
             mode: 'cors',


         }).then((res) => res.json()).then((data) => {
                if(data !='failed'){
                    alert(data)
                    this.setState({status: 'Logout'})
                }
                else{
                    alert(data)
                }
         })

    }
    transfer_token(){
        this.props.transfertoken('a');
    }
    handleregist(){
        this.setState({status: 'Regist'})
    }
    handleclick(){

      var myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    fetch("http://localhost:5000/auth?"+'username='+document.getElementById('login-email').value+'&'+'password='+document.getElementById('login-password').value, {
        method: 'post',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },

      }).then((res) => res.json()).then((data) => {
               if(data == 'incorrect password!' || data =='no such email'){
                   alert(data);
               }
               else{
                   this.setState({status:'Login',token:data})
               }

           })
      .catch(function(e) {
          console.log("Oops, error");
    });
    }
    render() {
        if(this.state.status == 'Login'){
            this.props.transfertoken(this.state.token);
        }
        const {classes} = this.props;
        if(this.state.status != 'Regist'){
        return (
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon/>
                        </Avatar>
                        <Typography variant="headline">Sign in</Typography>
                        <div className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="login-email" name="email" autoComplete="email"type="text" autoFocus/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="login-password"
                                    autoComplete="current-password"
                                />
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="raised"
                                color="primary"
                                className={classes.submit}
                                onClick = {this.handleclick}
                            >
                                Sign in
                            </Button>
                             <Button
                                type="submit"
                                fullWidth
                                variant="raised"
                                color="secondary"
                                className={classes.submit}
                                onClick = {this.handleregist}
                            >
                                Regist
                            </Button>
                        </div>
                    </Paper>
                </main>
            </React.Fragment>
        );}
        else{
            return(
                <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon/>
                        </Avatar>
                        <Typography variant="headline">Regist</Typography>
                        <div className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="regist-email" name="email" autoComplete="email"type="text" autoFocus/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input
                                    name="username"
                                    type="text"
                                    id="regist-username"
                                    autoComplete="current-password"
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="regist-password"
                                    autoComplete="current-password"
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Phone</InputLabel>
                                <Input
                                    name="phone"
                                    type="text"
                                    id="regist-phone"
                                    autoComplete="current-password"
                                />
                            </FormControl>

                             <Button
                                type="submit"
                                fullWidth
                                variant="raised"
                                color="primary"
                                className={classes.submit}
                                onClick = {this.submit_regist}
                            >
                                Regist
                            </Button>
                        </div>
                    </Paper>
                </main>
            </React.Fragment>
            )
        }
    }
}
SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);