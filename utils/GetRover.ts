import axios from "axios";
import {apiKey} from "../routes/AllRoutes";

export default (req: any, res: any) => {
    const rover: string = req.params.rover;
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}?api_key=${apiKey}`;
    axios.get(url).then(
        (response: any) => {
            res.status(200).json(response.data);
        }
    )
}