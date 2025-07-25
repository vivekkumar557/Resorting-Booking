require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initdata = require("./data.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const geocodingClient = mbxGeocoding({ accessToken:"pk.eyJ1IjoibW9vbGFwcmF2YWxlc2gtMTkiLCJhIjoiY204NWtlOTRnMDUxbjJtc2NqNm5ncGkydyJ9.mljnW8uSRzh4fgYygK46dg" });

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main().then(() => {
//     console.log("connected DB");
// })
// .catch((err) => {
//     console.log(err);
// });

// async function main() {
//     await mongoose.connect(MONGO_URL);
// }
const dburl="mongodb+srv://pravaleshkumar2:Reazwe6N4WRSf9XY@cluster0.apuif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// main()
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }
mongoose.connect(dburl);

const initDB = async () => {
    await Listing.deleteMany({});

    // Loop through each listing to add geo-location coordinates
    for (let obj of initdata.data) {
        let response = await geocodingClient.forwardGeocode({
            query: obj.location,
            limit: 1
        }).send();

        // Add geometry coordinates to the listing object
        obj.geometry = response.body.features[0].geometry;

        // Set the owner (you can replace this with the actual owner ID)
        obj.owner = "6843bef1ad49cc4a5123a184";
    }

    await Listing.insertMany(initdata.data);
    console.log("data saved");
}

initDB();
