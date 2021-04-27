import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Table from "../../components/Table/Table.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import useremail from '../EmployeeLogin/EmployeeLogin';
import Chef from './Chef.js';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);
const editSyles = makeStyles({
  root: {
    background: "blue",
  },
});



let tablelist = {
    "table1":
      {   
          tableHeaderColor:"primary",
          tableHead:["Item", "Cost"],
          tableData:[
              ["Veg Pizza", "₹160"],
              ["Paneer Pizza", "₹200"],
              ["Peri Peri Pizza", "₹160"],
              ["Cheese Corn Pizza", "₹180"],
              ["Paneer Pizza", "₹160"],
            ],
      }
  ,
  "table2":
    {   
        tableHeaderColor:"primary",
        tableHead:["Item", "Cost"],
        tableData:[
            ["Veg Pizza", "₹160"],
            ["Paneer Pizza", "₹200"],
            ["Peri Peri Pizza", "₹160"],
            ["Cheese Corn Pizza", "₹180"],
            ["Paneer Pizza", "₹160"],
          ],
    }

}

// function displaylist(){
//     const classes = useStyles();
//     return(
//         <Card>
//             <Cardheader color = "primary">

//             </Cardheader>
//         </Card>
//     );
// }



export default function PlaceOrder() {
  const classes = useStyles();
  const editSt = editSyles();

  

  return (
         <div>
        <Chef />
        </div>
      );
}
