import React from 'react';
import ReactDOM from 'react-dom';
import $ from  'jquery';
import jQuery  from 'jquery';
import WOW from 'wowjs';
import 'animate.css';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import mixitup from 'mixitup';
import './index.css';
import SignIn from './Signin'
import Album from './Album';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import FaceIcon from '@material-ui/icons/Face';
import Mood from '@material-ui/icons/Mood';
import Mood_bad from '@material-ui/icons/MoodBad';
import Thumb_up from '@material-ui/icons/ThumbUp';
import Thumb_down from '@material-ui/icons/ThumbDown';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import Search from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import Downshift from 'downshift'
import {Menu, ControllerButton, Item, ArrowIcon, css, getItems, getamenities} from './shared'
import registerServiceWorker from './registerServiceWorker';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';

class MultiDownshift extends React.Component {
  state = {selectedItems: []}

  stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          highlightedIndex: state.highlightedIndex,
          isOpen: true,
        }
      default:
        return changes
    }
  }

  handleSelection = (selectedItem, downshift) => {

    const callOnChange = () => {
      const {onSelect, onChange} = this.props
      const {selectedItems} = this.state
      if (onSelect) {
        onSelect(selectedItems, this.getStateAndHelpers(downshift))
      }
      if (onChange) {
        onChange(selectedItems, this.getStateAndHelpers(downshift))
      }
    }
    console.log('ccc')
    if (this.state.selectedItems.includes(selectedItem)) {
      this.removeItem(selectedItem, callOnChange)

    } else {
      this.addSelectedItem(selectedItem, callOnChange)
    }
  }

  removeItem = (item, cb) => {
    this.setState(({selectedItems}) => {
      return {
        selectedItems: selectedItems.filter(i => i !== item),
      }
    }, cb)
  }
  addSelectedItem(item, cb) {
    this.setState(
      ({selectedItems}) => ({
        selectedItems: [...selectedItems, item],
      }),
      cb,
    )
  }

  getRemoveButtonProps = ({onClick, item, ...props} = {}) => {
    return {
      onClick: e => {
        // TODO: use something like downshift's composeEventHandlers utility instead
        onClick && onClick(e)
        e.stopPropagation()
        this.removeItem(item)
      },
      ...props,
    }
  }

  getStateAndHelpers(downshift) {
    const {selectedItems} = this.state
    const {getRemoveButtonProps, removeItem} = this
    return {
      getRemoveButtonProps,
      removeItem,
      selectedItems,
      ...downshift,
    }
  }
  render() {
    const {render, children = render, ...props} = this.props
    // TODO: compose together props (rather than overwriting them) like downshift does
    return (
      <Downshift
        {...props}
        stateReducer={this.stateReducer}
        onChange={this.handleSelection}
        selectedItem={null}

      >
        {downshift => children(this.getStateAndHelpers(downshift))}
      </Downshift>
    )
  }
}
class Amenities extends React.Component {
    input = React.createRef()
  itemToString = item => (item ? item.name : '')
  handleChange = selectedItems => {
    console.log({selectedItems})
       this.props.transferMsg(selectedItems);

  }

  render() {
    return (
      <div
        {...css({
          display: 'flex',
          flexDirection: 'column',
          marginTop: 50,

        })}
      >

        <MultiDownshift
          onChange={this.handleChange}
          itemToString={this.itemToString}

        >
          {({
            getInputProps,
            getToggleButtonProps,
            getMenuProps,
            // note that the getRemoveButtonProps prop getter and the removeItem
            // action are coming from MultiDownshift composibility for the win!
            getRemoveButtonProps,
            removeItem,

            isOpen,
            inputValue,
            selectedItems,
            getItemProps,
            highlightedIndex,
            toggleMenu,
          }) => (
            <div style={{width: 'auto', margin: 'auto', position: 'relative'}}>
              <div
                {...css({
                  cursor: 'pointer',
                  position: 'relative',
                  borderRadius: '6px',
                  borderTopRadius: 6,
                  borderBottomRightRadius: isOpen ? 0 : 6,
                  borderBottomLeftRadius: isOpen ? 0 : 6,
                  padding: 10,
                  paddingRight: 50,
                  boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
                  borderColor: '#96c8da',
                  borderTopWidth: '1',
                  borderRightWidth: 1,
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderStyle: 'solid',
                })}
                onClick={() => {
                  toggleMenu()
                  !isOpen && this.input.current.focus()
                }}
              >
                <div
                  {...css({
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  })}
                >
                  {selectedItems.length > 0
                    ? selectedItems.map(item => (
                        <div
                          key={item.id}
                          {...css({
                            margin: 2,
                            paddingTop: 2,
                            paddingBottom: 2,
                            paddingLeft: 8,
                            paddingRight: 8,
                            display: 'inline-block',
                            wordWrap: 'none',
                            backgroundColor: '#ccc',
                            borderRadius: 2,
                          })}
                        >
                          <div
                            {...css({
                              display: 'grid',
                              gridGap: 6,
                              gridAutoFlow: 'column',
                              alignItems: 'center',
                            })}
                          >
                            <span>{item.name}</span>
                            <button
                              {...getRemoveButtonProps({item})}
                              {...css({
                                cursor: 'pointer',
                                lineHeight: 0.8,
                                border: 'none',
                                backgroundColor: 'transparent',
                                padding: '0',
                                fontSize: '16px',
                              })}
                            >
                              𝘅
                            </button>
                          </div>
                        </div>
                      ))
                    : 'Add Some Features'}
                  <input
                    {...getInputProps({
                      ref: this.input,
                      onKeyUp(event) {
                        if (event.key === 'Backspace' && !inputValue) {
                          removeItem(selectedItems[selectedItems.length - 1])
                        }
                      },
                      ...css({
                        border: 'none',
                        marginLeft: 6,
                        flex: 1,
                        fontSize: 14,
                        minHeight: 27,
                      }),
                    })}
                  />
                </div>
                <ControllerButton
                  {...getToggleButtonProps({
                    // prevents the menu from immediately toggling
                    // closed (due to our custom click handler above).
                    onClick(event) {
                      event.stopPropagation()
                    },
                  })}
                >
                  <ArrowIcon isOpen={isOpen} />
                </ControllerButton>
              </div>
              <Menu {...getMenuProps({isOpen})}>
                {isOpen
                  ? getamenities(inputValue).map((item, index) => (
                      <Item
                        key={item.id}
                        {...getItemProps({
                          item,
                          index,
                          isActive: highlightedIndex === index,
                          isSelected: selectedItems.includes(item),
                        })}
                      >
                        {item.name}
                      </Item>
                    ))
                  : null}
              </Menu>
            </div>
          )}
        </MultiDownshift>
      </div>
    )
  }
}

class App extends React.Component {
  input = React.createRef()
  itemToString = item => (item ? item.id : '')
  handleChange = selectedItems => {
    console.log({selectedItems})
       this.props.transferMsg(selectedItems);
  }

  render() {
    return (
      <div
        {...css({
          display: 'flex',
          flexDirection: 'column',
          marginTop: 50,

        })}
      >

        <MultiDownshift
          onChange={this.handleChange}
          itemToString={this.itemToString}


        >
          {({
            getInputProps,
            getToggleButtonProps,
            getMenuProps,
            // note that the getRemoveButtonProps prop getter and the removeItem
            // action are coming from MultiDownshift composibility for the win!
            getRemoveButtonProps,
            removeItem,

            isOpen,
            inputValue,
            selectedItems,
            getItemProps,
            highlightedIndex,
            toggleMenu,
          }) => (
            <div style={{width: 500, margin: 'auto', position: 'relative'}}>
              <div
                {...css({
                  cursor: 'pointer',
                  position: 'relative',
                  borderRadius: '6px',
                  borderTopRadius: 6,
                  borderBottomRightRadius: isOpen ? 0 : 6,
                  borderBottomLeftRadius: isOpen ? 0 : 6,
                  padding: 10,
                  paddingRight: 50,
                  boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
                  borderColor: '#96c8da',
                  borderTopWidth: '1',
                  borderRightWidth: 1,
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderStyle: 'solid',
                })}
                onClick={() => {
                  toggleMenu()
                  !isOpen && this.input.current.focus()
                }}
              >
                <div
                  {...css({
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  })}
                >
                  {selectedItems.length > 0
                    ? selectedItems.map(item => (
                        <div
                          key={item.id}
                          {...css({
                            margin: 2,
                            paddingTop: 2,
                            paddingBottom: 2,
                            paddingLeft: 8,
                            paddingRight: 8,
                            display: 'inline-block',
                            wordWrap: 'none',
                            backgroundColor: '#ccc',
                            borderRadius: 2,
                          })}
                        >
                          <div
                            {...css({
                              display: 'grid',
                              gridGap: 6,
                              gridAutoFlow: 'column',
                              alignItems: 'center',
                            })}
                          >
                            <span>{item.name}</span>
                            <button
                              {...getRemoveButtonProps({item})}
                              {...css({
                                cursor: 'pointer',
                                lineHeight: 0.8,
                                border: 'none',
                                backgroundColor: 'transparent',
                                padding: '0',
                                fontSize: '16px',
                              })}
                            >
                              𝘅
                            </button>
                          </div>
                        </div>
                      ))
                    : 'Select Locations'}
                  <input
                    {...getInputProps({
                      ref: this.input,
                      onKeyUp(event) {
                        if (event.key === 'Backspace' && !inputValue) {
                          removeItem(selectedItems[selectedItems.length - 1])
                        }
                      },
                      ...css({
                        border: 'none',
                        marginLeft: 6,
                        flex: 1,
                        fontSize: 14,
                        minHeight: 27,
                      }),
                    })}
                  />
                </div>
                <ControllerButton
                  {...getToggleButtonProps({
                    // prevents the menu from immediately toggling
                    // closed (due to our custom click handler above).
                    onClick(event) {
                      event.stopPropagation()
                    },
                  })}
                >
                  <ArrowIcon isOpen={isOpen} />
                </ControllerButton>
              </div>
              <Menu {...getMenuProps({isOpen})}>
                {isOpen
                  ? getItems(inputValue).map((item, index) => (
                      <Item
                        key={item.id}
                        {...getItemProps({
                          item,
                          index,
                          isActive: highlightedIndex === index,
                          isSelected: selectedItems.includes(item),
                        })}
                      >
                        {item.name}
                      </Item>
                    ))
                  : null}
              </Menu>
            </div>
          )}
        </MultiDownshift>
      </div>
    )
  }
}
class Pop extends React.Component{
    constructor(props) {
         super(props);
          this.state = {anchorEl: null,like:false,data:null,unlike:false};

    }
    like_btn = event =>{

        if(this.state.data == null){
        var data = this.props.comments;}
        else{
            var data = this.props.data;
        }

          var jsonstr =window.localStorage.getItem("jsonkey_user");
     if(jsonstr != null){
          var json = JSON.parse(jsonstr);
            var user_id = json['user_id'];
            var review_id = data['review_id'];
            var myHeaders = new Headers({
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          'AUTH_TOKEN' : document.cookie.split(";")[0].split("=")[1]
        });
        if(this.state.like == false){



        const url = 'http://127.0.0.1:5000/update_likes?user_id='+user_id+'&review_id='+review_id;

        fetch(url, {
            method: 'post',
            headers: myHeaders,
            mode: 'cors'

        }).then((res) => res.json()).then((respon) => {
            alert(respon)
            if(respon !='Update fail'){
            data['likes_num'] = parseInt(data['likes_num'])+1
            this.setState({like:!this.state.like});}
        })
        }
        else{


        const url = 'http://127.0.0.1:5000/delete_likes?user_id='+user_id+'&review_id='+review_id;

        fetch(url, {
            method: 'post',
            headers: myHeaders,
            mode: 'cors'

        }).then((res) => res.json()).then((respon) => {
            alert(respon)
            if(respon !='Update fail'){
            data['likes_num'] = parseInt(data['likes_num'])-1
            this.setState({like:!this.state.like});}
        })
        }

        }
        else{

         alert('Please Login')

        }
    }
    unlike_btn = event =>{
        if(this.state.data == null){
        var data = this.props.comments;}
        else{
            var data = this.props.data;
        }
        var jsonstr =window.localStorage.getItem("jsonkey_user");
     if(jsonstr != null){
          var json = JSON.parse(jsonstr);
            var user_id = json['user_id'];
            var review_id = data['review_id'];
            var myHeaders = new Headers({
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          'AUTH_TOKEN' : document.cookie.split(";")[0].split("=")[1]
        });
        if(this.state.unlike == false){



        const url = 'http://127.0.0.1:5000/update_unlikes?user_id='+user_id+'&review_id='+review_id;

        fetch(url, {
            method: 'post',
            headers: myHeaders,
            mode: 'cors'

        }).then((res) => res.json()).then((respon) => {
            alert(respon)
            if(respon !='Update fail'){
            data['unlikes_num'] = parseInt(data['unlikes_num'])+1
            this.setState({unlike:!this.state.unlike});}
        })
        }
        else{


        const url = 'http://127.0.0.1:5000/delete_unlikes?user_id='+user_id+'&review_id='+review_id;

        fetch(url, {
            method: 'post',
            headers: myHeaders,
            mode: 'cors'

        }).then((res) => res.json()).then((respon) => {
            alert(respon)
            if(respon !='Update fail'){
            data['unlikes_num'] = parseInt(data['unlikes_num'])-1
            this.setState({unlike:!this.state.unlike});}
        })
        }

        }
        else{

         alert('Please Login')

        }


    }
     handleClick = event => {

    this.setState({
      anchorEl: event.currentTarget,
    });
  };
   handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

    render(){
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        if(this.state.data == null){
        var data = this.props.comments;}
        else{
            var data = this.props.data;
        }
        console.log(data)
        return(
            <div>
                  <Badge badgeContent={parseInt(data['likes_num'])+parseInt(data['unlikes_num'])} color={data['rating']>5?'primary':'secondary'} ><Chip color={data['rating']>5?'primary':'secondary'} label={data['comment']} deleteIcon={<Mood />} aria-owns={open ? 'simple-popper' : null}
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleClick}  avatar={<Avatar>{data['rating']}</Avatar>} /></Badge>
                <Popover
    id="simple-popper"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}

  anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}><Grid  container
  direction="row"
  justify="center"
  alignItems="center">

    <Button variant="contained" color="primary"  disabled={this.state.unlike} onClick = {this.like_btn}><Thumb_up />{data['likes_num']}</Button>

    <Button variant="contained" color="secondary" disabled={this.state.like} onClick = {this.unlike_btn}><Thumb_down />{data['unlikes_num']}</Button>
        </Grid>
</Popover>
                </div>
        )
    }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
    margin: {
    margin: theme.spacing.unit,
  },
    textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

});
class List_Page extends  React.Component{
     constructor(props) {
         super(props);
          this.state = {page: 1,value:'list',amenities:[],rules:[]};
         this.next_page = this.next_page.bind(this);
         this.prev_page = this.prev_page.bind(this);
         this.sort_item = this.sort_item.bind(this);
         this.go_page = this.go_page.bind(this);
         this.first_page = this.first_page.bind(this);
         this.last_page = this.last_page.bind(this);
         this.adv_search = this.adv_search.bind(this);
     }
     single_property(data){
         let result = this.props.all_item['data'][data];
          return(ReactDOM.render((
    <Single_property lll={result}/>
), document.getElementById('ttt')) )


     }
     adv_search(){
         const url =  'http://127.0.0.1:5000/filter_search'
         var checkin = Math.round(Date.parse(new Date(document.getElementById('check-in-list').value))/1000);
        var checkout = Math.round(Date.parse(new Date(document.getElementById('check-out-list').value))/1000);
        var guest_number = document.getElementById('guest-num-list').value;
        var max = document.getElementById('max-list').value;
        var min = document.getElementById('min-list').value;
        var amenities = document.getElementById('amenities-list').value;
        let data = {};
        if(amenities != '') {
            amenities = amenities.split(',')

            let a_data = {}
            for (var item in amenities) {
                console.log(item)
                a_data[amenities[item]] = '1'
            }
            console.log(a_data)
            data['amenities'] = a_data
        }

        var rules = document.getElementById('rules-list').value;
        if(rules != '') {
            rules = rules.split(',')
            console.log(rules)
            let r_data = {}
            for (var ii in rules) {
                console.log(ii)
                r_data[rules[ii]] = '1'
            }
            console.log(r_data)
            data['rules'] = r_data
        }





      data['location'] = [document.getElementById('location-list').value]
        if(max != ''){
           data['upper_price'] = parseInt(max)
        }
        if(min != ''){
           data['lower_price'] = parseInt(min)
        }
        data['check_in_time'] = checkin
        data['check_out_time'] = checkout
        guest_number == ''?data['guest_num'] = guest_number:data['guest_num'] = parseInt(guest_number)
       console.log(data);
      fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
}).then(function(response) {


          response.json().then(function (data) {
               ReactDOM.render(<div>
                      <div id="site-banner" className="text-center clearfix">
                          <div className="container">
                              <h1 className="title wow slideInLeft">Properties Preview</h1>
                              <ol className="breadcrumb wow slideInRight">
                                  <li><a>Home</a></li>
                                  <li><a>Search Result</a></li>
                              </ol>
                          </div>
                      </div>
                      < List_Page all_item={data}/>

                  </div>,
                  document.getElementById('ttt'))

          })
    })
     }
     first_page(){
         this.setState({page:1})
     }
     last_page(){
          let a = this.props.all_item['number'];
         let b = 9;
         let max_page = (a%b==0)?a/b:Math.floor(a/b+1);
         console.log(max_page)
          this.setState({page:max_page})
     }
     go_page(){
          let a = this.props.all_item['number'];
         let b = 9;
         let max_page = (a%b==0)?a/b:Math.floor(a/b+1);
         let current = document.getElementById('page-value').value;
         console.log(current);
         if (current>=1 && current<= max_page){
             this.setState({page:current})
             console.log(this.state.page)
         }
         else{
             window.alert("not in range!")
         }

     }
     sort_item(){
         let status = document.getElementById('property-sort-dropdown').value;
         if(status ==='by_rank'){
             this.setState({value:'sort_rank'})
         }
         else if(status ==='by_price'){
             this.setState({value:'sort_price'})
         }
         else{
             this.setState({value:'sort_default'})
         }
     }
     prev_page(){
         if(this.state.page >1){
         this.setState({page:this.state.page -1})}
         return(

             console.log(this.state.page)
             )
     }

     next_page(){
         let a = this.props.all_item['number'];
         let b = 9;
         let max_page = (a%b==0)?a/b:Math.floor(a/b+1);
         if(this.state.page < max_page){
         this.setState({page:this.state.page +1})}
         return(

             console.log(this.state.page)
             )
     }
     transferMsg(msg) {
    this.setState({
      amenities: msg
    });
    console.log(msg)
  }
   add_amenities = event => {
    this.setState({ amenities: event.target.value });
  };
     add_rules = event => {
    this.setState({ rules: event.target.value });
  };
    render(){
        const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
    margin: {
    margin: theme.spacing.unit,
  },
    textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

});
const names = [
  "Internet Access",
        "TV",
        "Computer",
        "Work space",
        "Refrigerator",
        "Oven",
        "Coffeemaker",
        "Kitchen",
        "Hair dryer",
        "Iron",
        "Toiletries",
        "Towels",
        "Breakfast",
        "Washer",
        "Dryer",
        "Smoke detector",
        "First aid kit",
        "Vending",
        "restaurants",
        "Lift",
        "Parking space",
        "Swimming pool",
        "Gym"
];
const rules = [
  'Smoking',
  'Pets',
  'Parties',

];

        var data = this.props.all_item;
        console.log(data);
        var allElements = [] ;
        const pageElements = [];
         let a = this.props.all_item['number'];
         let b = 9;
         let max_page = (a%b==0)?a/b:Math.floor(a/b+1);
        
        for (var key in data['data']){
            var temp_data = data['data'][key];
            temp_data['id'] = key
            allElements.push(temp_data)
        }
        if(this.state.value === 'sort_price'){
        allElements.sort(function(first, second) {
 return first.price - second.price;
});}
else if(this.state.value === 'sort_rank'){
        allElements.sort(function(first, second) {
 return first.rank.total - second.rank.total;
        });}

        for (var i =(this.state.page-1) * 9;i<((this.state.page-1) * 9+9)&& i<data['number'];i++){
            pageElements.push(
                 <div className="col-lg-4 col-sm-6 layout-item-wrap">

                     <article className="property layout-item clearfix">
    <figure className="feature-image">
        <a className="clearfix zoom" ><img data-action="zoom" src={"assets/images/property/"+allElements[i]['id']+".png"} alt="Property Image"/></a>
        <span className="btn btn-warning btn-sale">{allElements[i]['rank']['total']}</span>
    </figure>
    <div className="property-contents clearfix">
        <header className="property-header clearfix">
            <div className="pull-left">
                <h6 className="entry-title"><a id= {allElements[i]['id']} onClick={(e) => this.single_property(e.target.id)}>{allElements[i]['title']}</a></h6>
                <span className="property-location"><i className="fa fa-map-marker"></i>{allElements[i]['address']}</span>
            </div>
            <button className="btn btn-default btn-price pull-right btn-3d" data-hover={'$'+allElements[i]['price']}><strong>{'$'+allElements[i]['price']}</strong></button>
        </header>
        <div className="property-meta clearfix">
            <span><i className="fa fa-car"></i> {allElements[i]['amenities']['Parking space']}</span>
            <span><i className="fa fa-bed"></i> {allElements[i]['rooms']['bed']}</span>
            <span><i className="fa fa-bathtub"></i> {allElements[i]['rooms']['bathroom']}</span>
            <span><i className="fa fa-wifi"></i> {allElements[i]['amenities']['Internet Access']=='1'?'YES':'NO'}</span>
        </div>
        <div className="contents clearfix">
            <p> {allElements[i]['description']}</p>
        </div>
        <div className="author-box clearfix">
            <a  className="author-img"><img src="assets/images/agents/1.jpg" alt="Agent Image"/></a>
            <cite className="author-name">Personal Seller: <a >Linda Garret</a></cite>
            <span className="phone"><i className="fa fa-phone"></i> {allElements[i]['contact']}</span>
        </div>
    </div>
</article>
</div>
            )
        }

        return(
            <section id="property-listing">
        <header className="section-header text-center">
            <div className={styles.root}>
        <FormControl >

          <InputLabel shrink >
            City
          </InputLabel>
          <NativeSelect


            input={<Input name="location" id="location-list" />}
          >
            <option value="">All Area</option>
            <option value={'Alexandria'}>Alexandria</option>
            <option value={'Sydney'}>Sydney</option>
            <option value={'Zetland'}>Zetland</option>
              <option value={'Kingsford'}>Kingsford</option>
            <option value={'Chatswood'}>Chatswood</option>
            <option value={'Pyrmont'}>Pyrmont</option>
              <option value={'Alexandria'}>Alexandria</option>
            <option value={'Sydney'}>Sydney</option>
            <option value={'Zetland'}>Zetland</option>
          </NativeSelect>
          <FormHelperText>Location</FormHelperText>
        </FormControl>
                <TextField
        id="check-in-list"
        label="Check-In"
        type="date"


        InputLabelProps={{
          shrink: true,
        }}
      />
                <TextField
        id="check-out-list"
        label="Check-Out"
        type="date"

        className={styles.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />

                <TextField
        className={styles.margin}
        id="guest-num-list"
        label="Guest-Num"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />

                <TextField
        className={styles.margin}
        id="min-list"
        label="Minimum Price"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MonetizationOn />
            </InputAdornment>
          ),
        }}
      />
                <TextField
        className={styles.margin}
        id="max-list"
        label="Maximum Price"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MonetizationOn />
            </InputAdornment>
          ),
        }}
      />
                <FormControl className={styles.formControl}>
          <InputLabel shrink htmlFor="select-multiple-checkbox">Rules</InputLabel>
          <Select
            multiple
            value={this.state.rules}
            onChange={this.add_rules}
            input={<Input id="rules-list" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={{
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
}}
          >
            {rules.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={this.state.rules.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
               <FormControl >
          <InputLabel shrink htmlFor="select-multiple-chip">Amenities</InputLabel>
          <Select
            multiple
            value={this.state.amenities}
            onChange={this.add_amenities}
            input={<Input id="amenities-list" />}
            renderValue={selected => (
              <div >
                {selected.map(value => (
                  <Chip key={value} label={value}  />
                ))}
              </div>
            )}
            MenuProps={{
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
}}
          >
            {names.map(name => (
              <MenuItem
                key={name}
                value={name}

              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
                <Button variant="contained" color="default" onClick={this.adv_search} >
        Search
        <Search  />
      </Button>
                     </div>
            <div className="container">
                <h2 className="pull-left">you are visiting top {this.state.page * 9} of {data['number']} property</h2>
                <div className="pull-right">
                    <div className="property-sorting pull-left">
                        <label htmlFor="property-sort-dropdown"> Sort by:   </label>
                        <select name="property-sort-dropdown" id="property-sort-dropdown" onChange={this.sort_item}>
                            <option value="">Default Order</option>
                            <option value="by_rank">By Rank</option>
                            <option value="by_price">By price</option>
                        </select>
                    </div>

                </div>
            </div>
        </header>
        <div className="container section-layout">
            <div className="row">


                {pageElements}
            </div>
            <ul id="pagination" className="text-center clearfix">
                <li className={this.state.page == 1? "disabled":""}><a onClick={this.prev_page}>Previous</a></li>
                <li><a onClick={this.first_page}>1</a></li>
                <li><input type = 'number' id= 'page-value' placeholder={"Current--"+ this.state.page} onBlur={this.go_page} max = {max_page} /></li>

                <li><a onClick={this.last_page}>{max_page}</a></li>
                <li className={this.state.page == max_page? "disabled":""}><a onClick={this.next_page}>Next</a></li>

            </ul>
        </div>
    </section>)}
}

withStyles(styles, { withTheme: true })(List_Page);

class Single_property extends  React.Component{
    constructor(props) {
         super(props);
         this.state = {amenities: '',recommond:''};
         this.handlesubmit = this.handlesubmit.bind(this);
         this.handlebooking = this.handlebooking.bind(this);


    }



    transferMsg(msg) {
    this.setState({
      amenities : msg
    });
    console.log(msg)
  }


  handlebooking(){
        var jsonstr =window.localStorage.getItem("jsonkey_user");
        var id = this.props.lll['id']
         var checkin = document.getElementById('checkin-book').value == ''? Math.round(Date.parse(new Date(document.getElementById('checkin-book').defaultValue))/1000): Math.round(Date.parse(new Date(document.getElementById('checkin-book').value))/1000);
        var checkout = document.getElementById('checkout-book').value == ''? Math.round(Date.parse(new Date(document.getElementById('checkout-book').defaultValue))/1000): Math.round(Date.parse(new Date(document.getElementById('checkout-book').value))/1000);
        console.log(checkin)
        if(jsonstr != null){
            var json = JSON.parse(jsonstr);
            var user_id = json['user_id'];
            var myHeaders = new Headers({
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          'AUTH_TOKEN' : document.cookie.split(";")[0].split("=")[1]
        });

        const url = 'http://127.0.0.1:5000/booking?check_in_time='+checkin+'&check_out_time='+checkout+'&acco_id='+id+'&user_id='+user_id;

        fetch(url, {
            method: 'post',
            headers: myHeaders,
            mode: 'cors'

        }).then((res) => res.json()).then((data) => {
            alert(data)
        })
        }
        else{
        var name = document.getElementById('name-book').value;
        var email = document.getElementById('email-book').value;
        var phone = document.getElementById('phone-book').value;
        var message = document.getElementById('message-book').value;

        const url =  'http://127.0.0.1:5000/booking_without_login?email='+ email+'&check_in_time='+checkin+'&check_out_time='+checkout+'&username='+name+'&phone='+phone+'&id='+id+'&message='+message
        fetch(url, {
         method: 'POST',
     mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    }
}).then((res) => res.json()).then((data) => {
            alert(data['msg'])
        })

      ReactDOM.render(
          (<div>Your Order Is Processing,Please Check Your E-Mail</div>),document.getElementById('error-book')
      )
  }
    }
   last_property(data){
        console.log(data)
         var jsonstr =window.localStorage.getItem("jsonkey_9900");
        var json = JSON.parse(jsonstr);
        var found = json.find(function(element) {
    return element['id'] == data;
    });
        console.log(found);
        console.log(data);
        var single_data = found;
        return(ReactDOM.render((
        <Single_property lll={single_data}/>
        ), document.getElementById('ttt')) )

   }
    handlesubmit(){
        var checkin = Math.round(Date.parse(new Date(document.getElementById('check-in-filter').value))/1000);
        var checkout = Math.round(Date.parse(new Date(document.getElementById('check-out-filter').value))/1000);
        var guest_number = document.getElementById('guest-number-filter').value;

        let amenities = this.state.amenities;
        let a_data = {}
        for(var item in amenities){
            console.log(item)
            a_data[amenities[item]['name']] = '1'
        }
        console.log(a_data)

        var Smoking = document.getElementById('Smoking-filter').value;
        var Pets = document.getElementById('Pets-filter').value;
        var Parties = document.getElementById('Parties-filter').value;
        var min = document.getElementById('min-price-filter').value;
        var max = document.getElementById('max-price-filter').value;
        const url =  'http://127.0.0.1:5000/filter_search'
      console.log(url);
      let data = {};
      data['amenities'] = a_data

      data['rules'] = {'Smoking':Smoking,'Pets':Pets,'Parties':Parties}
      for(var key in data['rules']){

          if (data['rules'][key] == ''){
              delete data.rules[key]

          }
      }
      data['location'] = [document.getElementById('main-location-filter').value]
        if(max != ''){
           data['upper_price'] = parseInt(max)
        }
        if(min != ''){
           data['lower_price'] = parseInt(min)
        }
        data['check_in_time'] = checkin
        data['check_out_time'] = checkout
        guest_number == ''?data['guest_num'] = guest_number:data['guest_num'] = parseInt(guest_number)
       console.log(data);
      fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
}).then(function(response) {


          response.json().then(function (data) {
               ReactDOM.render(<div>
                      <div id="site-banner" className="text-center clearfix">
                          <div className="container">
                              <h1 className="title wow slideInLeft">Properties Preview</h1>
                              <ol className="breadcrumb wow slideInRight">
                                  <li><a>Home</a></li>
                                  <li><a>Search Result</a></li>
                              </ol>
                          </div>
                      </div>
                      < List_Page all_item={data}/>

                  </div>,
                  document.getElementById('ttt'))

          })
    })

    }
    render(){


        var data = this.props.lll;
        console.log(data);
        var jsonstr =window.localStorage.getItem("jsonkey_9900");
        var json = JSON.parse(jsonstr);
        var jsonstr_ =window.localStorage.getItem("historykey_9900");
        var json_ = JSON.parse(jsonstr_);
        const last_click = []
        const Comments = []
        const recommend =[]

        for(var key in data['review']) {
            data['review'][key]['review_id'] = key
            Comments.push(
                <Pop comments={data['review'][key]}/>
            )

        }
        if(json_ == null){
            var hisdata = []

            hisdata.push(data['id']);
             var hisdata =JSON.stringify({history:hisdata});
            window.localStorage.setItem("historykey_9900",hisdata);
        }
        else{
            json_['history'].push(data['id'])
            var json_h =JSON.stringify(json_);
            window.localStorage.setItem("historykey_9900",json_h);
            var user_info =window.localStorage.getItem("jsonkey_user");
             if(user_info != null){
        var user_info = JSON.parse(user_info);
        var user_id = user_info['user_id']
            const url = 'http://127.0.0.1:5000/recommend?user_id='+user_id

         fetch(url, {
             method: 'POST',
             mode: 'cors',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(json_)
         }).then((res) => res.json()).then((response) => {
             window.localStorage.setItem("recommend_9900",JSON.stringify(response));
            console.log(response)


         })

            }

        }

        if(json == null){


            var newdata = []

            newdata.push(data);
             var newdata =JSON.stringify(newdata);
            window.localStorage.setItem("jsonkey_9900",newdata);
        }
        else{


            console.log(json);
            console.log(data);
            if(json.length >=5){
                json = json.slice(1);
            }



            for(var i = json.length -1;i>=0;i--){

                last_click.push(
                    <div className="property clearfix">
            <a  className="feature-image zoom"><img data-action="zoom" src={"assets/images/property/"+json[i]['id']+".png"} alt="Property Image"/></a>
            <div className="property-contents">
                <h6 className="entry-title"><a id= {json[i]['id']} onClick={(e) => this.last_property(e.target.id)}>{json[i]['title']}</a></h6>
                <span className="btn-price">${json[i]['price']}</span>
                <div className="property-meta clearfix">
                     <span><i className="fa fa-car"></i>  {json[i]['amenities']['Parking space']}</span>
            <span><i className="fa fa-bed"></i> {json[i]['rooms']['bed']}</span>
            <span><i className="fa fa-bathtub"></i> {json[i]['rooms']['bathroom']}</span>
            <span><i className="fa fa-wifi"></i> {json[i]['amenities']['Internet Access']=='1'?'YES':'NO'}</span>
                </div>
            </div>
        </div>
                )
            }
             var found = json.find(function(element) {
            return element['id'] == data['id'];
            });
            var index = json.indexOf(found)
            if(index == -1){

            json.push(data)
            var json =JSON.stringify(json);
            window.localStorage.setItem("jsonkey_9900",json);
            }
            else{
                json.splice(index,1);
                 json.push(data)
                var json =JSON.stringify(json);
                window.localStorage.setItem("jsonkey_9900",json);
            }
        }
        const amenities_list = []
            for(var i in data['amenities']){
                amenities_list.push(<li className={data['amenities'][i]=='0'?"disabled":""}>{i}</li>)
            }
           var recommend_his =window.localStorage.getItem("recommend_9900");

        if(recommend_his != null ){
            var recom = JSON.parse(recommend_his);
            for(var i in recom['data']){

                recommend.push(
                    <div className="property clearfix">
            <a  className="feature-image zoom"><img data-action="zoom" src={"assets/images/property/"+i+".png"} alt="Property Image"/></a>
            <div className="property-contents">
                <h6 className="entry-title"><a >{recom['data'][i]['title']}</a></h6>
                <span className="btn-price">${recom['data'][i]['price']}</span>
                <div className="property-meta clearfix">
                     <span><i className="fa fa-car"></i>  {recom['data'][i]['amenities']['Parking space']}</span>
            <span><i className="fa fa-bed"></i> {recom['data'][i]['rooms']['bed']}</span>
            <span><i className="fa fa-bathtub"></i> {recom['data'][i]['rooms']['bathroom']}</span>
            <span><i className="fa fa-wifi"></i> {recom['data'][i]['amenities']['Internet Access']=='1'?'YES':'NO'}</span>
                </div>
            </div>
        </div>
                )

            }
        }
        return(

        <div id="property-single">
        <div id="site-banner" className="text-center clearfix">
   <div className="container">
       <h1 className="title wow slideInLeft">SingleProperty</h1>
       <ol className="breadcrumb wow slideInRight">
           <li><a>Home</a></li>
            <li><a>SingleProperty</a></li>
       </ol>
   </div>
</div>

        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-7">
                    <section className="property-meta-wrapper common">
                        <h3 className="entry-title">{data['title']}</h3>
                        <div className="property-single-meta">
                            <ul className="clearfix">

                                <li><span>Property ID :</span> {data['id']}</li>
                                <li><span>Bedrooms :</span> {data['rooms']['bedroom']}</li>
                                <li><span>Bathrooms :</span> {data['rooms']['bathroom']}</li>
                                <li><span>Security Deposit :</span> {data['rules']['Security Deposit']} </li>
                                <li><span>Check-In:</span> {data['rules']['Check-in']}</li>
                                 <li><span>Check-Out:</span> {data['rules']['Check-out']}</li>
                                <li><span>Price :</span> ${data['price']}</li>
                                <li><span>Address :</span> {data['address']}</li>
                            </ul>
                        </div>
                    </section>
                    <section className="property-contents common">
                        <div className="entry-title clearfix">
                            <h4 className="pull-left">Description </h4><a className="pull-right print-btn" href="javascript:window.print()">Print This Property <i className="fa fa-print"></i></a>
                        </div>
                        <p> {data['description']}</p>
                    </section>
                    <section className="property-single-features common clearfix">
                        <h4 className="entry-title">Property Features</h4>
                        <ul className="property-single-features-list clearfix">
                            {amenities_list}

                        </ul>
                    </section>
                    <section className="property-video common">
                        <h4 className="entry-title">COMMENTS</h4>
                        {Comments}



                    </section>

                    <section className="property-agent common">
                        <h4 className="entry-title">Booking</h4>
                        <div className="row">
                            <div className="col-lg-7">
                             <div>
                        <label for="property-sub-location">Check-In:{data['checkin']}</label>

                    </div>
                                 <div>
                               <input type="date" defaultValue = {data['checkin']== null? (new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+(new Date().getDate()>10?new Date().getDate():'0'+new Date().getDate().toString())):data['checkin']} id='checkin-book'/>
                                     </div>
                                 <div>
                                 <label for="property-sub-location">Check-Out:{data['checkout']}</label>



                    </div>
                                 <div>
                               <input type="date"   defaultValue = {data['checkout']== null?(new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+(new Date().getDate()>10?new Date().getDate()+1:'0'+(new Date().getDate()+1).toString())):data['checkout']} id='checkout-book'/>
                                     </div>
                                 <div>
                                 <label for="property-sub-location">Special Request</label>
                                 </div>
                                <div>
                                <textarea name="message" cols="30" rows="5" className="required" placeholder="Message" id='message-book'></textarea>
                                    </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="agent-contact-form">
                                    <form id="agent-form" className="agent-form" >
                                        <Tooltip title='Wanna Skip Fill Information Time and have a premium service? Log In!!'>
                                        <input type="text" name="name" placeholder="Full Name" className="required" id='name-book'/>
                                        </Tooltip>
                                        <Tooltip title='Wanna Skip Fill Information Time and have a premium service? Log In!!'>
                                        <input type="text" name="phone" placeholder="Phone Number" className="required" id='phone-book'/>
                                        </Tooltip>
                                            <Tooltip title='Wanna Skip Fill Information Time and have a premium service? Log In!!'>
                                        <input type="text" name="email" placeholder="Email" className="email required" id='email-book'/>
                                            </Tooltip>

                                        <div className="error-container" id='error-book'></div>
                                        <div className="message-container" ></div>
                                    </form>
                                    <button className="btn btn-default btn-lg btn-3d" type="submit" data-hover="SUBMIT REQUEST" onClick={this.handlebooking}>BOOKING</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="col-lg-4 col-md-5">
                    <div id="property-sidebar">
    <section className="widget adv-search-widget clearfix">
        <h5 className="title hide">Search your Place</h5>
        <div id="advance-search-widget" className="clearfix">
    <fieldset  id="adv-search-form">
        <div id="widget-tabs">
            <ul className="tab-list clearfix">

                <li><a className="btn">Rent</a></li>

            </ul>
            <div id="tab-1" className="tab-content current">
                <fieldset className="clearfix">
                    <div>

                        <label for="main-location">All Location</label>

                        <select name="location" id="main-location-filter">
                            <option value="">All Cities</option>
                            <option value="Alexandria"> Alexandria</option>
                            <option value="Coogee"> Coogee</option>
                            <option value="los-angeles"> Los Angeles</option>
                            <option value="miami"> Miami</option>
                            <option value="new-york"> New York</option>
                        </select>
                    </div>
                    <div>
                        <label for="property-sub-location">Check-In & Check-Out</label>
                         <input type="date"  id="check-in-filter"   placeholder="Check-In"/>

                <input type="date"  id="check-out-filter"placeholder="Check-Out"/>
                    </div>
                    <div>
                        <label for="property-status">Guest Number</label>
                        <input type="number" id="guest-number-filter"
           placeholder="Guest Number"
           min="1" max="10" />
                    </div>



                    <div>
                         <label for="property-beds">Smoking</label>
                       <select id="Smoking-filter" name="type" >
                            <option value=""></option>
                            <option value="1"> YES</option>
                            <option value="0"> NO</option>

                        </select>
                    </div>
                    <div>
                         <label for="property-beds">Parties</label>
                       <select id="Parties-filter" name="type" >
                            <option value=""></option>
                            <option value="1"> YES</option>
                            <option value="0"> NO</option>

                        </select>
                    </div>
                    <div>
                         <label for="property-beds">Pets</label>
                       <select id="Pets-filter" name="type" >
                            <option value=""></option>
                            <option value="1"> YES</option>
                            <option value="0"> NO</option>

                        </select>
                    </div>

                    <div>
                        <label for="property-min-price">Min Prices</label>
                         <input type="number" id="min-price-filter"
           placeholder="Min Prices"
           min="1" max="10000" />
                    </div>
                    <div>
                        <label for="property-max-price">Max Prices</label>
                         <input type="number" id="max-price-filter"
           placeholder="Max Prices"
           min="1" max="10000" />
                    </div>
                </fieldset>
                <Amenities transferMsg = {msg => this.transferMsg(msg)}/>
            </div>


        </div>
    </fieldset>
              <button type="submit" className="btn btn-default btn-lg text-center btn-3d" data-hover="Search Property" onClick={this.handlesubmit} >Search Property</button>
</div>    </section>
                        <div id = 'filter-search-result'></div>
<section className="widget recent-properties clearfix">
        <h5 className="title">Recent Properties</h5>
    {recommend}
    </section>
                        <section className="widget recent-properties clearfix">
        <h5 className="title">LAST VIEW</h5>
                            {last_click}
    </section>
</div>                </div>
            </div>
        </div>
    </div>
        )
    }
}






class First_Layout extends  React.Component{
    constructor(props) {
        super(props);


      this.state = {value: 'Login&Register',address: '',order:''};
      this.signin_render = this.signin_render.bind(this);
      this.home_render = this.home_render.bind(this);
      this.list_render = this.list_render.bind(this);

       this.manage_render = this.manage_render.bind(this);
        // this.rendersingle = this.rendersingle.bind(this);
       this.handleChange = this.handleChange.bind(this);
       this.searchorder = this.searchorder.bind(this);
       this.cancel_order = this.cancel_order.bind(this);
       this.add_comment = this.add_comment.bind(this);

    }
    add_comment(){
        var email = document.getElementById('order-email').innerText.replace("E-mail : ",'');
        var acco = document.getElementById('order-id').innerText.replace("Property ID : ",'');
        var comment = document.getElementById('message-order').value;
        var rating = document.getElementById('rating-order').value;
        const url = 'http://127.0.0.1:5000/update_review_without_login?email='+email+'&acco_id='+acco+'&comment='+comment+'&rating='+rating;


        fetch(url, {
            method: 'GET',

    headers: {
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
    }

        }).then(function(response) { response.json().then(function (data) {
            alert(data);


      })})
    }
    cancel_order(){


    const order_detail = this.state.order;
    var email = order_detail['email']
         var order_num = order_detail['order_num']
          var vcode = order_detail['vcode']
        const url = 'http://127.0.0.1:5000/cancel_order?email='+email+'&order_num='+order_num+'&vcode='+vcode;
      fetch(url, {
            method: 'POST',
     mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    }

        }).then(function(response) { response.json().then(function (data) {
            console.log(data)
          alert(data['message'])
      })})
    }
searchorder(){
        var email = document.getElementById('search-order-email').value;
         var order_num = document.getElementById('search-order-number').value;
          var vcode = document.getElementById('search-order-vcode').value;
const url = 'http://127.0.0.1:5000/history?email='+email+'&order_num='+order_num+'&vcode='+vcode;
var myHeaders = new Headers({
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",

        });
      fetch(url, {
            method: 'get',
            headers: myHeaders

        }).then((res) => res.json()).then((data) => {
              console.log(data)
                alert(data['message'])
              ReactDOM.render(
                  <ul>
                   <li >{data['message']}</li>
                  </ul>,document.getElementById('message-container')
              )
              if(data['history'] != null){
                  this.setState({order:{'email':email,'vcode':vcode,'order_num':order_num}})
                  console.log(this.state.order)
              ReactDOM.render(

                  <section className="property-meta-wrapper common">
                        <h3 className="entry-title">dd</h3>
                        <div className="property-single-meta">
                            <ul className="clearfix">
                                <li><span>Order ID:</span> {order_num}</li>
                                <li id = 'order-id'><span>Property ID :</span> {data['history']['acco_id']}</li>
                                <li ><span>Username :</span> {data['history']['name']}</li>
                                <li id = 'order-email'><span>E-mail :</span> {data['history']['email']}</li>
                                <li ><span>Status :</span> {data['history']['status']}</li>
                                <li><span>Check-In:</span> {new Date(parseInt(data['history']['check_in_time'].toString()+'000')).toLocaleDateString()}</li>
                                 <li><span>Check-Out:</span> {new Date(parseInt(data['history']['check_out_time'].toString()+'000')).toLocaleDateString()}</li>

                                <li><span>Timestamp :</span>{new Date(parseInt(data['history']['timestamp'].toString()+'000')).toLocaleDateString()}</li>
                                 <li><span>Message:</span> {data['history']['Message']}</li>
                            </ul>
                        </div>
                     <button className="btn btn-default btn-lg btn-3d" type="submit" data-hover="Cancel Order" onClick={this.cancel_order}>Cancel Order</button>

                                <div>
                                <textarea name="message" cols="30" rows="5" className="required" placeholder="Message" id='message-order'></textarea>
                                     </div>
                                    <div>
                                        <label for="property-sub-location">Rating</label>
                                    <select name="location" id="rating-order">

                                        <option value="1">1</option>
                                        <option value='2'>2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                        </select>
                                     </div>
                                    <div>
                                    <button id = 'comment-order-btn' className="btn btn-default btn-lg btn-3d" type="submit" data-hover="Add Some Comments" onClick={this.add_comment}>Add Some Comments</button>
                                    </div>
                 </section>,document.getElementById('order-result')
              )}
          })

}
transferMsg(msg) {
    this.setState({
      amenities : msg
    });
    console.log(msg)
  }
  rendersingle(data,e){

        console.log(data);
        return(console.log(data))
    }
    componentDidMount() {

        window.addEventListener('load',this.home_render)
         window.addEventListener('load',this.check_login)


    }
    check_login = () => {
         var myHeaders = new Headers({
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          'AUTH_TOKEN' : document.cookie.split(";")[0].split("=")[1]
        });

        const url = 'http://127.0.0.1:5000/check_login';
        console.log(document.cookie.split(";")[0].split("=")[1]);
        fetch(url, {
            method: 'get',
            headers: myHeaders

        }).then((res) => res.json()).then((data) => {



              console.log(data);
              if(data == 'Already Login'){
                  this.setState({value:'LogOut'})
              }
              else{
                   window.localStorage.removeItem("jsonkey_user");
                     document.cookie="token=";
                 this.setState({value:'Login&Register'})
              }

           })
      .catch(function(e) {
          console.log("Oops, error");
    });
    }
    transfertoken(msg){
        document.cookie="token="+msg['token'];
        this.setState({value:'LogOut'})
        window.localStorage.setItem("jsonkey_user",JSON.stringify(msg['message']));
        setTimeout(this.manage_render,1000);
    }



    transferMsg(msg) {
    this.setState({
      address: msg
    });
    console.log(msg)
  }
    manage_render(){

            if(this.state.value == 'Login&Register'){

            ReactDOM.render(
                 <div id="property-single">
        <div id="site-banner" className="text-center clearfix">
   <div className="container">
       <h1 className="title wow slideInLeft">Manage Orders</h1>
       <ol className="breadcrumb wow slideInRight">
           <li><a>Home</a></li>
            <li><a>Manage Order</a></li>
       </ol>
   </div>
</div>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-7">

                <section className="property-agent common">
                        <h4 className="entry-title">Order Detail</h4>
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="agent-box clearfix">


                                </div>
                                <div className="widget address-widget clearfix">
                                    <ul>
                                        <li><i class="fa fa-user-circle"></i> Please write down your Order Detail to Cancel Or Edit your Order</li>

                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-5">
                                <div className="agent-contact-form">
                                    <div id="agent-form" className="agent-form" method="post" action="#">
                                        <input id="search-order-number" type="text" name="order" placeholder="Order Number" className="email required" />


                                        <input id="search-order-email"type="text" name="email" placeholder="Email" className="email required"/>
                                    <input id="search-order-vcode" type="text" name="code" placeholder="Security Code" className="required" />
                                        <button className="btn btn-default btn-lg btn-3d" type="submit" data-hover="Search Order" onClick={this.searchorder}>Search Order</button>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                     <section className="property-agent common">
                         <h4 className="entry-title">Search Result</h4>
                        <div className="row">
                    <div  className="col-lg-7">
                        <div id = 'message-container' className="widget address-widget clearfix">

                        </div>
                    </div>
                        </div>
                     </section>
                    <div id ='order-result'></div>


                </div>
                <div className="col-lg-4 col-md-5">
                    <div id="property-sidebar">
    <section className="widget adv-search-widget clearfix">
        <h5 className="title hide">Search your Place</h5>
        <div id="advance-search-widget" className="clearfix">
    <fieldset  id="adv-search-form">
        <div id="widget-tabs">
            <ul className="tab-list clearfix">

                <li><a className="btn">Search Your Favorite Property</a></li>

            </ul>
            <div id="tab-1" className="tab-content current">
                <fieldset className="clearfix">
                    <div>

                        <label for="main-location">All Location</label>

                        <select name="location" id="main-location-filter">
                            <option value="">All Cities</option>
                            <option value="Alexandra"> Alexandra</option>
                            <option value="los-angeles"> Los Angeles</option>
                            <option value="miami"> Miami</option>
                            <option value="new-york"> New York</option>
                        </select>
                    </div>
                    <div>
                        <label for="property-sub-location">Check-In & Check-Out</label>
                         <input type="date"  id="check-in-filter"   placeholder="Check-In"/>

                <input type="date"  id="check-out-filter"placeholder="Check-Out"/>
                    </div>
                    <div>
                        <label for="property-status">Guest Number</label>
                        <input type="number" id="guest-number-filter"
           placeholder="Guest Number"
           min="1" max="10" />
                    </div>



                    <div>
                         <label for="property-beds">Smoking</label>
                       <select id="Smoking-filter" name="type" >
                            <option value=""></option>
                            <option value="1"> YES</option>
                            <option value="0"> NO</option>

                        </select>
                    </div>
                    <div>
                         <label for="property-beds">Parties</label>
                       <select id="Parties-filter" name="type" >
                            <option value=""></option>
                            <option value="1"> YES</option>
                            <option value="0"> NO</option>

                        </select>
                    </div>
                    <div>
                         <label for="property-beds">Pets</label>
                       <select id="Pets-filter" name="type" >
                            <option value=""></option>
                            <option value="1"> YES</option>
                            <option value="0"> NO</option>

                        </select>
                    </div>

                    <div>
                        <label for="property-min-price">Min Prices</label>
                         <input type="number" id="min-price-filter"
           placeholder="Min Prices"
           min="1" max="10000" />
                    </div>
                    <div>
                        <label for="property-max-price">Max Prices</label>
                         <input type="number" id="max-price-filter"
           placeholder="Max Prices"
           min="1" max="10000" />
                    </div>
                </fieldset>
                <Amenities transferMsg = {msg => this.transferMsg(msg)}/>
            </div>


        </div>
    </fieldset>
              <button type="submit" className="btn btn-default btn-lg text-center btn-3d" data-hover="Search Property" onClick={this.handlesubmit} >Search Property</button>
</div>    </section>
                        <div id = 'filter-search-result'></div>

</div>                </div>
            </div>
        </div>
    </div>,document.getElementById('ttt'))
            }
            else{
           var jsonstr =window.localStorage.getItem("jsonkey_user");
             var json = JSON.parse(jsonstr);
             if (json != null){
                var user_id = json['user_id']
                  var myHeaders = new Headers({
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          'AUTH_TOKEN' : document.cookie.split(";")[0].split("=")[1]
        });

        const url = 'http://127.0.0.1:5000/search_order?user_id='+user_id;
        console.log(document.cookie.split(";")[0].split("=")[1]);
        fetch(url, {
            method: 'get',
            headers: myHeaders

        }).then((res) => res.json()).then((data) => {


            ReactDOM.render(
                                 <div id="property-single">
            <div id="site-banner" className="text-center clearfix">
               <div className="container">
                   <h1 className="title wow slideInLeft">Manage Orders</h1>
                   <ol className="breadcrumb wow slideInRight">
                       <li><a>Home</a></li>
                        <li><a>Manage Order</a></li>
                   </ol>
               </div>
            </div>
                    <Album all_item={data}/>
                </div>,document.getElementById('ttt'))


           })
      .catch(function(e) {
          alert("Error");
    });

                 }
        }

    }
    signin_render(){
        if(this.state.value == 'Login&Register'){
         ReactDOM.render(
         < SignIn transfertoken = {msg => this.transfertoken(msg)} />
             ,document.getElementById('ttt'))}
             else{
            window.localStorage.removeItem("jsonkey_user");
            document.cookie="token=";
            this.setState({value:'Login&Register'})
        }
    }
    home_render(){



        return(ReactDOM.render(
            <div>
    <div id="site-banner" className="text-center clearfix">
   <div className="container">
       <h1 className="title wow slideInLeft">Properties Grid</h1>
       <ol className="breadcrumb wow slideInRight">
           <li><a>Home</a></li>

       </ol>
   </div>
</div>
            <div id="advance-search" className="main-page clearfix">
                 <div className="container">

        < div id="adv-search-form" className="clearfix">
< App  transferMsg = {msg => this.transferMsg(msg)}/>
            <fieldset  style={{  width:'100%',marginLeft:'10%',marginRight:'auto'}}>

            <input type="date"  id="check-in"   placeholder="Check-In"/>

                <input type="date"  id="check-out"placeholder="Check-Out"/>

    <input type="number" id="guest-number"
           placeholder="Guest Number"
           min="1" max="10" />

        <button  onClick={this.handleChange} className="btn btn-default btn-lg text-center"><style>{"\
                .{\
                  text-align:center;\
                }\
              "}</style>Search <br className="hidden-sm hidden-xs"/> Property</button>

            </fieldset>

        </div>

        </div>
            </div>
<div id = "search_result"></div>
<footer id="footer">
<div class="site-footer">
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-sm-6">
                <section class="widget about-widget clearfix">
                    <h4 class="title hide">About Us</h4>
                    <a class="footer-logo" ><img src="assets/images/footer-logo.png" alt="Footer Logo"/></a>
                    <p>666666</p>

                </section>
            </div>
            <div class="col-md-4 col-sm-6">

            </div>
            <div class="col-md-4 col-sm-6">
                <section class="widget address-widget clearfix">
                    <h4 class="title">OUR OFFICE</h4>
                    <ul>
                        <li><i class="fa fa-map-marker"></i> UNSW, NSW, Sydney.</li>
                        <li><i class="fa fa-phone"></i> (123) 45678910</li>
                        <li><i class="fa fa-envelope"></i> gobookingya@gmail.com</li>
                        <li><i class="fa fa-fax"></i> +84 962 216 601</li>
                        <li><i class="fa fa-clock-o"></i> Mon - Sat: 9:00 - 18:00</li>
                    </ul>
                </section>
            </div>
        </div>
    </div>
</div>
    <div class="site-footer-bottom">

    </div>
</footer>
</div>,
    document.getElementById('ttt')))

    }
    list_render(){

        var myHeaders = new Headers({
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",

        });

      const url = 'http://127.0.0.1:5000/search_all';

      fetch(url, {
            method: 'get',
            headers: myHeaders

        }).then(function(response) {


          response.json().then(function (data) {

              ReactDOM.render(<div>
                      <div id="site-banner" className="text-center clearfix">
                          <div className="container">
                              <h1 className="title wow slideInLeft">Properties Preview</h1>
                              <ol className="breadcrumb wow slideInRight">
                                  <li><a>Home</a></li>
                                  <li><a>LISTING</a></li>
                              </ol>
                          </div>
                      </div>
                      < List_Page all_item={data}/>

                  </div>,
                  document.getElementById('ttt'))

          });
      });




        return( setTimeout(function() {$(function () {
    'use strict';
    console.log('theme!')

    /*****************************************************
     * Loader
     *****************************************************/
    $(".loaders > img:gt(0)").hide();

    setInterval(function() {
        $('.loaders> img:first')
            .fadeOut(1000)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('.loaders');
    },  2000);
    $(window).on("load", function () {
        $("#page-loader").css('display', 'none');
    });

    /*****************************************************
     * General Targets
     *****************************************************/
    function sliderContents() {
        var targetContainer = $('#slider-contents .jumbotron'),
            mainSliderContentsHeight = $(targetContainer).outerHeight();
        console.log(mainSliderContentsHeight);
        $(targetContainer).css('margin-top', -( mainSliderContentsHeight/2 ));
        console.log(mainSliderContentsHeight);
    }
    sliderContents();
    $( window ).on("load", function() {
        sliderContents();
    });

    $( window ).on("resize", function() {
        sliderContents();
    });

    $(".property-map-wrapper #advance-search .top-btn").on('click', function () {
        $(".property-map-wrapper #advance-search .top-btn").toggleClass('active');
        $(".property-map-wrapper #advance-search .top-btn i").toggleClass('fa-caret-up');
        $("#adv-search-form").stop(true, true).slideToggle();
    });

    $('time.updated').each(function(){
        var me = $(this);
        me.html(me.html().replace(/^(\w+)/, '<strong>$1</strong>'));
    });

    /*****************************************************
     * Main Menu
     *****************************************************/
    $("#site-nav li").on('mouseenter mouseleave', function () {
        $(this).children("ul").stop(true, true).slideToggle(300);
    });



    /*****************************************************
     * Image Zoom
     * https://github.com/fat/zoom.js/
     ************************"*****************************/
    $("a.zoom").on("click", function (e) {
        e.preventDefault();
    });



    /*****************************************************
     * Slick Slider
     * http://kenwheeler.github.io/slick/
     *****************************************************/
    if( jQuery().slick ) {
        $('#main-slider').slick({
            dots: false,
            infinite: true,
            fade: true,
            speed: 1000,
            autoplaySpeed: 3000,
            lazyLoad: 'progressive',
            cssEase: 'linear',
            adaptiveHeight:true,
            autoplay: true,
            prevArrow: '<i className="fa fa-angle-right"></i>',
            nextArrow: '<i className="fa fa-angle-left"></i>',
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });

        $('#property-for-rent-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 1000,
            autoplaySpeed: 2000,
            prevArrow: '<i className="fa fa-angle-left"></i>',
            nextArrow: '<i className="fa fa-angle-right"></i>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        arrows: false,
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        arrows: false,
                        slidesToShow: 1
                    }
                }
            ]
        });
    }



    /*****************************************************
     * Scroll Top
     *****************************************************/
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#scroll-top').fadeIn();
        } else {
            $('#scroll-top').fadeOut();
        }
    });
    $("a[href='#top']").on('click', function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });



    /*****************************************************
     * Properties Layout Function
     *****************************************************/
    var propertyItem =$(".layout-item-wrap"),
        layoutLinks= $('.layout-view .fa'),
        listStyle= $('.layout-item');

    layoutLinks.on('click', function () {
        var targetClass = 'col-xs-' + $(this).data('layout');

        propertyItem.removeClass(function (index, className) {
            return (className.match (/\bcol-\S+/g) || []).join(' ');
        });
        propertyItem.addClass(targetClass);

        if (propertyItem.hasClass('col-xs-12')) {
            listStyle.addClass('list-style');
        } else {
            listStyle.removeClass('list-style');
        }
        layoutLinks.removeClass('selected');
        $(this).addClass('selected');
        return false;
    });








    /*****************************************************
     * Slick Nav
     * http://slicknav.com/
     *****************************************************/
    if(jQuery().slicknav ) {
        $('#site-nav > ul').slicknav({
            prependTo: "#site-header-top + .container >.row"
        });
    }



    /*****************************************************
     * Twitter Feeds
     * https://github.com/sonnyt/Tweetie
     *****************************************************/
    if(jQuery().twittie ) {
        $('#twitter-feeds').twittie({
            username: 'themesinspire',
            'count': 2,
            'hideReplies': true,
            template: '<span className="avatar"> {{avatar}} </span> <p className="tweet">{{tweet}}</p>',
            loadingText: 'Fetching Tweets...'
        }, function () {

        });

    }



    /*****************************************************
     * Whats Nearby Function
     * https://github.com/LaGrangeMtl/WhatsNearby
     *****************************************************/
    window.onload= function () {
        if(jQuery().whatsnearby ) {
            $("#nearby-places-map").whatsnearby({
                zoom: 15,
                width: "100%",
                address: "Montreal",
                placesRadius: 500,
                scrollwheel: false,
                placesTypes: ['restaurant', 'cafe', 'gym'],
                excludePlacesTypes: ['bar']
            });
        }
    };



    /*****************************************************
     * Contact Form AJAX validation and submission
     * Validation Plugin : http://bassistance.de/jquery-plugins/jquery-plugin-validation/
     * Form Ajax Plugin : http://www.malsup.com/jquery/form/
     ****************************************************/
    if(jQuery().validate && jQuery().ajaxSubmit)
    {

        var submitButton = $('#submit-button'),
            ajaxLoader = $('#ajax-loader'),
            messageContainer = $('#message-container'),
            errorContainer = $("#error-container");

        var formOptions = {
            beforeSubmit: function () {
                submitButton.attr('disabled', 'disabled');
                ajaxLoader.fadeIn('fast');
                messageContainer.fadeOut('fast');
                errorContainer.fadeOut('fast');
            },
            success: function (ajax_response, statusText, xhr, $form) {
                function parseMyHeader(){
                    try {
                        return JSON.parse(ajax_response);
                    } catch(ex){
                        return false;
                    }
                }

                var response = parseMyHeader();
                ajaxLoader.fadeOut('fast');
                submitButton.removeAttr('disabled');
                if(!null && response.response == true){
                    if (response.response) {
                        $form.resetForm();
                        messageContainer.html(response.message).fadeIn('fast');
                    } else {
                        errorContainer.html(response.message).fadeIn('fast');
                    }
                }else{
                    errorContainer.html(ajax_response).fadeIn('fast');
                }
            }
        };

        $('.contact-form').validate({
            errorLabelContainer: errorContainer,
            submitHandler: function (form) {
                $(form).ajaxSubmit(formOptions);
            }
        });
    }



    /*****************************************************
     *Animations
     * http://mynameismatthieu.com/WOW/
     *http://daneden.github.io/animate.css
     ******************************************************/
    function afterReveal( el ) {
        el.addEventListener('animationend', function( event ) {
            $(el).removeAttr('style');
        });
    }

    var wow = new WOW.WOW(
        {
            boxClass:     'wow',      // animated element css className (default is wow)
            animateClass: 'animated', // animation css className (default is animated)
            offset:       0,          // distance to the element when triggering the animation (default is 0)
            mobile:       false,       // trigger animations on mobile devices (default is true)
            live:         true,       // act on asynchronously loaded content (default is true)
           // callback:     afterReveal,
            scrollContainer: null // optional scroll container selector, otherwise use window
        }
    );
    $(window).on('load', function() {
        wow.init();
    });



    /*****************************************************
     * Mixup Filter Plugin
     * https://www.kunkalabs.com/mixitup/
     *****************************************************/
    var filterContainer = document.getElementById('filter-container');

    if($(filterContainer).length > 0){
        var mixer = mixitup(filterContainer, {
            selectors: {
                target: '.mix'
            },
            animation: {
                "duration": 618,
                effects: 'fade scale stagger(50ms)' // Set a 'stagger' effect for the loading animation
            },
            load: {
                filter: 'none' // Ensure all targets start from hidden (i.e. display: none;)
            }
        });

        // Add a className to the container to remove 'visibility: hidden;' from targets. This
        // prevents any flickr of content before the page's JavaScript has loaded.
        filterContainer.classList.add('mixitup-ready');

        // Show all targets in the container
        mixer.show()
            .then(function() {

                // Remove the stagger effect for any subsequent operations
                mixer.configure({
                    animation: {
                        effects: 'fade scale'
                    }
                });
            });
    }



}(jQuery));
  }, 1000))
    }

     handleChange() {

         var myHeaders = new Headers({
             "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",

         });
         var checkin = Math.round(Date.parse(new Date(document.getElementById('check-in').value)) / 1000);
         var checkout = Math.round(Date.parse(new Date(document.getElementById('check-out').value)) / 1000);
         var location_list = this.state.address


         var array = []
         for (var i in location_list) {
             array.push(location_list[i]['id'])
         }

         var location = {}
         location['location'] = array
         location['guest_num'] = document.getElementById('guest-number').value == '' ? document.getElementById('guest-number').value : parseInt(document.getElementById('guest-number').value)
         location['check_in_time'] = checkin
         location['check_out_time'] = checkout


         const url = 'http://127.0.0.1:5000/search'
         console.log(location);
         fetch(url, {
             method: 'POST',
             mode: 'cors',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(location)
         }).then((res) => res.json()).then((data) => {

             console.log(data);

            if(data['number']==0){
                alert('Not Property was Found')
            }
            else{

             for (var key in  data['data']) {

                  data['data'][key]['id'] = key;
                  if(document.getElementById('check-in') != null){
                  data['data'][key]['checkin'] = document.getElementById('check-in').value}
                  if(document.getElementById('check-out') != null){
                  data['data'][key]['checkout'] = document.getElementById('check-out').value}

             }
             console.log(data)
             ReactDOM.render(<div>
                     <div id="site-banner" className="text-center clearfix">
                         <div className="container">
                             <h1 className="title wow slideInLeft">Properties Preview</h1>
                             <ol className="breadcrumb wow slideInRight">
                                 <li><a>Home</a></li>
                                 <li><a>LISTING</a></li>
                             </ol>
                         </div>
                     </div>
                     < List_Page all_item={data}/>

                 </div>,
                 document.getElementById('ttt'));}


         })
     }
    render(){

        return(<div>
    <div id="page-loader">
    <div className="loaders">
        <img src="assets/images/loader/3.gif" alt="First Loader"/>
        <img src="assets/images/loader/4.gif" alt="First Loader"/>
    </div>
</div>
<header id="site-header">
    <div id="site-header-top">
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <div className="clearfix">
                        <button className="btn btn-warning btn-lg header-btn visible-sm pull-right">{this.state.value}</button>
                        <p className="timing-in-header"></p>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="clearfix">
                        <button className="btn btn-warning btn-lg header-btn hidden-sm" onClick={this.signin_render}>{this.state.value}</button>

                    </div>
                </div>
            </div>
        </div>

    </div>


    <div className="container">
        <div className="row">
            <div className="col-md-3">
                <figure id="site-logo">
                    <a ><img src="assets/images/logo.png" alt="Logo"/></a>
                </figure>
            </div>



  <div className="col-md-6 col-sm-8" >
                <nav id="site-nav" className="nav navbar-default">
                    <ul className="nav navbar-nav">
                        <li><a  onClick = {this.home_render}>Booking</a></li>
                        <li><a   onClick = {this.list_render }>All Properties</a></li>

                            <li><a  onClick = {this.manage_render }>Manage Order</a></li>
                    </ul>
                </nav>

  </div>


            </div>
        </div>

</header>
<div id = "ttt">
</div>
</div> )
    }
}
ReactDOM.render((

    <First_Layout />

), document.getElementById('root'))









registerServiceWorker();
