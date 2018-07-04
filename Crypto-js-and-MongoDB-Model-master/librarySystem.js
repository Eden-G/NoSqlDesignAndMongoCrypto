const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

//Person Model
class Person{
    constructor(name,email){
        this.name = name;
        this.email = email;
    }
    getName(){
        return this.name;
    }
    getEmail(){
        return this.email;
    }
}
//Book Model
class Book{
    constructor(isbn,author,tags){
        this.isbn = isbn;
        this.author = author;
        this.tags = tags;
        this.borrowed = null;
    }
    changeBorrowed(borrow){
        this.borrowed = borrow;
        //borrow.changeBook(this);
    }
}
//Borrowed Book model
class BorrowedBook{
    constructor(student,borrowedDate,dueDate){
        this.student=student;
        this.borrowedDate = borrowedDate;
        this.dueDate = dueDate;

    }
    changeBook(book){
        this.book = book;
    }
}


//create db connection using the connect method of MongoClient instance
MongoClient.connect(url,{ useNewUrlParser: true}, (err,db)=>{
    if(err) throw err;
    console.log('db connection successful');
    var dbo = db.db('library'); 
//let's create sample author,student, book objects and set the book object as borrowed by the student
    var author = new Person('Think and Grow Rich','nhill@gmail.com');
    var stu = new Person('Eden Gebrehanna','egebrehanna@mum.edu');
    var bDate = new Date(2018,6,2);
    var dueDate = new Date(2018,7,2);
    var borrowedbk = new BorrowedBook(stu,bDate,dueDate);
    var tags = ['The law of Success','Think & Grow','Persistence'];
    var book = new Book('54321',author,tags);
    book.changeBorrowed(borrowedbk);
    var obj ={book:book};
//=============================================================================
    dbo.collection('books').insertOne(obj,(err,result)=>{
        if(err) throw err;
        console.log('book added successfully');
    });

    db.close();
});