import React from "react";
import MaterialTable from "material-table";
import Axios from "axios";
import { useEffect } from "react";
import Button from "@material-ui/core/Button";
// import payment from "../Payments/paytm-nodejs/index.js";
 
export default function Orders() {
  const { useState } = React;
 
  const [columns, setColumns] = useState([
    { title: "Name", field: "mealName" },
    { title: "Price", field: "price" },
    //   { title: 'Name Of HR', field: 'Name_of_HR', type: 'numeric' },
    //   {
    //     title: 'Est_Yr',
    //     field: 'Years_Of_Establishment',
    //   },
    // { title: 'Birth Year', field: 'Colleges_It_Visited', type: 'numeric' },
  ]);
 
  const [data, setData] = useState([
    // { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
  ]);
 
  useEffect(() => {
    getData();
    // addTotal();
  }, []);
 
  const [sum, setSum] = useState(0);
  const getData = () => {
    Axios.get("https://rest-auto-api.herokuapp.com/api/manager/meals/all").then(
      (response) => {
        console.log(response);
 
        setData(response.data);
        //   console.log(response.data[0].mealName);
      }
    );
  };
 
  // console.log(data);
 
  let tempSum = 0;
  data.map(({ price }) => {
    tempSum += price;
  });
  // setSum()
  console.log(tempSum);
 
  //  const addTotal = (data, byColumn) => {
  //   let keys = Object.keys(data[0]);
  //   let total = data.reduce((acc, el) => {
  //     return acc += +(el[byColumn]);
  //   }, 0);
 
  //   let totalRow = {};
  //   let emptyRow = {};
  //   for (let key of keys) {
  //     if (key === keys[0]) {
  //       totalRow[key] = 'Total';
  //     } else if (key === byColumn) {
  //       totalRow[key] = total;
  //     } else {
  //       totalRow[key] = '';
  //     }
  //     emptyRow[key] = '';
  //   }
  //   return [...data, emptyRow, totalRow];
  // }
 
  const paymentfunc = () => {
    window.open(
      "https://node-paytm.herokuapp.com/_pay/init",
      "demo",
      "width=550,height=300,left=150,top=200,toolbar=0,status=0,"
    );
  };
 
  return (
    <div>
      <MaterialTable
        title="Order"
        columns={columns}
        data={data}
        editable={
          {
            //   onRowAdd: newData =>
            //     new Promise((resolve, reject) => {
            //       setTimeout(() => {
            //         setData([...data, newData]);
            //         resolve();
            //       }, 1000)
            //     }),
            //   onRowUpdate: (newData, oldData) =>
            //     new Promise((resolve, reject) => {
            //       setTimeout(() => {
            //         const dataUpdate = [...data];
            //         const index = oldData.tableData.id;
            //         dataUpdate[index] = newData;
            //         setData([...dataUpdate]);
            //         resolve();
            //       }, 1000)
            // Axios.post('http')
            // }),
            //   onRowDelete: oldData =>
            //     new Promise((resolve, reject) => {
            //       setTimeout(() => {
            //         const dataDelete = [...data];
            //         const index = oldData.tableData.id;
            //         dataDelete.splice(index, 1);
            //         setData([...dataDelete]);
            //         resolve()
            //       }, 1000)
            //     }),
          }
        }
        options={{
          headerStyle: {
            backgroundColor: "#B565A7",
            color: "#FFF",
          },
          rowStyle: {
            backgroundColor: "#F5D6C6",
          },
        }}
      />
      {/* <center>
      <button className="btn changecolour rounded-pill " style={{marginTop:20}} onclick={() =>paymentviapaytm}>  Payment Via Paytm  </button></center> */}
      <center>
        <strong>
          <div style={{ marginTop: 20, color: "#56C6A9", fontSize: 30 }}>
            Transaction Amount: 1418
          </div>
        </strong>
      </center>
      <br />
      <br />
      <center>
        <Button variant="contained" color="secondary" onClick={paymentfunc}>
          Payment
        </Button>
      </center>
    </div>
  );
}