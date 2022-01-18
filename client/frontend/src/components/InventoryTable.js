import React, {Fragment, useEffect, useState} from "react";

const InventoryTable = () => {

    const [inventory, setInventory] = useState([])

    const getInventory = async () => {
        try {
            const response = await fetch("http://localhost:3000/inventory")
            const jsonData = await response.json()
            console.log(jsonData)
            setInventory(jsonData)
        } catch (err) {
            console.log(err.message)
        }
    }

    const deleteItem = async (sku) => {
        try {
            const response = await fetch("http://localhost:3000/inventory", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    "sku": sku
                })
            });
            if (response.status == 200) {
                // reload window
                window.location = "/";
            } else {
                // there was an error, probably with user input, alert user
                alert(await response.text())
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const modifyQuantity = async (sku, new_quantity) => {
        try {
            const response = await fetch("http://localhost:3000/inventory/quantity", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    "sku": sku,
                    "new_quantity": new_quantity
                })
            });
            if (response.status == 201) {
                // reload window to show new quantity
                window.location = "/";
            } else {
                // there was an error, probably with user input, alert user
                // console.log(await response)
                alert(await response.text())
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const saveToCSV = () => {
        // this line creates the data inside the csv file
        // the constant includes filetype, charset and a header row
        // each item is then turned into a row and the rows are joined with a newline character
        let fileData = "data:text/csv;charset=utf,Stock-Keeping Unit,Name,Quantity\n" + inventory.map(item => item.sku + ',' + item.name + ',' + item.quantity).join("\n")
        var encodedURI = encodeURI(fileData)
        var link = document.createElement("a");
        link.setAttribute("href", encodedURI)
        link.setAttribute("download", "inventory.csv")
        link.click()
    }
    
    // load inventory
    useEffect(() => {
        getInventory();
    }, [])

    // if there are no items, let the user know
    if (inventory.length == 0){
        return(
            <h1>No Inventory.  Please add a new item</h1>
        )
    }

    return(
        <Fragment>
            <table>
                <thead>
                    <tr>
                        <th scope="col">SKU</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map(item => (
                        <tr key={item.sku}>
                            <td>
                                {item.sku}
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                <button onClick={() => modifyQuantity(item.sku, item.quantity - 1)}>-</button>
                                {item.quantity}
                                <button onClick={() => modifyQuantity(item.sku, item.quantity + 1)}>+</button>
                            </td>
                            <td><button onClick={() => deleteItem(item.sku)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => saveToCSV()}>Save to CSV</button>
        </Fragment>
    )
}

export default InventoryTable