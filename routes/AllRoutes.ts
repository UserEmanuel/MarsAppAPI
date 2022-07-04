import test from "../utils/Test";
import getPhoto from "../utils/GetPhoto";
import getRover from "../utils/GetRover";
import getAllRovers from "../utils/GetAllRovers";

const port = 8000;
export const apiKey = "Wh86axhwknRarFVsxMCdzNBkHXryZ47hE9VaokvI";

const express = require('express');

export const app = express();
app.use(express.json());

const router = express.Router();
app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});

app.get('/test', test);
app.get('/photos/rover/:rover/camera/:camera/sol/:sol', getPhoto);
app.get('/rover/:rover', getRover);
app.get('/allrovers', getAllRovers);
