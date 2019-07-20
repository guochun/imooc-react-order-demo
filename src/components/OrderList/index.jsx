import React, { Component } from 'react';
import OrderItem from "../OrderItem";

class OrderList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    fetch('/api/order.json').then(res => {
      if(res.ok) return res.json()
      return null
    }).then(data => {
      this.setState({data})
    })
  }

  onSubmit(id,comment,stars) {
    const data = this.state.data.map(item => {
      return id === item.id ? 
        {...item,comment,stars,isCommented: true} : item
    })
    this.setState({data})
  }

  render() {
    return (
      <div>
        {
          this.state.data.map( item => {
            return <OrderItem key={item.id} data={item} onSubmit={this.onSubmit} />
          })
        }
      </div>
    );
  }
}

export default OrderList;