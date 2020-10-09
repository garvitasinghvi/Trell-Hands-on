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

export const AddMovie: React.FunctionComponent = () => {
 
  const[id,setId] =React.useState<number>();
  const[name,setName] =React.useState<string>();
  const[duration,setDuration] =React.useState<number>();
  const[movieDirector,setMovieDirector] =React.useState<string>();
  const[movieDesc,setMovieDesc] =React.useState<string>();
  const[movieDuration,setMovieDuration] =React.useState<string>();
  async function Search(){
    const apiresponse = await fetch('https://localhost:44397/api/Movie', {
      method: 'GET'     
  });
  
  if (apiresponse.status !== 400) {
   
    apiresponse.json().then(function(result) {
       console.log(result);
        let n=result.length;
        n++;
setId(n);
      });
    }
}
  
async function Post() {
    // POST request using fetch with async/await
  
    let si=0;
    var request ={
        "id":id,
        "name":name,
        "movieDesc":movieDesc,
        "movieDirector":movieDirector,
        "movieDuration":Number(movieDuration)
     }
    console.log(request);
    
    const apiresponse = await fetch('https://localhost:44397/api/Movie', {
        method: 'POST',
        headers: {
          "content-type": "application/json",
      },
      body: JSON.stringify(request)
    });
    console.log(1);
  
    if (apiresponse.status !== 400) {
      apiresponse.json().then(function(result){
        console.log(result);
      })
      Search();
    }
  
    var newValue:string;
    newValue="";
    setMovieDesc(newValue);setMovieDirector(newValue);setName(newValue);
  

  }
  const theName =(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
    setName(newValue)
   };
   const theDesc =(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
     setMovieDesc(newValue);
   };
   const theDirector =(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
    setMovieDirector(newValue);
  };
   const theDuration =(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
    setMovieDuration(newValue);
  };
 
  return (
  <Stack >
  <PrimaryButton type="button" onClick={Search}> Search Movies</PrimaryButton>
 
  <TextField label="Name"  className="item" onChange={theName} value={name} placeholder="Enter..." />
  <TextField label="Description"  className="item" onChange={theDesc} value={movieDesc} placeholder="Enter..." />
        
  <TextField label="Director"  className="item" onChange={theDirector} value={movieDirector} placeholder="Enter..." />
  <TextField label="Duration"  className="item" onChange={theDuration} value={movieDuration} placeholder="Enter..." />
  <PrimaryButton type="button" onClick={Post}> Add Movie</PrimaryButton>
 
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