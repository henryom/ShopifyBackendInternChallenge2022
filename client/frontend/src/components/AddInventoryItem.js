import React, {Fragment, useState} from "react"

const AddInventoryItem = () => {

    const [item, setItem] = useState({
        sku: '',
        name: '',
        quantity: 0,
    });

    function handleValueChange(evt) {
        const value = evt.target.value
        setItem({
            ...item,
            [evt.target.name]: value
        })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/inventory", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(item)
            });
            if (response.status == 201) {
                // reload window
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

    return (
        <Fragment>
            <h1>Add Item to Inventory</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type='text'
                    name='sku'
                    value={item.sku}
                    placeholder='SKU'
                    onChange={handleValueChange}
                />
                <input
                    type='text'
                    name='name'
                    value={item.name}
                    placeholder='Name'
                    onChange={handleValueChange}
                />
                <input
                    type='number'
                    name='quantity'
                    value={item.quantity}
                    placeholder='Quantity'
                    onChange={handleValueChange}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default AddInventoryItem