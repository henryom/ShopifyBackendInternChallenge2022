const express = require('express')

const app = express()
const cors = require("cors")

// middleware
app.use(cors())
app.use(express.json())
const port = 3000
/*
    In order to make evaluating my submission easy to set up, I am using a dictionary to track inventory.
    This program persists the dictionary to disk when it is saved.
    In a real world application, I would use a SQL database for this task,
    as I did in my group project bidoff (https://github.com/chasebrownn/bidoff).
*/

// store inventory
var inventory = {};

// TODO: add load from file functionality

// get all items
app.get('/inventory', (req, res) => {
    res.send(Object.values(inventory))
})

// add a new item
// 1 must have a unique Stock Keeping Unit (SKU)
// 2 must have a name
// 3 must have a quantity >= 0
app.post('/inventory', (req, res) => {
    const { sku, name, quantity } = req.body;
    // quantity_int = parseInt(quantity)
    // 1
    if (sku in inventory){
        res.status(400)
        res.send('Error: SKU already exists')
        return
    }

    // 2
    if (!name) {
        res.status(400)
        res.send('Error: Item must have a name')
        return
    }

    // 3
    if (quantity < 0){
        res.status(400)
        res.send('Error: Quantity must be >= 0')
        return
    }
    
    // no error, add item to inventory
    inventory[sku] = {sku, name, quantity}

    res.status(201)
    res.send('Success')
})


// delete an inventory item
// 1 must be a value SKU to delete
app.delete('/inventory', (req, res) => {
    const { sku } = req.body

    // 1
    if (!(sku in inventory)) {
        res.status(400)
        res.send('Error: SKU does not exist')
        return
    }

    delete inventory[sku]
    res.status(200)
    res.send('Success')
})

// update item quantity
// 1 must be a valid SKU
// 2 new quantity must be >= 0
app.put('/inventory/quantity', (req, res) => {
    const { sku, new_quantity } = req.body;
    
    // 1
    if (!(sku in inventory)){
        res.status(400)
        res.send('Error: SKU does not exist')
        return
    }

    // 2
    if (new_quantity < 0) {
        res.status(400)
        res.send('Error: Quantity must be >= 0')
        return
    }
    
    // no error, update quantity
    inventory[sku].quantity = new_quantity

    res.status(201)
    res.send('Success')
})

// update item name
// * must be a valid SKU
// * must have a new name
app.put('/inventory/name', (req, res) => {
    const { sku, new_name } = req.body;
    
    // 1
    if (!(sku in inventory)){
        res.status(400)
        res.send('Error: SKU does not exist')
        return
    }

    // 2
    if (!new_name) {
        res.status(400)
        res.send('Error: Quantity must be >= 0')
        return
    }
    
    // no error, update quantity
    inventory[sku].name = new_name

    res.status(201)
    res.send('Success')
})

// TODO: add save to file functionality

app.listen(port, () => {
    console.log(`Server Started on port localhost:${port}`)
})