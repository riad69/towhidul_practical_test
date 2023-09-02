import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faFileExport, faMagnifyingGlass, faPlug, faPlus } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([]);
  const [dealStatusOne, setDealStatusOne] = useState([]);
  const [dealStatusOther, setDealStatusOther] = useState([]);
  const [column, setColumn] = useState(["Name", "Project Link", "Project Id", "Project Budget", "Bid Value", "Created", "Created By", "Bidding Delay Time", "Status"]);
  const [columList, setColumnList] = useState({
    
    name : true,
    projectLink : true,
    projectId : true,
    projectBudget : true,
    bidValue : true,
    created : true,
    createdBy : true,
    delayTime :true,
    status : true, 
  })
  const [list, setList] = useState(false)
  console.log("============", dealStatusOther)
  useEffect(() => {
   getAllLads()
  }, []);

 
const getAllLads = async () => {
  try {
    const response = await axios.get('https://seopage1erp.website/api/leads');

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = response.data;

    console.log(data);

    setData(data.data.slice(100));
    const last100 = data.data.slice(-100);

    const dealStatusOneArray = last100.filter(item => item.deal_status === 1);
    const dealStatusOtherArray = last100.filter(item => item.deal_status !== 1);

    setDealStatusOne(dealStatusOneArray);
    setDealStatusOther(dealStatusOtherArray);

    
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


const handleDragStart = (e, index) => {
  e.dataTransfer.setData('index', index);
};

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDrop = (e, targetIndex) => {
  e.preventDefault();
  const sourceIndex = e.dataTransfer.getData('index');

  // Create a copy of the data array
  const newData = [...data];

  // Swap the rows
  const [draggedItem] = newData.splice(sourceIndex, 1);
  newData.splice(targetIndex, 0, draggedItem);

  // Update state with the new order of rows
  setData(newData);
};

  const styles = {
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize : '10px',
    },
    th: {
      backgroundColor: '#f2f2f2',
      padding: '8px',
      textAlign: 'left',
    },
    td: {
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'left',
    },
    row: {
      backgroundColor: '#fff',
    },
    oddRow: {
      backgroundColor: '#f2f2f2',
    },
  };

const handleCheck = (e) => {
  if (e.target.value === columList.name){
    if(e.target.checked){
      columList.name = true
    }
    else{
      columList.name = false
    }
  }
}

  return (
    <>
      <p style={{fontSize : '14px', display : 'flex', alignItems : 'center', gap : '5%', marginLeft : '2.5%'}} ><p style={{fontWeight : 'bolder'}}>Leads</p> <span>Home <span>|| Leads</span></span></p>

      <div style={{display : 'flex', gap : '1%',justifyContent : 'space-evenly',  width : '50%', alignItems : 'center'}}>
        
        <p style={{fontSize : '14px'}}>Date</p>
        <p style={{fontSize : '14px'}}>Start Date To End Date</p>
        <p style={{fontSize : '14px', display : 'flex', gap: '10%'}}><p>Type</p> <span style={{display : 'flex', gap: '1%', alignItems : 'center'}}><p>All</p><FontAwesomeIcon icon={faCaretDown} /></span></p>
        <div style={{display : 'flex', alignItems : 'center'}}>
        <FontAwesomeIcon style={{height : '15px', width : '15px' ,padding : '12px 10px', backgroundColor : 'gray', color : 'white', marginRight : '-1%'}} icon={faMagnifyingGlass}/>
        <input style={{padding : '10px 20px'}} type="text" placeholder='Start Typing to search' />

        </div>
        
        
        </div>
        <div style={{display : 'flex', gap : '1%', marginBottom : '1%'}}>
                <button onClick={() => getAllLads()} style={{fontSize : '10px', padding : '10px 15px', border : 'none', borderRadius : '5px',color : 'white',  backgroundColor : '#38CC77', fontWeight : 'bold'}}><FontAwesomeIcon icon={faPlus}/> Add Lead</button>
                <button style={{fontSize : '10px', padding : '10px 15px', border : '1px solid #38CC77', borderRadius : '5px',color : '#38CC77',   backgroundColor : 'transparent', fontWeight : 'bold'}}><FontAwesomeIcon icon={faFileExport}/> Export</button>
              </div>
      <div></div>
        <button style={{fontSize : '10px', padding : '10px 15px', border : '1px solid #38CC77', borderRadius : '5px',color : '#38CC77',   backgroundColor : 'transparent', fontWeight : 'bold'}}  onClick={()=> setList(true)}>Select Columns</button>

      <div style={{maxHeight : '250px',overflow : 'auto'}}>
         {list?<div style={{position : 'absolute', background : 'white', padding : '5px 5px'}}>     
        {column.map(item => 

 <p><input value={item} onChange={(e) => handleCheck(e)} type="checkbox" /> 
          {item}</p>
       
      )}   

</div>: null}
              <div class="table-container"  onClick={() => setList(false)}>
              <table style={styles.table}>
      <thead>
        <tr>
          
            <th  style={styles.th}>
             <input type="checkbox" name="" id="" />
            </th>

            {columList.name?<th  style={styles.th}>
             <p>name</p>
            </th> : null}

            <th  style={styles.th}>
             <p>Project Link</p>
            </th>

            <th  style={styles.th}>
             <p>Project Id</p>
            </th>

            <th  style={styles.th}>
             <p>Project Budget</p>
            </th>

            <th  style={styles.th}>
             <p>Bid Value</p>
            </th>

            <th  style={styles.th}>
             <p>Created</p>
            </th>

            <th  style={styles.th}>
             <p>Created By</p>
            </th>

            <th  style={styles.th}>
             <p>Bidding Delay Time</p>
            </th>

            <th  style={styles.th}>
             <p>Status</p>
            </th>
  
        </tr>
      </thead>
      <tbody style={{maxHeight : '250px',overflow : 'auto'}}>
      
         {data?.map((item, key) => <tr draggable
              onDragStart={(e) => handleDragStart(e, key)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, key)} key={key}  style={ styles.row }>
            
              <td  style={styles.td}>
                <div style={{display : 'flex', gap : '1%', alignItems : 'center'}}>

                <input type="checkbox" name="" id="" />
              <p>{key+1}</p>
                </div>
              
              </td>

              <td  style={styles.td}>
                <p>{item.client_name.slice(0,15)}...</p>
              </td>

              <td  style={styles.td}>
                <p>{item.project_link.slice(0,15)}...</p>
              </td>

              <td  style={styles.td}>
                <p>{item.id}</p>
              </td>
              

              <td  style={styles.td}>
                <p>{item.actual_value}$</p>
              </td>


              
              <td  style={styles.td}>
                <p>{item.bid_value}$ - {item.bid_value2}$</p>
              </td>

              
              <td  style={styles.td}>
                <p>{item.deadline}</p>
              </td>

              
              <td  style={styles.td}>
                <div style={{display : 'flex', gap : '2%', alignItems : 'center'}}>
                <img style={{height : '14px', width : '14px', borderRadius : '50%'}} src={item.image_url} alt="" />
                <p>{item.added_by}</p>

                </div>
              </td>

              
              <td  style={styles.td}>
                <p>{item.bidding_minutes} mins {item.bidding_seconds} seconds</p>
              </td>

              
              <td  style={styles.td}>
                <p style={{padding : '2px 2px', color : 'white', fontSize : '10px',borderRadius : '5px',textAlign : 'center', backgroundColor : `${item.deal_status===1? 'green' : 'red'}`}}>{item.deal_status===1? "Converted To Deal" : "Not Converted to Deal"}</p>
              </td>
          
          </tr>)}
   
      </tbody>
    </table>
</div>

        </div>

   <div style={{width : '80%', margin : '2% auto'}}>

  <AreaChart
          width={500}
          height={200}
          data={dealStatusOther}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey="deal_status" />
        <YAxis dataKey="deal_status"/>
          <Area type="monotone" dataKey="deal_status" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
 
        </div>

      
    </>
  )
}

export default App
