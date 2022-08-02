import './App.css';
import React from 'react';
import axios from 'axios';
import books from './books.json';
import { Home } from './components/home';
import { Search } from './components/search';
import { 
  BrowserRouter,
  Routes,
  Route,
}from "react-router-dom";

class App extends React.Component {

  Get_Books = () => {
    if (books.length>0)
      return
    let api = "https://reactnd-books-api.udacity.com/books"
    let token;
    //token
    if (!token)
      token = localStorage.token = Math.random().toString(36).substr(-8)
    //headers
    const headers = {
    'Accept': 'application/json',
    'Authorization': token
    }
    axios.get (api, {headers})
    .then(res => {
      //console.log(res.data.books)
      //books=[]
      //console.log(books)
      console.log("Response length: " +res.data.books.length)
      res.data.books.forEach(book => {
          let obj = {id: book.id, title: book.title, author: book.authors[0], image: book.imageLinks.thumbnail, type: "All" }
          console.log("Book length: " +books.length)
          books.push(obj)
      });
      //console.log("Reading from books.json")
      //console.log(books)
      // books.forEach(book => {
      //     console.log(book);  
      // });
    })
    .catch (err=> {
      console.log(err)
    })
  }

  render () {
    console.log("Render Called")
    return <> 
      <this.Get_Books/>
      <BrowserRouter>
        <Routes>
          <Route path="react-probooks" element={<Home/>}/>
          <Route path="react-probooks/search" element={<Search/>}/>
          <Route path="*" element={<h1>No Page Found</h1>}/>
        </Routes>
      </BrowserRouter>
      </>
  }

}

export default App;
