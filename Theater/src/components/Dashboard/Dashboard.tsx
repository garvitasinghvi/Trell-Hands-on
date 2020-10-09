import * as React from 'react';
import { TextField,ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';
import { Stack,PrimaryButton, IStackStyles } from 'office-ui-fabric-react';
import { DatePicker, IDatePickerStrings } from 'office-ui-fabric-react';
import { Label } from 'office-ui-fabric-react/lib/Label';

import { DetailsList,Selection, SelectionMode, SelectionZone} from 'office-ui-fabric-react/lib/DetailsList';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { initializeIcons } from '@uifabric/icons';
import { useForceUpdate } from '@uifabric/react-hooks';
import ReactQuill from 'react-quill';
import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom';
initializeIcons();

export const Dashboard: React.FunctionComponent = () => {
 
  const [showMovies, setShowMovies] = React.useState(false);
  const[email,setEmail]=React.useState<string>();
  var tablecolumns: any[];
  var tablerows: any[];
  var cols:any[];
  cols =['id','name','movieDesc','movieDirector','movieDuration']
  tablerows=[]
  const [rows, setRows] = React.useState<any[]>(tablerows);
  const [columns, setColumns] = React.useState<any[]>();
  const forceUpdate = useForceUpdate();
  var selec: Selection;
  selec = new Selection({
    
    onSelectionChanged: () => {
     forceUpdate;
     var s= getSelectionDetails();
   
     
    }
  });
  tablecolumns=[
    {key:'column0',name:'Movie Id',fieldName: 'id', minWidth: 100, maxWidth: 120, isResizable: true},
    {key:'column2',name:'Movie Name',fieldName: 'name', minWidth: 100, maxWidth: 120, isResizable: true},
    {key:'column4',name:'Movie Descripton',fieldName: 'movieDesc', minWidth: 100, maxWidth: 120, isResizable: true},
    {key:'column1',name:'Movie Director',fieldName: 'movieDirector', minWidth: 100, maxWidth: 100, isResizable: true},
    {key:'column3',name:'Duration',fieldName: 'movieDuration', minWidth: 100, maxWidth: 160, isResizable: true},
 
    
]
  function getSelectionDetails(): any {
    const selecCount = selec.getSelectedCount();
  
    switch (selecCount) {
      case 0:
        return -1;
      default :
        return (selec.getSelection()[0] as any).jobRequisitionId;
      
    }
  }
  
  async function Search(){
    const apiresponse = await fetch('https://localhost:44397/api/Movie', {
      method: 'GET'     
  });
  
  if (apiresponse.status !== 400) {
   
    apiresponse.json().then(function(result) {
       console.log(result);
        let n=result.length;
        for(let i=0;i<n;i++)
        {
          var r: string;
           r='{ "key":"'+i+'",';
          for(let j=0;j<5;j++)
          {
            let a=cols[j];
            if(j!=0)
            r=r+",";
            r=r+'"'+a+'" : "'+result[i][a] +'"';
          }
          r=r+"}";
          var rp=JSON.parse(r);
          tablerows.push(rp);
        }
        setColumns(tablecolumns);
        setRows(tablerows);
        setShowMovies(true);

      });
    }
}
  
 
 
  return (
  <Stack >
  <PrimaryButton type="button" onClick={Search}> Search Movies</PrimaryButton>
  {showMovies?<div>
    <DetailsList
            items={rows}
            columns={columns}
            setKey="none"
            selection={selec}
            selectionMode={SelectionMode.single}
            selectionPreservedOnEmptyClick={false}
          />   
    
  </div>:null}

 
  </Stack>
  );
};
/*
<Dropdown
label="Job Type" className="item"
selectedKey={selectedItem ? selectedItem.key : undefined}
onChange={jobType}
placeholder="Select an option"
options={dropdownControlledExampleOptions}
styles={dropdownStyles}
/>*/