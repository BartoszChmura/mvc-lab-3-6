const Book = require('../models/Book');
const User = require('../models/User');


const getBooksList = (req, res) => {
    const userId = req.session.userId;
    const books = Book.getAll();
    res.render("books", {
        title: "Books",
        userId: userId,
        books: books
    });
};

const getBookDetails = (req, res) => {
    const userId = req.session.userId;
    const bookId = req.params.id;
    console.log("Book ID:", bookId);
    const book = Book.getById(bookId);
    console.log("Book:", book);
    const user = User.getById(userId);
    const didUserBorrowTheBook = user ? user.findBorrowedBookById(bookId) : false;
    res.render('book-details', {
        title: `${book ? book.title : 'Unknown'} Details`,
        book: book,
        didUserBorrowTheBook: didUserBorrowTheBook
    });
};



const postBookBorrow = (req, res) => {
    const userId = req.session.userId;
    const bookId = req.params.id;
    const user = User.getById(userId);
    if (user && !user.findBorrowedBookById(bookId)) {
        user.borrowBook(bookId);
        Book.borrow(bookId);
        res.redirect('/books/borrow/success');
    } else {
        res.status(404).send("Book not found or user cannot borrow this book.");
    }
};

const getBookBorrowSuccess = (req, res) => {
    res.render('success', {
        title: 'Borrow Success',
        message: 'Book borrowed successfully'
    });
};

const postBookReturn = (req, res) => {
    const userId = req.session.userId;
    const bookId = req.params.id;
    const user = User.getById(userId);
    if (user && user.findBorrowedBookById(bookId)) {
        user.returnBook(bookId);
        Book.return(bookId);
        res.redirect('/books/return/success');
    } else {
        res.status(404).send("Book not found or user cannot return this book.");
    }
};

const getBookReturnSuccess = (req, res) => {
    res.render('success', {
        title: 'Return Success',
        message: 'Book returned successfully'
    });
};

module.exports = {
    getBooksList,
    getBookDetails,
    postBookBorrow,
    getBookBorrowSuccess,
    postBookReturn,
    getBookReturnSuccess
};
