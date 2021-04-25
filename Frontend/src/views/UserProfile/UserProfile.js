import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import useState from 'react';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};



const useStyles = makeStyles(styles);
   



export default function UserProfile() {
  const classes = useStyles();

  const [firstname, setFirstname]=useState('0'); 
  const [surname,setSurname]=useState('0'); 
  const [password, setPassword]= useState('0'); 
  const [phoneNo, setPhoneNo]= useState('0');
  

  
  // const [username,setUsername]=useState(''); 
  // const [country,setCountry]=useState(''); 
  // const [city,setCity]=useState(''); 
  // const [postalcode,setPostalcode]=useState(''); 
  

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              {/* <GridContainer> */}
                {/* <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </GridItem> */}
                {/* <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                  />
                </GridItem>
              </GridContainer> */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="firstname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Sur Name"
                    id="surname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(e) => {
                      setSurname(e.target.value);
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Phone no"
                    id="phoneNo"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(e) => {
                      setPhoneNo(e.target.value);
                    }}
                  />
                </GridItem>
                {/* <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(e) => {
                      setPostalcode(e.target.value);
                    }}
                  />
                </GridItem> */}
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
