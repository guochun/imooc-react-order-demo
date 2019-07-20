import React, { Component, Fragment } from "react";
import "./styles.css";

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: props.data.comment || "",
      editing: false,
      stars: props.data.stars || 0
    };
    this.handleOpenComment = this.handleOpenComment.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCancelComment = this.handleCancelComment.bind(this);
    this.handleSumbitComment = this.handleSumbitComment.bind(this);
  }

  render() {
    const { shopImgSrc, product, shop, price, isCommented } = this.props.data;

    return (
      <Fragment>
        <div className="orderItem">
          <div className="orderItem__imgContainer">
            <img className="orderItem__img" src={shopImgSrc} alt="" />
          </div>
          <div className="orderItem__content">
            <div className="orderItem__product">{product}</div>
            <div className="orderItem__shop">{shop}</div>
            <div className="orderItem__detail">
              <div className="orderItem__price">{price}</div>
              <div>
                <button
                 
                  onClick={this.handleOpenComment}
                  className={`orderItem__btn orderItem__btn--${
                    isCommented ? "grey" : "red"
                  }`}
                >
                  评价
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.state.editing && this.comment()}
      </Fragment>
    );
  }

  handleOpenComment() {
    this.setState({
      editing: true
    });
  }

  handleCommentChange(e) {
    this.setState({
      comment: e.target.value
    });
  }

  handleStarClick(index) {
    this.setState({
      stars: index
    });
  }

  handleCancelComment() {
    this.setState({
      editing: false,
      comment: this.props.data.comment || "",
      stars: this.props.data.stars || 0
    });
  }

  handleSumbitComment() {
    const { id } = this.props.data;
    const { comment, stars } = this.state;
    this.setState({
      editing: false
    });
    this.props.onSubmit(id, comment, stars);
  }

  comment() {
    return (
      <div className="orderItem__commentContainer">
        <textarea
          value={this.state.comment}
          onChange={this.handleCommentChange}
          className="orderItem__comment"
        />
        {this.stars()}
        <button
          className="orderItem__btn orderItem__btn--red"
          onClick={this.handleSumbitComment}
        >
          提交
        </button>
        <button
          className="orderItem__btn orderItem__btn--gray"
          onClick={this.handleCancelComment}
        >
          取消
        </button>
      </div>
    );
  }

  stars() {
    const { stars } = this.state;
    return (
      <div>
        {Array.from({ length: 5 }, (_, index) => index + 1).map(
          (item, index) => {
            const light = stars >= item ? "orderItem__star--light" : "";
            return (
              <span
                style={{ fontSize: "20px", cursor: "pointer" }}
                className={light}
                key={index}
                onClick={this.handleStarClick.bind(this, item)}
              >
                ★
              </span>
            );
          }
        )}
      </div>
    );
  }
}

export default OrderItem;
