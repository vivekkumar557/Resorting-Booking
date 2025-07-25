mapboxgl.accessToken = MapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 10 // starting zoom
});
console.log()
const marker = new mapboxgl.Marker({ color: 'black', rotation: 45 })
        .setLngLat(listing.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset:25})
        .setHTML(
            `<h5>${listing.location}</h5><p>Exact location will be provided after booking</p>`
        )
        .setMaxWidth("300px")
        )
        
        .addTo(map);
    