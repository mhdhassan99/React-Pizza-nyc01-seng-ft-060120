import React from "react"

const Pizza = (props) => {
  return(
    <tr>
      <td>{props.pizza.topping}</td>
      <td>{props.pizza.size}</td>
      {props.pizza.vegetarian ? <td>yes</td> : <td>no</td>}
      <td><button onClick={(e) => props.editHandler(e, props.pizza)} type="button" className="btn btn-primary">Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
