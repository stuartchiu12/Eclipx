<template>
    <div>
      <input id="box" type="text">
      <div id="googleMap"></div>
    </div>
</template>

<script>
export default {

  name: 'MapComponent',
  data () {
    return {
      crd: null,
      map: null,
      autocomplete: null,
      APIKEY: process.env.VUE_APP_API_KEY
    }
  },
  props: {

  },
  mounted () {
    // load google api script
    const scriptElement = document.createElement('script')
    scriptElement.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${this.APIKEY}&libraries=places`)
    document.head.appendChild(scriptElement)

    scriptElement.addEventListener('load', () => {
      const positionOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
      // load current position
      navigator.geolocation.getCurrentPosition(this.success, null, positionOptions)

      const input = document.getElementById('box')
      const options = {
        types: [],
        componentRestrictions: { country: 'au' }
      }
      // wire up autocomplete address bar
      this.autocomplete = new google.maps.places.Autocomplete(input, options)
      this.autocomplete.addListener('place_changed', this.fillinAddress)
    })
  },
  methods: {
    success (pos) {
      this.crd = pos.coords

      const mapProp = {
        center: new google.maps.LatLng(this.crd.latitude, this.crd.longitude), // puts your current location at the centre of the map,
        zoom: 15,
        mapTypeId: 'roadmap'
      }

      this.map = new google.maps.Map(document.getElementById('googleMap'), mapProp)
    },
    fillinAddress (place) {
      const location = this.autocomplete.getPlace()

      const directionService = new google.maps.DirectionsService()
      const directionsRenderer = new google.maps.DirectionsRenderer()
      directionsRenderer.setMap(this.map)
      const request = {
        origin: new google.maps.LatLng(this.crd.latitude, this.crd.longitude),
        destination: { placeId: location.place_id },
        travelMode: 'DRIVING'
      }
      // when address is changed, set a route from current location to the destination
      directionService.route(request, (response, status) => {
        directionsRenderer.setDirections(response)
      })
    }
  }
}
</script>

<style scoped>
  #googleMap{
    width: 800px;
    height: 600px;
    margin: 0 auto;
  }
  #box{
    width: 800px;
  }
</style>
