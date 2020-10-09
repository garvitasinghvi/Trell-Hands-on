import * as React from 'react';
import { TextField,ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';
import { Stack,PrimaryButton, IStackStyles } from 'office-ui-fabric-react';
import { DatePicker, IDatePickerStrings } from 'office-ui-fabric-react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import './SignUp.css'
import './quill.snow.css'
import { DetailsList,Selection, SelectionMode, SelectionZone} from 'office-ui-fabric-react/lib/DetailsList';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { initializeIcons } from '@uifabric/icons';
import { useForceUpdate } from '@uifabric/react-hooks';
import ReactQuill from 'react-quill';

initializeIcons();
const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 200 } };

const dropdownControlledExampleOptions = [
  
  { key: 'replacement', text: 'Replacement' },
  { key: 'reallocation', text: 'Reallocation' },
  { key: 'newhire', text: 'New Hire' },
 
];

const stackTokens = { childrenGap: 20};
const stackStyles: Partial<IStackStyles> = { root: { width: 850, justifyContent:"space-between"} };

const DayPickerStrings: IDatePickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],

  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',
  monthPickerHeaderAriaLabel: '{0}, select to change the year',
  yearPickerHeaderAriaLabel: '{0}, select to change the month',
};
export const SignUp: React.FunctionComponent = () => {
  const today: Date = new Date(Date.now())
  const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();
  const[jobReqDesVal,setJobReqDesVal] =React.useState<string>();
  const[hiringDeptIdVal,setHiringDeptIdVal]=React.useState<string>();
  const[hiringManagerIdVal,setHiringManagerIdVal]=React.useState<string>();
  const[startSalRangeVal,setStartSalRangeVal]=React.useState<string>();
  const[endSalRangeVal,setEndSalRangeVal]=React.useState<string>();
  const[hourlyRateVal,setHourlyRateVal]=React.useState<string>();
  const[payGradeVal,setPaygradeVal]=React.useState<string>();
  const[preffStartDateVal,setPreffStartDateVal]=React.useState<Date| null | undefined>();
  const[preffStartDateUVal,setPreffStartDateUVal]=React.useState(today);
  const [value, setValue] = React.useState('');
  const [disable, setDisable] = React.useState(false);
  const[posTitleVal,setPosTitleVal]=React.useState<string>();
  var selec: Selection;
  const [del,setDel] = React.useState(-1);
  var tablecolumns: any[];
  var tablerows: any[];
  var cols:any[];
  cols =['jobRequisitionId','jobRequisitionDescription','hiringManagerId','jobRequisitionStatusId','dateCreated','positionTitle','prefferedStartDate','payGrade','hourlyRate']
  tablerows=[]
  const [rows, setRows] = React.useState<any[]>(tablerows);
  const [columns, setColumns] = React.useState<any[]>();
  const [show, setShow] = React.useState(false);
  const [showP, setShowP] = React.useState(false);
  const forceUpdate = useForceUpdate();
  selec = new Selection({
    
    onSelectionChanged: () => {
     forceUpdate;
     var s= getSelectionDetails();
    setDel(s);
     
    }
  });
  
  tablecolumns=[
    {key:'column0',name:'Job Requisition Id',fieldName: 'jobRequisitionId', minWidth: 100, maxWidth: 120, isResizable: true},
    {key:'column2',name:'Hiring Manager Id',fieldName: 'hiringManagerId', minWidth: 100, maxWidth: 120, isResizable: true},
    {key:'column4',name:'Position Title',fieldName: 'positionTitle', minWidth: 100, maxWidth: 120, isResizable: true},
    {key:'column1',name:'Job Breif',fieldName: 'jobRequisitionDescription', minWidth: 100, maxWidth: 100, isResizable: true},
    {key:'column3',name:'Date Created',fieldName: 'dateCreated', minWidth: 100, maxWidth: 160, isResizable: true},
    {key:'column5',name:'PrefferedStartDate',fieldName: 'prefferedStartDate', minWidth: 100, maxWidth: 160, isResizable: true},
    {key:'column6',name:'PayGrade',fieldName: 'payGrade', minWidth: 100, maxWidth: 100, isResizable: true},
    {key:'column7',name:'Hourly Rate',fieldName: 'hourlyRate', minWidth: 100, maxWidth: 100, isResizable: true},
    {key:'column8',name:'Job Requisition Status Id',fieldName: 'jobRequisitionStatusId', minWidth: 100, maxWidth: 120, isResizable: true},
    
    
    
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

async function Delete() {
  if(del!=-1)
  {
    var url='https://localhost:44342/api/JobRequisition/'+del;
  console.log(url);
 const apiresponse = await fetch(url, {
        method: 'DELETE'
       
    });
    Search();

  }
  else console.log("Select");
  
}
async function Add() {
 setShowP(true);
 setShow(false);
   
}
  
  async function Search() {
    // POST request using fetch with async/await
    setShowP(false);
    const apiresponse = await fetch('https://localhost:44342/api/JobRequisition', {
        method: 'GET'
       
    });
    console.log(1);
  
    if (apiresponse.status !== 400) {
     
    apiresponse.json().then(function(result) {
       console.log(result);
        let n=result.length;
        for(let i=0;i<n;i++)
        {
          var r: string;
           r='{ "key":"'+i+'",';
          for(let j=0;j<9;j++)
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
        setShow(true);

      });
    }
}
    async function Submit(){
setDisable(true);
    }  
    async function Edit(){
      setDisable(false);
          }  
    async function Post() {
      // POST request using fetch with async/await
      setShow(false);
      setDisable(false);
      let si=0;
      var request ={
          //"jobRequisitionId": 3019,
           "JobRequisitionDescription": jobReqDesVal,
           "JobRequisitionStatusId": 1,
           "PositionTitle": posTitleVal,
           "HiringDepartmentId": Number(hiringDeptIdVal),
           "HiringManagerId": Number(hiringManagerIdVal),
           "JobType": 1,
           "PrefferedStartDate": preffStartDateVal?preffStartDateVal:today,
           "StartSalaryRange": Number(startSalRangeVal),
           "EndSalaryRange": Number(endSalRangeVal),
           "HourlyRate": Number(hourlyRateVal),
           "PayGrade": Number(payGradeVal),
           //"DateCreated": "2020-09-25",
           "DateEnded": null,
           //"DateModified": null,
           "CreatedByUserId": 1,
           "EndedByUserId": 1,
          "ModifiedByUserId": 1
       }
      console.log(request);
      
      const apiresponse = await fetch('https://localhost:44342/api/JobRequisition', {
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
      }
      setShow(true);
      setShowP(false);
      Search();
      var newValue:string;
      newValue="";
      setEndSalRangeVal(newValue);setPosTitleVal(newValue);setHiringManagerIdVal(newValue);setJobReqDesVal(newValue); setStartSalRangeVal(newValue);
      setHourlyRateVal(newValue); setPaygradeVal(newValue);setHiringDeptIdVal(newValue);
    

    }
  const jobType = (event?: React.FormEvent<HTMLDivElement>, item?: IDropdownOption): void => {
    setSelectedItem(item);
    
   

  };
  const posTitle = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
   
    setPosTitleVal(newValue);
  };
 const hiringDeptId =(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
   setHiringDeptIdVal(newValue)
  };
  const hiringManagerId =(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
    setHiringManagerIdVal(newValue);
  };
  const jobReqDes=(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
      setJobReqDesVal(newValue);
    };
    const startSalRange=(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
      setStartSalRangeVal(newValue);
    };
    const endSalRange=(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
      setEndSalRangeVal(newValue);
    };
    const hourlyRate=(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
      setHourlyRateVal(newValue); 
    };
    const payGrade=(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {      
      setPaygradeVal(newValue);
    };
    const preffStartDate=(date: Date | null | undefined) => {      
      setPreffStartDateVal(date);
    };

  return (
  <Stack >
    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
       <Label style={{marginLeft:50,fontSize:40}}>Job Requisition Form</Label>
       <br></br>
       <PrimaryButton className="button" onClick={Search}>View All</PrimaryButton>
       <PrimaryButton className="button" onClick={Add}>ADD</PrimaryButton>

    </Stack>  
    {show?
    <Stack>
         <PrimaryButton className="button" onClick={Delete}>Delete</PrimaryButton>
         <DetailsList
            items={rows}
            columns={columns}
            setKey="none"
            selection={selec}
            selectionMode={SelectionMode.single}
            selectionPreservedOnEmptyClick={false}
          />
    </Stack>:null}
    {showP?  <div> <br></br> <br></br>
      <Stack horizontal className="main">
    <div className="boxjd">
    <div className="main-container">
    <Label style={{marginLeft:50,fontSize:20}}>Job Description</Label>
    <TextField label="Job Breif" disabled={disable} onChange={jobReqDes} value={jobReqDesVal} className="jd" multiline autoAdjustHeight />
    <TextField label="Responsibilities" className="jd" multiline autoAdjustHeight value={value} />
    <ReactQuill theme="snow" value={value} onChange={setValue}/>
    <br></br>
    </div>
    </div>
    <div className="box">
      <div className="main-container">
        <TextField label="Position Title" disabled={disable} className="item" onChange={posTitle} value={posTitleVal} placeholder="Enter..." />
        <TextField label="Hiring Department Id" disabled={disable} className="item" onChange={hiringDeptId} value={hiringDeptIdVal} placeholder="Enter..." />
        <TextField label="Hiring Manager Id" disabled={disable} className="item" onChange={hiringManagerId} value={hiringManagerIdVal} placeholder="Enter..." />
        <TextField label="Hourly Rate" disabled={disable} className="item" onChange={hourlyRate} value={hourlyRateVal} placeholder="Enter..." />
        
        <br></br><br></br>
      </div>
      <br></br>
      <div className="main-container">     
        <TextField label="Start Salary Range" disabled={disable} className="item"onChange={startSalRange} value={startSalRangeVal} placeholder="Enter..." />
        <TextField label="End Salary Range" disabled={disable} className="item" onChange={endSalRange} value={endSalRangeVal} placeholder="Enter..." />
        <TextField label="Pay Grade" disabled={disable} className="item" onChange={payGrade} value={payGradeVal} placeholder="Enter..." />
        <DatePicker
        className="item"
        onSelectDate={preffStartDate}
        label="Preferred Start Date"
        value={preffStartDateUVal}
        strings={DayPickerStrings}
        placeholder="Select the Date..."
        ariaLabel="Select a date"
        disabled={disable}
      />
      <br></br><br></br>
      </div>
      
      
   </div>
   </Stack>
   <br></br>
    {disable?
    <div>
      <PrimaryButton  className="button" onClick={Post}>POST</PrimaryButton>
      <PrimaryButton  className="button" onClick={Edit}>EDIT</PrimaryButton>
    </div> :<PrimaryButton  className="button" onClick={Submit}>SUBMIT</PrimaryButton>}
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