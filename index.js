//home-work 4.8.2024 node class 

const express = require("express")

const app = express()

app.get("/home-work", (request, response, next) => {
    console.log(request.ip)
    return response.send("Good Job!")
})

const carsArray =
{
    "cars": [
        {
            "brand": "Mercedes-Benz",
            "model": "Citan",
            "car body": "van",
            "color": "red",
            "price": "10000$",
            "year": 2010
        },
        {
            "brand": "Lexus",
            "model": "GX",
            "car body": "4WD",
            "color": "black",
            "price": "50000$",
            "year": 2020
        },
        {
            "brand": "Toyota",
            "model": "RAV4",
            "car body": "crossover",
            "color": "gray",
            "price": "15000$",
            "year": 2015
        },
        {
            "brand": "Hyundai",
            "model": "Grand i10 Nios",
            "car body": "hatchback",
            "color": "yellow",
            "price": "30000$",
            "year": 2018
        },
        {
            "brand": "Honda",
            "model": "Civic",
            "car body": "sedan",
            "color": "blue",
            "price": "25000$",
            "year": 2010
        }
    ]
}

app.get("/cars", (req, res, next) => {
    return res.json(carsArray)
})
app.get("/cars/:color", (req, res, next) => {
    const color = req.params.color.toLowerCase();
    const carsWithColor = carsArray.cars.filter(car => car.color.toLowerCase() === color);

    if (carsWithColor.length > 0) {
        return res.json(carsWithColor);
    } else {
        return res.send("Color not found");
    }
});

app.get("/car-by-model", (req, res, next) => {
    const brand = req?.query?.brand
    const findCar = carsArray.cars.find(c => c.brand.toLowerCase() === brand.toLowerCase())
    if (findCar) {
        return res.json(findCar)
    } else {
        return res.send("Car not found")
    }
})

app.get("/car-by-price", (req, res, next) => {
    const price = Number(req.query.price);
    if (isNaN(price)) {
        return res.status(400).send("Invalid price");
    }

    const carsUnderPrice = carsArray.cars.filter(car => {
        const carPrice = Number(car.price.replace('$', ''));
        return carPrice < price;
    });

    if (carsUnderPrice.length > 0) {
        return res.json(carsUnderPrice);
    } else {
        return res.send("No cars found under the specified price");
    }
});


app.listen(4500, () => {
    console.log("Listening to PORT, API Is working 4500")
})

