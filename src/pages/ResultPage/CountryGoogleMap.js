import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";

export default function CountryGoogleMap({style, center, zoom = 1}) {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <GoogleMap mapContainerStyle={style} center={center} zoom={zoom}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
