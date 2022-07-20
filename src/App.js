import React from 'react';
import './App.css';
import axios from 'axios';
import BarChart from './Graficos/BarChart';
import PieChart from './Graficos/PieChart';
import PieChart2 from './Graficos/PieChart2'
import LineChart from './Graficos/LineChart';



export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      dataBar: [],
      dataPie: [],
      dataBar2: [],
      dataLine: [],
      dataPie2: [],
    }
  }




  fetchData(){
    axios.get(`http://localhost:3000/netflix/byyear`)
    .then(res => {
      this.setState({
        dataBar: res.data
    })
  })


    axios.get(` http://localhost:3000/netflix/bytype`)
    .then(res => {
      this.setState({
        dataPie: res.data
    })
    })

    axios.get(` http://localhost:3000/netflix/bycountry`)
    .then(res => {
      this.setState({
        dataBar2: res.data
    })
    })

    axios.get(` http://localhost:3000/netflix/bycat`)
    .then(res => {
      this.setState({
        dataPie2: res.data
    })
    })
    
    axios.get(` http://localhost:3000/netflix/byrelease`)
    .then(res => {
      this.setState({
        dataLine: res.data,
        loading: false
    })
    })

  }

  componentDidMount(){
    if(localStorage.length === 0){
    this.fetchData();
    }else{
      this.setState({
        dataBar: JSON.parse(localStorage.getItem("dataBar") || "[]"),
        dataPie: JSON.parse(localStorage.getItem("dataPie") || "[]"),
        dataBar2: JSON.parse(localStorage.getItem("dataBar2") || "[]"),
        dataLine: JSON.parse(localStorage.getItem("dataLine") || "[]"),
        dataPie2: JSON.parse(localStorage.getItem("dataPie2") || "[]"),
        loading: false
    })
    }

  }


render(){
 let { dataBar , dataPie , dataLine , dataBar2 , dataPie2 , loading } = this.state;
  
 let saveData = () => {
    localStorage.setItem("dataBar", JSON.stringify(this.state.dataBar));
    localStorage.setItem("dataPie", JSON.stringify(this.state.dataPie));
    localStorage.setItem("dataBar2", JSON.stringify(this.state.dataBar2));
    localStorage.setItem("dataPie2", JSON.stringify(this.state.dataPie2));
    localStorage.setItem("dataLine", JSON.stringify(this.state.dataLine));
    alert("Data saved!!")
  };

  let clearData = () => {
    alert("All data saved will be erased!!")
    localStorage.clear();
    this.fetchData();
  };


  if (this.state.loading) {
    return <div></div>;
}
  return (
    <div className="Container">
      <div className='sidebar'>
        <h2 className='title'>Dashboard Netflix</h2>
        <hr></hr>
        <div className='ContainerText'><h5 className='titleT'>Releases by year</h5></div>
        <div className='ContainerText'><h5 className='titleT'>Releases by type</h5></div>
        <div className='ContainerText'><h5 className='titleT'>Releases by Country (Top 17)</h5></div>
        <div className='ContainerText'><h5 className='titleT'>Production Year</h5></div>
        <div className='ContainerText'><h5 className='titleT'>Count by category (Top 15)</h5></div>
        <hr></hr>
        <button onClick={saveData} className="button-34" role="button">Save</button>
        <button onClick={clearData} className="button-34" role="button">Refresh</button>

      </div>
      <div className='containerGraphs'>
        <div className='containerGraphBar'><h4 className='titleG'>Releases by year</h4> <BarChart data={dataBar.data} /></div>  
        <div className='containerGraphBar'><h4 className='titleG'>Releases by type</h4>
        <PieChart
            data={dataPie.data}
            width={200}
            height={200}
            innerRadius={0}
            outerRadius={100}
            />
        </div>
        <div className='containerGraphBar'><h4 className='titleG'>Releases by Country (Top 17)</h4> <BarChart data={dataBar2.data} /></div>
        <div className='containerGraphLine'><h4 className='titleG'>Production Year</h4> <LineChart data={dataLine.data} width={600} height={300} /></div>
        <div className='containerGraphBar'><h4 className='titleG'>Count by category (Top 15)</h4>
        <PieChart2
            data={dataPie2.data}
            width={200}
            height={200}
            innerRadius={0}
            outerRadius={100}
            />
         </div>
      </div>
    </div>
   )
  }
}

