import * as React from 'react';
import { TextField,ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';
import { Stack,PrimaryButton, IStackStyles } from 'office-ui-fabric-react';
import { DatePicker, IDatePickerStrings } from 'office-ui-fabric-react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import './SignUp.css'
import { DetailsList,Selection, SelectionMode, SelectionZone} from 'office-ui-fabric-react/lib/DetailsList';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { initializeIcons } from '@uifabric/icons';
import { useForceUpdate } from '@uifabric/react-hooks';
import ReactQuill from 'react-quill';
import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom';
initializeIcons();

export const SignUp: React.FunctionComponent = () => {
 
  const [show, setShow] = React.useState(false);
  const[email,setEmail]=React.useState<string>();
  
  const[password,setPassword]=React.useState<string>();
  async function Search(){
    const apiresponse = await fetch('https://localhost:44342/api/UserAdmin', {
      method: 'GET'     
  });
  if (apiresponse.status !== 400) {
     
    apiresponse.json().then(function(result) {
      console.log(result);
      let n=result.length;
      if(n==0)
      {
        setShow(true)
      }
      else setShow(false);
     


    });
  }
}
  
  
    async function SignUp(){ setShow(true)} 

    const theEmail=(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
      setEmail(newValue);
    };
    const thePassword=(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
      setPassword(newValue);
    };
 
  return (
  <Stack >
    
   {show?<div>
     <h1>SignUp</h1>
     <TextField label="Email" className="item" onChange={theEmail} value={email} />
    <TextField  label="Password" className="item" onChange={thePassword} value={password} type="password"  />
            
    <Link to="/dashboard">
     <PrimaryButton type="button">
         SignUp!!
     </PrimaryButton>
 </Link>
   </div>:<div>
     <h1>LoginUp</h1>
     <TextField label="Email" className="item" onChange={theEmail} value={email} />
    <TextField  label="Password" className="item" onChange={thePassword} value={password} type="password"  />
            
    <Link to="/dashboard">
     <PrimaryButton type="button">
        Login!!
     </PrimaryButton>
 </Link>
 <PrimaryButton type="button" onClick={SignUp}>
 SignUp!!
     </PrimaryButton>
   </div>}
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