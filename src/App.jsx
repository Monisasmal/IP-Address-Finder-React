import React, { useEffect, useState } from 'react'
import IpInfo from './component/IpInfo';
import MapView from './component/MapView';
import './App.css'

const App = () => {

  const[ipData,setIpData] = useState(null);
  const[searchIp,setSearchIp] = useState("");
   
  const fetchIP = async(ip='') =>{
    try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();

    if (!data.latitude || !data.longitude) {
      alert("Invalid IP address or domain. Please try again.");
      return;
    }

    setIpData(data);
  } catch (error) {
    console.error("Failed to fetch IP data:", error);
    alert("Something went wrong while fetching IP information.");
  }
  }

  useEffect(()=>{
  fetchIP();
  },[]);

  const handleSearch = () =>{
    if(searchIp.trim() !== '') fetchIP(searchIp);
  }

  

  const handleMarkerDrag = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=0a0790ba738f46b1bed1dbb0e91b8764`
    );
    const data = await res.json();
    const place = data.results[0];

    setIpData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      area: place.components.suburb || place.components.neighbourhood || place.components.hamlet || place.components.locality || '',
      city: place.components.city || place.components.town || place.components.village || '',
      region: place.components.state || '',
      country: place.components.country || '',
      country_code: place.components.country_code || '',
      postal: place.components.postcode || '',
      timezone: place.annotations.timezone.name || '',
      currency: place.annotations.currency.name || '',
      calling_code: place.annotations.calling_code || '',
      org: 'N/A (dragged manually)', 
    }));
  } catch (err) {
    console.error('Failed to fetch location info:', err);
  }
};


  return (
    <div className="container">
       <h1>🌐 IP Address Finder</h1>
       <div className="input-box">
        <input type='text'  placeholder='Enter IP address like 8.8.8.8 or 1.1.1.1' value={searchIp} onChange={(e) => setSearchIp(e.target.value) }/>
        <button onClick={handleSearch}>Search</button>
       </div>
       {ipData && ipData.latitude && ipData.longitude && (
        <>
        <IpInfo data={ipData}/>
        <MapView lat={ipData.latitude} lon = {ipData.longitude} onDragMarker={handleMarkerDrag}/>
        </>
       )}
    </div>
  )
}

export default App