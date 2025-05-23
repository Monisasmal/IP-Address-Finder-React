import React from 'react'

const IpInfo = ({data}) => {
  return (
    <div className='info-box'>
      <p><strong>IP Address:</strong> {data.ip}</p>
      <p><strong>City:</strong>{data.city}</p>
      <p><strong>Area:</strong> {data.area || 'N/A'}</p>
      <p><strong>Region:</strong> {data.region}</p>
      <p><strong>Country:</strong> {data.country_name} ({data.country_code})</p>
      <p><strong>ISP:</strong> {data.org}</p>
      <p><strong>Timezone:</strong> {data.timezone}</p>
      <p><strong>Postal Code:</strong> {data.postal}</p>
      <p><strong>Calling Code:</strong> {data.country_calling_code}</p>
      <p><strong>Currency:</strong> {data.currency}</p>
    </div>
  )
}

export default IpInfo