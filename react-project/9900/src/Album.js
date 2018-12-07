import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Call from '@material-ui/icons/Call';
import Email from '@material-ui/icons/Email';
import Calender from '@material-ui/icons/CalendarToday';
import Add_comment from '@material-ui/icons/AddComment';
import Event_Note from '@material-ui/icons/EventNote';
import Business from '@material-ui/icons/Business';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
    expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

class Album extends React.Component {
    constructor(props) {
         super(props);
         this.state = {status: 'Logout',token: '',open:false, viewopen:false,commentopen:false,selected:'',index:''};


    }

 handleClickOpen(data) {
        console.log(data);
        var i = data.replace('eidt-btn','')
        this.setState({ index: parseInt(i) });
    this.setState({ open: true });

  };
    handleCommentOpen(data) {
        console.log(data);
        var i = data.replace('comment-btn','')
        this.setState({ index: parseInt(i) });
    this.setState({ commentopen: true });

  };
    handleViewOpen(data) {
        console.log(data);
        var i = data.replace('view-btn','')
        this.setState({ index: parseInt(i) });
        var view = this.state.viewopen;
        view[i] = true
    this.setState({ viewopen: view });

  };
    handleCancelClose = () => {
      var jsonstr =window.localStorage.getItem("jsonkey_user");
      var json = JSON.parse(jsonstr);
      if(json!= null){
          var user_id = json['user_id'];
          var order_id = this.props.all_item[this.state.index]['his_id'];
          var myHeaders = new Headers({
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          'AUTH_TOKEN' : document.cookie.split(";")[0].split("=")[1]
        });

        const url = 'http://127.0.0.1:5000/cancel_order_login?user_id='+user_id+'&order_id='+order_id;
        console.log(document.cookie.split(";")[0].split("=")[1]);
        fetch(url, {
            method: 'POST',
            headers: myHeaders,
            mode:'cors'
        }).then((res) => res.json()).then((data) => {



             alert(data)

           })
      .catch(function(e) {
          alert('Please Login!')
    });

      }
      else{
          alert('Please Login')
      }
    this.setState({ open: false });
  };
    handleComfirmClose = () => {
      var jsonstr =window.localStorage.getItem("jsonkey_user");
      var json = JSON.parse(jsonstr);
      if(json!= null){
          console.log(this.props.all_item)
          var user_id = json['user_id'];
          var order_id = this.props.all_item[this.state.index]['his_id'];
          var checkin = Math.round(Date.parse(new Date(document.getElementById('check-in-album').value))/1000);
          var checkout = Math.round(Date.parse(new Date(document.getElementById('check-out-album').value))/1000);
            var myHeaders = new Headers({
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          'AUTH_TOKEN' : document.cookie.split(";")[0].split("=")[1]
        });

        const url = 'http://127.0.0.1:5000/change_time?user_id='+user_id+'&check_in_time='+checkin+'&check_out_time='+checkout+'&order_id='+order_id;
        console.log(document.cookie.split(";")[0].split("=")[1]);
        fetch(url, {
            method: 'post',
            headers: myHeaders,
            mode: 'cors'

        }).then((res) => res.json()).then((data) => {



             alert(data)

           })
      .catch(function(e) {
          alert('Please Login!')
    });
      }
      else{
          alert('Please Login')
      }
    this.setState({ open: false });
  };
    submitcomment =() =>{
        var data = this.props.all_item
         var jsonstr =window.localStorage.getItem("jsonkey_user");
      var json = JSON.parse(jsonstr);
      if(json!= null){
          var user_id = json['user_id'];
          var rating = document.getElementById('rating-albums').value;
          var comment = document.getElementById('comment-album').value;
          var acco_id = data[this.state.index]['acco_id'];
          var myHeaders = new Headers({
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          'AUTH_TOKEN' : document.cookie.split(";")[0].split("=")[1]
        });

        const url = 'http://127.0.0.1:5000/update_review?user_id='+user_id+'&rating='+rating+'&comment='+comment+'&acco_id='+acco_id;
        console.log(document.cookie.split(";")[0].split("=")[1]);
        fetch(url, {
            method: 'get',
            headers: myHeaders

        }).then((res) => res.json()).then((data) => {



             alert(data)

           })
      .catch(function(e) {
          alert('Please Login!')
    });
      }
      else{
          alert('Please Login')
      }
    this.setState({ commentopen: false });
    }
  handleClose = () => {
      var jsonstr =window.localStorage.getItem("jsonkey_user");
      var json = JSON.parse(jsonstr);
      if(json!= null){
          var user_id = json['user_id'];
          var rating = document.getElementById('check-in-album');
          var comment = document.getElementById('check-out-album');

      }
      else{
          alert('Please Login')
      }
    this.setState({ open: false });
  };
  handleviewClose = () => {
      var view = this.state.viewopen;
      for (var i in view){
          view[i] = false
      }
    this.setState({ viewopen: view });
  };
  componentDidMount() {
      var data = this.props.all_item
        console.log(data)
        var view = []
        for (var j=0;j<data.length;j++){
            view.push(false)
        }
        this.setState({viewopen:view})
  }
  handlecommentClose = () => {

    this.setState({ commentopen: false });
  };

  render () {
        var data = this.props.all_item
        console.log(data)

        const {classes} = this.props;
        const elements = []
        for(var i = 0;i<data.length;i++){
            elements.push(
                 <Grid item key={data[i]['acco_id']} sm={6} md={4} lg={3}>
                              <Card className={classes.card}>
                                  <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }

          title={data[i]['acco_id']}
          subheader={new Date(parseInt(data[i]['timestamp'].toString()+'000')).toLocaleDateString()}
        />
                                  <CardMedia
                                      className={classes.cardMedia}
                                      image={"assets/images/property/"+data[i]['acco_id']+".png"} // eslint-disable-line max-len
                                      title="Image title"
                                  />
                                  <CardContent className={classes.cardContent}>
                                      <Typography gutterBottom variant="h2" component="h5">
                                          {'Order ID:'+data[i]['his_id']}
                                      </Typography>
                                      <Typography>
                                          {'Check In:'+new Date(parseInt(data[i]['check_in_time'].toString()+'000')).toLocaleDateString()}
                                      </Typography>
                                      <Typography>
                                          {'Check In:'+new Date(parseInt(data[i]['check_out_time'].toString()+'000')).toLocaleDateString()}
                                      </Typography>
                                  </CardContent>
                                  <CardActions>
                                       <Tooltip title="Order Detail" >
                                      <button id={'view-btn'+i} style = { {
  'background-color': '#162ef4',
  'border': 'none',
  'color': 'white',
  padding: '4px 10px',
  'text-align': 'center',
  'font-size': '10px',
  margin: '4px 2px',
  opacity: '0.6',
  transition: '0.3s',
  display: 'inline-block',
  'text-decoration': 'none',
  'cursor': 'pointer',
}} onClick = {(e)=>this.handleViewOpen(e.target.id)}>
                                          View
                                      </button>
                                       </Tooltip>
                                      <Tooltip title="Change Time or Cancel" >
                                      <button style = { {
  'background-color': '#162ef4',
  'border': 'none',
  'color': 'white',
  padding: '4px 10px',
  'text-align': 'center',
  'font-size': '10px',
  margin: '4px 2px',
  opacity: '0.6',
  transition: '0.3s',
  display: 'inline-block',
  'text-decoration': 'none',
  'cursor': 'pointer',
}} id={'eidt-btn'+i}  onClick = {(e)=>this.handleClickOpen(e.target.id)}>
                                          Edit
                                      </button>
                                      </Tooltip>
                                       <Tooltip title="Add Some Comments" >
                                      <button style = { {
  'background-color': '#162ef4',
  'border': 'none',
  'color': 'white',
  padding: '4px 10px',
  'text-align': 'center',
  'font-size': '10px',
  margin: '4px 2px',
  opacity: '0.6',
  transition: '0.3s',
  display: 'inline-block',
  'text-decoration': 'none',
  'cursor': 'pointer',
}} id={'comment-btn'+i} onClick = {(e)=>this.handleCommentOpen(e.target.id)}>

                                          Comment
                                      </button>
                                       </Tooltip>
                                  </CardActions>

                              </Card>

                     <Dialog
          open={this.state.viewopen[i]}
          onClose={this.handleviewClose}
           aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Order Detail</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please note that you can only change your time one day before check in!
            </DialogContentText>
               <div className={classes.detail}>
      <List>
        <ListItem>
          <Avatar>
              <Business />

          </Avatar>
          <ListItemText primary="Order ID" secondary={data[i]['his_id']} />
        </ListItem>
        <li>
          <Divider inset />
        </li>
        <ListItem>
          <Avatar>
            <Calender/>
          </Avatar>
          <ListItemText primary="Check In Time" secondary={new Date(parseInt(data[i]['check_in_time'].toString()+'000')).toLocaleDateString()} />
        </ListItem>
        <Divider inset component="li" />
        <ListItem>
          <Avatar>
            <Calender/>
          </Avatar>
          <ListItemText primary="Check Out Time" secondary={new Date(parseInt(data[i]['check_out_time'].toString()+'000')).toLocaleDateString()} />
        </ListItem>
          <Divider inset component="li" />
        <ListItem>
          <Avatar>
            <Email/>
          </Avatar>
          <ListItemText primary="Vcode" secondary={data[i]['vcode']} />
        </ListItem>
          <Divider inset component="li" />
          <ListItem>
          <Avatar>
            <Event_Note/>
          </Avatar>
          <ListItemText primary="Status" secondary={data[i]['status']} />
        </ListItem>
          <Divider inset component="li" />
        <ListItem>
          <Avatar>
              <Event_Note/>
          </Avatar>
          <ListItemText primary="Order Time" secondary={new Date(parseInt(data[i]['timestamp'].toString()+'000')).toLocaleDateString()} />
        </ListItem>
          <Divider inset component="li" />
        <ListItem>
          <Avatar>
          <Call/>
          </Avatar>
          <ListItemText primary="Contact Number" secondary={data[i]['contact']} />
        </ListItem>

      </List>

    </div>

          </DialogContent>
          <DialogActions>

              <Button onClick={this.handleviewClose} color="Secondary">
              Back
            </Button>
          </DialogActions>
        </Dialog>

                          </Grid>
            )
        }
        elements.push(<Dialog
          open={this.state.commentopen}
          onClose={this.handlecommentClose}
           aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Feedback</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Any Comments Will Make Us Better!
            </DialogContentText>
              <FormControl >

          <InputLabel shrink htmlFor="age-native-label-placeholder">
            Rating
          </InputLabel>
          <NativeSelect


            input={<Input name="rating" id="rating-albums" />}
          >

            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
               <option value={4}>4</option>
               <option value={5}>5</option>
               <option value={6}>6</option>
               <option value={7}>7</option>
               <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>

          </NativeSelect>

        </FormControl>
              <TextField
        className={styles.margin}
        id="comment-album"
        label="Comment"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Add_comment />
            </InputAdornment>
          ),
        }}
      />

          </DialogContent>
          <DialogActions>

            <Button onClick={this.submitcomment} color="primary">
              Submit
            </Button>

          </DialogActions>
        </Dialog>)
        elements.push(<Dialog
          open={this.state.open}
          onClose={this.handleClose}
           aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Order</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please note that you can only change your time one day before check in!
            </DialogContentText>
            <TextField
        id="check-in-album"
        label="Check-In"
        type="date"
        defaultValue="2018-10-15"

        InputLabelProps={{
          shrink: true,
        }}
      />
                <TextField
        id="check-out-album"
        label="Check-Out"
        type="date"
        defaultValue="2018-10-15"

        InputLabelProps={{
          shrink: true,
        }}
      />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancelClose} color="primary">
              Cancel Order
            </Button>
            <Button onClick={this.handleComfirmClose} color="primary">
              Comfirm
            </Button>
              <Button onClick={this.handleClose} color="Secondary">
              Back
            </Button>
          </DialogActions>
        </Dialog>)
        return(
      <React.Fragment>
          <CssBaseline/>
          <AppBar position="static" className={classes.appBar}>
              <Toolbar>

                  <Typography variant="h6" color="inherit" noWrap>
                      {'HI'}
                  </Typography>
              </Toolbar>
          </AppBar>
          <main>
              {/* Hero unit */}

              <div className={classNames(classes.layout, classes.cardGrid)}>
                  {/* End hero unit */}
                  <Grid container spacing={40}>
                      {elements}
                  </Grid>
              </div>
          </main>
          {/* Footer */}
          <footer className={classes.footer}>
              <Typography variant="h6" align="center" gutterBottom>
                  Footer
              </Typography>
              <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                  THANK YOU
              </Typography>
          </footer>
          {/* End footer */}
      </React.Fragment>
        )}
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Album);