import React from "react";
import { Link } from "react-router-dom";
import '../App.css'
import books from '../books.json'

class Search extends React.Component {

    constructor (props){
        super(props)
        console.log(books.length)
        this.state = {
            book_array: []
        }
    }

    search_book = (event) => {
        //let search_input = document.getElementById('Search')
        console.log(event.target.value)
        /**books.forEach(element => {
            console.log(element.title)
        });*/
        // let searched_books = books.filter(book=>{
        //     if(book.title.toUpperCase().indexOf(event.target.value.toUpperCase())>=0)
        //         {
        //             console.log(book.title.toUpperCase())
        //             console.log(book.title.toUpperCase().indexOf(event.target.value.toUpperCase()))
        //             return true
        //         }
        //     return false
        // })
        let searched_books = books.filter(book => (book.title.toUpperCase().indexOf(event.target.value.toUpperCase())>=0 || book.author.toUpperCase().indexOf(event.target.value.toUpperCase())>=0))
        // let searched_books = books.filter((book)=> {
        //     console.log(book.title)
        //     return book
        // })
        this.setState({book_array:searched_books})
        //console.log(searched_books)
        console.log(this.state.book_array)
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
    }

    Display_books = () =>{
        let books_div = this.state.book_array.map (book => {
            //console.log(book.title)
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
                    </select>
                </div>
            </>
        })
        //console.log("books_div: "+books_div)
        return books_div
    }

    Check_State = () => {
        if(this.state.book_array.length===0 && (document.getElementById('Search')==null || document.getElementById('Search').value===''))
            this.setState({book_array:books})
    }

    render()
    {
        return<>
            <div className="Search_bar">
                <Link to = "/react-probooks" className="LinktoHome">&#x2190;</Link>
                <input type="text" className="Search" id="Search" placeholder="Search by title or author...." onChange={this.search_book} />
            </div>
            <div className="Search_Display_Books">
                {this.Check_State()}
                <div className="NoOfBooksFound">{this.state.book_array.length} books found!</div>
                <div className="SoManyBooks">{this.Display_books()}</div>
            </div>
        </>
    }
}

export {Search};