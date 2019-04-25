import React, { Component } from 'react';
import {
	Form,
	Popup,
	Image,
	Modal,
	Icon,
	Header,
	Button 
} from 'semantic-ui-react'

/* Options provided for the gender in edit modal */

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    {key: 'o', text: 'Other', value: 'other'},
    {key: 'n', text: 'Prefer not to disclose', value: 'prefer not to disclose'}

];

/* Extended react.Component class as ProfileEdit */

export default class ProfileEdit extends Component{


  /**
   * Constructor for the ProfileEdit class
   * @constructor extends react.Component
   */

	constructor(props){
		super(props);
		this.state = {
			isOpen:false,
			MetaProfile:{},
			metaProfile:{},
			profile:{
			}
		};
		this.setMetaData = this.setMetaData.bind(this);
		this.onEdit = this.onEdit.bind(this);
	}

  /**
   * Function to handle on change event for edit
   * @enum {string} MetaData
   */

	handleChange(MetaData){
		// console.log(MetaData);
		this.setState({MetaProfile:MetaData});
	}

  /** 
   * Function to save the edited data on click save button
   */

	onEdit(){
		let changedData = this.state.MetaProfile;
		changedData.name = (this.state.MetaProfile.given_name || this.state.profile.given_name ) + " " + (this.state.MetaProfile.family_name || this.state.profile.family_name );
		changedData.nickname = (this.state.MetaProfile.nickname || this.state.profile.nickname);

		this.props.auth.updateData(this.state.profile.sub, {"user_metadata":changedData})
            .then((data) => {
                console.log(data);
                this.setMetaData(this.state.profile.sub);
                this.hideModal();
            })
            .reject((err) => {
                console.log(err);
            })
	}

  /**
   * Function to handle Modal (opening event)
   */

	openModal(){
		this.setState({
			isOpen: true
		});
	}

  /**
   * Function to handle Modal (closing event)
   */

  hideModal(){
    this.setState({
      isOpen: false
    });
    this.setMetaData(this.state.profile.sub);
  }

  /** 
   * Function to set user_metadata from auth to state object
   * @param {string} userid
   */

   setMetaData(userid){
    let { metaUserProfile, getMetaProfile } = this.props.auth;
    if(!metaUserProfile){
      getMetaProfile(userid)
          .then((data) => {
              this.setState({check:true});
              data = JSON.parse(data)["user_metadata"];
              if(!data) data = {};
              this.setState({metaProfile:data});
              this.setState({MetaProfile:data});
          })
          .catch((err) => {
              console.log(err);
          });
    }
    else if(!this.state.metaProfile){
      //console.log("this",metaUserProfile)
      this.setState({metaProfile:metaUserProfile});
      this.setState({MetaProfile:metaUserProfile});
    }
    else{
      // console.log(this.state.metaProfile);
    }
  }

  /** 
   * Inherit function from react.Component to handle after mounting
   *   react component
   */

  componentWillReceiveProps(nextProps){
    if(nextProps.profile != this.state.profile){
      this.setState({profile:nextProps.profile});
      this.setMetaData(nextProps.profile.sub);
    }
  }

  /** 
   * Inherited function from react.Component to render to DOM object into html
   */

  render(){
  	let { profile, metaProfile, isOpen } = this.state;
  	return(
  		<div style={{display:'inline'}}>
  		<Icon name="write" style={{float:'right',fontSize:'15px'}} onClick={()=>this.openModal()} />
  		<Modal dimmer="blurring" open={isOpen} onClose={()=>this.hideModal()} style={{ maxHeight: '500px', overflowY: 'auto', transform: 'translate(0, -50%)' }}>
          <Modal.Header>Profile</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='small' src={profile.picture} />
            <Modal.Description>
            	<Header>Edit</Header>
            	<Form>
              		<Form.Group widths='equal'>
              			<Form.Input label='First name' value={ metaProfile.given_name || profile.given_name } onChange={(e,{value})=>{let MetaData=this.state.metaProfile;MetaData.given_name = value; this.handleChange(MetaData);}} placeholder='First name' />
              			<Form.Input label='Last name' value={ metaProfile.family_name || profile.family_name } onChange={(e,{value})=>{let MetaData=this.state.metaProfile;MetaData.family_name = value; this.handleChange(MetaData);}} placeholder='Last name' />
              			<Form.Select label='Gender' value={ metaProfile.gender } options={options} onChange={(e,{value})=>{let MetaData=this.state.metaProfile;MetaData.gender = value; this.handleChange(MetaData);}} placeholder='Gender' />
              		</Form.Group>
              		<Form.Group>
              			<Form.Input label='Nickname' value={ metaProfile.nickname || profile.nickname } onChange={(e,{value})=>{let MetaData=this.state.metaProfile;MetaData.nickname = value; this.handleChange(MetaData);}} placeholder='Nickname' width={6}/>
              			<Form.Input label='Mobile Number' value={ metaProfile.mobile } onChange={(e,{value})=>{let MetaData=this.state.metaProfile;MetaData.mobile = value; this.handleChange(MetaData);}} placeholder='mobile' width={6}/>
              		</Form.Group>
              		<Form.Group>
              			<Form.Input label='Website' value={ metaProfile.website } onChange={(e,{value})=>{let MetaData=this.state.metaProfile;MetaData.website = value; this.handleChange(MetaData);}} placeholder='Website' width={6} />
              		</Form.Group>
                	<Form.TextArea label='About' value={ metaProfile.about } onChange={(e,{value})=>{let Profile=this.state.profile,MetaData=this.state.metaProfile;MetaData.about = value; this.handleChange(MetaData);}} placeholder='Tell us more about you...' />
             	</Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={()=>this.hideModal()}>
              Cancel
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Save Changes" onClick={()=>this.onEdit()} />
          </Modal.Actions>
        </Modal>
        </div>
  		)
  }
}
