import axios from "axios";
import {apiKey} from "../routes/AllRoutes";

export default (req: any, res: any) => {
    const params = req.params;
    const sol: string = params.sol;
    const rover: string = params.rover;
    const camera: string = params.camera;
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${apiKey}&camera=${camera}`;
    axios.get(url).then(
        (response: any) => {
            res.status(200).json(response.data);
        }
    ).catch(() => console.error("Error"));
}
