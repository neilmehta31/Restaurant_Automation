import React from "react" ;
import MaterialTable from "material-table" ;
import Axios from 'axios';
import {useEffect} from 'react';


export default function Employee() {
    const { useState } = React ;
  
    const [columns, setColumns] = useState([
      {title:'Employee ID',field : 'empId'},
      { title: 'First Name' , field: 'firstname' },
      { title: 'Sur Name', field: 'surname'},
      { title: 'Email', field: 'email'},
      { title: 'Designation', field: 'designation'},
      { title: 'Salary', field: 'salary'},
      { title: 'Phone No', field: 'phoneNo'},
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
  
    const getData = () => {Axios.get("http://rest-auto-api.herokuapp.com/api/manager/employee/all").then((response) => {

              console.log(response);
  
              setData(response.data); 
            //   console.log(response.data[0].mealName);
       })
      
       };

       const addEmployee = (e) => {Axios.post("http://rest-auto-api.herokuapp.com/api/manager/employee/add",e).then((response) => {

        console.log(response);

        // setData(response.data); 
      //   console.log(response.data[0].mealName);
 })

 };   

 const updateEmployee = (e) =>{Axios.post("http://rest-auto-api.herokuapp.com/api/manager/employee/update",e).then((response) => {
  // console.log(name);
  console.log(response);
}).catch((err) => {
  console.log(err);
});
};
  

const deleteEmployee = (e) =>{Axios.delete("http://rest-auto-api.herokuapp.com/api/manager/employee/delete",e).then((response) => {
  console.log(e);
  console.log(response);
}).catch((err) => {
  console.log(err);
});
};


    return (
      <div>
          
      <MaterialTable
        title="Set Info"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                
                addEmployee(newData);
                console.log(newData);
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
                
                updateEmployee(newData);

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
                
                deleteEmployee(oldData);

                resolve()
              }, 1000)
            }),
        }}
        options={{
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF'
          },
          rowStyle: {
            backgroundColor: '#F7CAC9',
          }
         

        }}
      />
      </div>
    )
  }