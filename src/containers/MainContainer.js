import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state={
    stocks:[],
    portfolio:[],
    displayStocks:[]
  }

  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(resp =>resp.json())
    .then(stocks => this.setState({stocks:stocks, displayStocks:stocks}))
  }

  clickHandler = (event) => {
    
    event.myPort ? this.deleteStock(event.stock) : this.addStock(event.stock)
  }

  deleteStock = (stock) => {
    const newArray = this.state.portfolio.filter(s => s !== stock)
    this.setState({portfolio:newArray})
  }

  addStock = (stock) =>{
    this.state.portfolio.includes(stock) ? null : this.setState({portfolio:[...this.state.portfolio, stock]})
  }

  filterStocks = (filter) =>{
    filter === "All" ?
    this.setState({displayStocks: this.state.stocks}):
    this.setState({displayStocks: this.state.stocks.filter(stock => stock.type === filter)})
  }

  sortStocks = (sortType) => {
    // debugger
    let newArray = []
    switch(sortType){
      case "Alphabetically":
          newArray = this.state.displayStocks.sort((a,b) => a.name > b.name ? 1 : -1)
        break
      case "Price":
          newArray = this.state.displayStocks.sort((a,b) => a.price > b.price ? 1 : -1)
        break
    }
    // console.log(newArray)
    this.setState({displayStocks: newArray})
  }

  render() {
    return (
      <div>
        <SearchBar
          filterStocks={this.filterStocks}
          sortStocks={this.sortStocks}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer 
                stocks={this.state.displayStocks}
                clickHandler={this.clickHandler}
              
              />

            </div>
            <div className="col-4">

              <PortfolioContainer 
                stocks={this.state.portfolio} 
                clickHandler={this.clickHandler}
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
