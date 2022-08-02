import React from "react";
import { Link, Outlet } from "react-router-dom";
import '../App.css'
import books from '../books.json'

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            change: 0
        }
    }

    Update_Json = (event) => {
        let book_id = event.target.id.substring(6)
        books.forEach(element => {
            if(element.id===book_id)
                element.type=event.target.value
        });
        books.forEach(element => {
            console.log(element)
        });

        //console.log(this.state.change)
        this.setState({change: 1})
        //this.Display_books()
    }

    Display_books = (type) =>{
        //console.log("Display_books called")
        //let type = event.target.id
        console.log("Type" + type)
        let books_div = books.map (book => {

            if (type===book.type)
            return <>
                <div className="Book_List">
                    <img src={book.image} alt={book.title+" Image not found"} />
                    <div className="Book_Name">{book.title}</div>
                    <div>{book.author}</div>
                    <select className="Move_to" id={"Change"+book.id} onChange={this.Update_Json}>
                        <option value = "" selected disabled hidden>&#x25BC;</option>
                        <option value = "All">Move to....</option>
                        <option value = "Read">Read &#128214;</option>
                        <option value = "Like">Like &#128077;</option>
                        <option value = "Dislike">Dislike &#128078;</option>
                        <option value = "All">Delete &#10060;</option>
                    </select>
                </div>
            </>
            else return <></>
        })
        //console.log("books_div: "+books_div)
        return books_div
    }

    render() {
        console.log("Render of home called" + this.state.change)
        return <>
            <div className="Probook_Heading">
                <h1>ProBook</h1>
            </div>
            <div className="Home_div">
                <h2>Reading</h2>
                <div className="SoManyBooks" id="SMB_home">{this.Display_books("Read")}</div>
            </div>
            <div className="Home_div SMB_home">
                <h2>Like</h2>
                <div className="SoManyBooks" id="SMB_home">{this.Display_books("Like")}</div>
            </div>
            <div className="Home_div">
                <h2>Dislike</h2>
                <div className="SoManyBooks" id="SMB_home">{this.Display_books("Dislike")}</div>
            </div>
            <div className="Search_Link"> <Link to='/react-probooks/search' className="LinktoSearch">  +  </Link><Outlet/></div>
        </>
    }
}

export {Home}
