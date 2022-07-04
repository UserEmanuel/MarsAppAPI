const express = require('express');
const axios = require('axios');
const app = express();

const port = 8000;
const apiKey = "Wh86axhwknRarFVsxMCdzNBkHXryZ47hE9VaokvI";

app.use(express.json());
const router = express.Router();
app.use('/', router);

enum Camera {
    FHAZ = "FHAZ",
    NAVCAM = "NAVCAM",
    MAST = "MAST",
    CHEMCAM = "CHEMCAM",
    MAHLI = "MAHLI",
    MARDI = "MARDI",
    RHAZ = "RHAZ",
}

interface IPhotoArray {
    photos: [IPhoto];
}

interface IPhoto {
    id:         number,
    sol:        number,
    camera:     ICamera,
    img_src:    string,
    earth_date: string,
    rover:      IPhotoRover,
}

interface ICamera {
    id:         number,
    name:       Camera,
    rover_id:   number,
    full_name:  string,
}

interface IPhotoRover {
    id:             number,
    name:           string,
    landing_date:   string,
    launch_date:    string,
    status:         string,
}

interface IRover {
    id:             number,
    name:           string,
    landing_date:   string;
    launch_date:    string,
    status:         string,
    max_sol:        number,
    max_date:       string,
    total_photos:   number;
    cameras:        [ICamera];
}

function getRoverData(rover: IRover): string {
    let data: string = `Id: ${rover.id}<br>Name: ${rover.name}<br>Cameras:<br>`;
    data += `[${rover.cameras.map((camera: ICamera) => camera.name).join(', ')}]<br>`;
    return data;
}

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
})

app.get('/test', (req: any, res: any) => res.send('Hello world !'));

app.get('/photos/rover/:rover/camera/:camera/sol/:sol', (req: any, res: any) => {
    const params = req.params;
    const sol: string = params.sol;
    const rover: string = params.rover;
    const camera: string = params.camera;
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${apiKey}&camera=${camera}`;
    axios.get(url).then(
        (response: any) => {
            let html: string = "";
            response.data.photos.forEach((photo: IPhoto) => {
                const id: number = photo.id;
                const img_src: string = photo.img_src;
                html += `id: ${id}<br><img src="${img_src}" alt="Mars Rover Photo"><br>`;
            });
            res.send(html);
        }
    ).catch(() => console.error("Error"));
});

app.get('/rover/:rover', (req: any, res: any) => {
    const rover: string = req.params.rover;
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}?api_key=${apiKey}`;
    axios.get(url).then(
        (response: any) => {
            let html: string = `<p>Data for rover "${rover}:"</p><br>${getRoverData(response.data.rover)}<br>`;
            res.send(html);
        }
    )
});

app.get('/allrovers', (req: any, res: any) => {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=${apiKey}`;
    axios.get(url).then(
        (response: any) => {
            let html: string = "<p>List of all rovers</p><br>";
            response.data.rovers.forEach((rover: IRover) => html += getRoverData(rover) + "<br>");
            res.send(html);
        }
    )
});
