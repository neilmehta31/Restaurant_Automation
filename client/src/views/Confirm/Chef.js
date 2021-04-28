import React from "react" ;
import MaterialTable from "material-table" ;
import Axios from 'axios';
import {useEffect} from 'react';
 
 
export default function Chef() {
    const { useState } = React ;
  
    const [columns, setColumns] = useState([
      { title: 'Order Status' , field: 'orderFinished',type: 'boolean'},
      { title: 'Meal Id', field: 'mealId'},
      { title: 'Order Id', field: 'orderId'},
    //   { title: 'Meal Id', field: 'mealId',type:'numeric'},
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
    }, []);
  
    const getData = () => {Axios.get("http://rest-auto-api.herokuapp.com/api/employee/getOrderStatus").then((response) => {
 
              console.log(response);
  
              setData(response.data.response); 
            //   console.log(response.data[0].mealName);
       })
      
       };
 
    //    const addMenu = (e) => {Axios.post("http://rest-auto-api.herokuapp.com/api/manager/meals/add",e).then((response) => {
    //     // console.log(name);
    //     console.log(response);
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // };
 
 
       
    //   const deleteMenu = (e) => {Axios.delete("http://rest-auto-api.herokuapp.com/api/manager/meals/deleteOne",e).then((response) => {
    //     // console.log(e);
    //     console.log(e);
    //     console.log(response);
    //     // console.log(typeof e.mealId);
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // };
 
 
       
    //   const updateMenu = (e) =>{Axios.put("http://rest-auto-api.herokuapp.com/api/manager/meals/update",e).then((response) => {
    //     // console.log(name);
    //     console.log(response);
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // };
       
  
    return (
      <div>
          
      <MaterialTable
        title="ORDERS TO BE PREPARED"
        columns={columns}
        data={data}
        editable={{
        //   onRowAdd: newData =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         setData([...data, newData]);
 
        //         addMenu(newData);
                
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
  
        //         console.log(newData);
        //         console.log(index);
        //         updateMenu(newData);
 
        //         resolve();
        //       }, 1000)
        //     }),
        //   onRowDelete: oldData =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         const dataDelete = [...data];
        //         const index = oldData.tableData.id;
        //         dataDelete.splice(index, 1);
        //         setData([...dataDelete]);
 
        //         console.log(oldData);
                
        //         deleteMenu(oldData);
 
        //         resolve();
        //       }, 1000)
        //     }),
        }}
        options={{
          headerStyle: {
            backgroundColor: '#BC243C',
            color: '#FFF'
          },
          rowStyle: {
            backgroundColor: '#DFCFBE',
          },
          selection: true,
        }}
        onSelectionChange={(rows) => alert('You selected ' + rows.length + ' rows')}
      />
      </div>
    );
  }