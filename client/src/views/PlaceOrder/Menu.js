import React from "react" ;
import MaterialTable from "material-table" ;
import Axios from 'axios';
import {useEffect} from 'react';


export default function Menu() {
    const { useState } = React ;
  
    const [columns, setColumns] = useState([
      { title: 'Meal Id', field: 'mealId'},
      { title: 'Name' , field: 'mealName' },
      { title: 'Price', field: 'price'},
      { title: 'Preparation time', field:'preptime'},
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
  
    const getData = () => {Axios.get("http://localhost:5000/api/manager/meals/all").then((response) => {

              console.log(response);
  
              setData(response.data); 
            //   console.log(response.data[0].mealName);
       })
      
       };

       const addMenu = (e) => {Axios.post("http://localhost:5000/api/manager/meals/add",e).then((response) => {
        // console.log(name);
        console.log(response);
      }).catch((err) => {
        console.log(err);
      });
    };


       
      const deleteMenu = (e) => {Axios.delete("http://localhost:5000/api/manager/meals/deleteOne",e).then((response) => {
        // console.log(e);
        console.log(e);
        console.log(response);
        // console.log(typeof e.mealId);
      }).catch((err) => {
        console.log(err);
      });
    };


       
      const updateMenu = (e) =>{Axios.put("http://localhost:5000/api/manager/meals/update",e).then((response) => {
        // console.log(name);
        console.log(response);
      }).catch((err) => {
        console.log(err);
      });
    };
       
  
    return (
      <div>
          
      <MaterialTable
        title="Set Menu"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);

                addMenu(newData);
                
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
  
                console.log(newData);
                console.log(index);
                updateMenu(newData,index);

                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                console.log(oldData);
                
                deleteMenu(oldData);

                resolve();
              }, 1000)
            }),
        }}
        options={{
          headerStyle: {
            backgroundColor: '#01579b',
            // border
            color: '#FFF'
          },
          rowStyle: {
            backgroundColor: '#F7CAC9',
          }
         

        }}
      />
      </div>
    );
  }