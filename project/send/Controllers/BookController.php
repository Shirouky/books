<?php

namespace App\Http\Controllers;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function all(){
        $books = Book::all();

        return $books;
    }

    public function add(Request $request){
        $book = new Book;
        $book->title = $request->title;
        $book->author = $request->author;
        $book->availability = true;
        $book->save();
        $books = Book::all();
    
        return $books;
    }

    public function delete($id){
        Book::where('id', $id)->delete();
        $books = Book::all();
        return $books;
    }


    public function change_availability($id){
        $book = Book::where('id', $id)->first();

        $book->availability = !$book->availability;
        $book->save();
        $books = Book::all();
        return $books;
    }
}
