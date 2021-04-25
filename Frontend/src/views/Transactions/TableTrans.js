import React from "react" ;
import MaterialTable from "material-table" ;
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {useEffect} from 'react';


export default function TableTrans() {
    const { useState } = React ;
  
    const [columns, setColumns] = useState([
      { title: 'Customer First Name' , field: 'firstname' },
      { title: 'Customer Last', field: 'surname'},
      { title: 'Transaction', field: 'price'},
    //   { title: 'Name Of HR', field: 'Name_of_HR', type: 'numeric' },
    //   {
    //     title: 'Est_Yr',
    //     field: 'Years_Of_Establishment',
    //   },
      // { title: 'Birth Year', field: 'Colleges_It_Visited', type: 'numeric' },
    ]);
  
    const [data, setData] = useState([
      { firstname: 'Neil', surname: 'Mehta', price: 'Rs180' },
      { firstname: 'Atishay', surname: 'Jain', price: 'Rs200' },
      { firstname: 'Sahaj', surname: 'Gupta', price: 'Rs280' },
      { firstname: 'Barun', surname: 'Agarwal', price: 'Rs150' },
    ]);

    // useEffect(() => {
    //     getData();
    // }, []);
  
    // const getData = () => {Axios.get("http://localhost:5000/api/manager/meals/all").then((response) => {

    //           console.log(response);
  
    //           setData(response.data); 
    //         //   console.log(response.data[0].mealName);
    //    })
      
    //    };
  
    return (
      <div>
          
      <MaterialTable
        title="Transactions Details"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
  
                resolve();
              }, 1000)
              Axios.post('http')
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                
                resolve()
              }, 1000)
            }),
        }}
      />
      </div>
    )
  }