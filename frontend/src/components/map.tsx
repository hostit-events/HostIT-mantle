import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '330px',
  borderRadius: '30px',
}

const center = {
  lat: -3.745,
  lng: -38.523,
}

function GooMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'infra-optics-459710-p6',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  })

  const [map, setMap] = React.useState(null)

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
    </GoogleMap>
  ) : (
    <></>
  )
}

export default React.memo(GooMap)