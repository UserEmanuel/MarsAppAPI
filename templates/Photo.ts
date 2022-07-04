import Camera from "./Camera";
import PhotoRover from "./PhotoRover";

export default interface Photo {
    id?:            number,
    sol?:           number,
    camera?:        Camera,
    img_src:        string,
    earth_date?:    string,
    rover?:         PhotoRover,
}