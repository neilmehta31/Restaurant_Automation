import React,{useState} from 'react';
// import logo from './logo.svg';
import FeedBack from 'react-feedback-popup';
// import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import TextArea from '@material-ui/core/TextArea';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';





function Feedback() {

    const history =useHistory();

    const[restaurant_ambience,setRestaurant_ambience]=useState('');
    const[restaurant_service,setRestaurant_service]=useState('');
    const[restaurant_food,setRestaurant_food]=useState('');
    const[additional_comments,setAdditional_comments]=useState('');

    const feedbacksubmit = () => {Axios.post("http://localhost:5000/api/customer/feedback",{
        restaurant_ambience,
        restaurant_service,
        restaurant_food,   
        additional_comments
    }).then((response) => {
        console.log(response);
        history.push("/admin/placeOrder");
        // console.log(typeof e.mealId);
      }).catch((err) => {
        console.log(err);
      });
    };

	return (
		<div>
            <form>
            <p>How much you rate for our restaurant ambience?</p>
			<TextField id="standard-basic"  onChange={(e) => {
                      setRestaurant_ambience(e.target.value);
                    }}  />
                <br />
                <br />
                <br />
                <p>How much you rate for our restaurant service?</p>
			<TextField id="standard-basic"  onChange={(e) => {
                      setRestaurant_service(e.target.value);
                    }} />
                <br />
                <br />
                <br />
                <p>How much you rate for our restaurant service?</p>
			<TextField id="standard-basic"  onChange={(e) => {
                      setRestaurant_food(e.target.value);
                    }} />
                <br /> 
                <br /> 
                <br />
                <p>Kindly provide us your valuable suggestions?</p>
			<TextField id="standard-basic" rows="2" cols="70" multiline = 'true'  onChange={(e) => {
                      setAdditional_comments(e.target.value);
                    }}/>
                <br /> 
                <br /> 
                <br />
            <Button variant="contained" color="primary" onClick={feedbacksubmit}>Submit</Button>   
            </form>  
		</div>
	);
}

export default Feedback;