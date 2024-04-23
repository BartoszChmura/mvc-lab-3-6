class User {
    constructor(id, login, borrowedBooks = []) {
        this.id = id;
        this.login = login;
        this.borrowedBooks = borrowedBooks;
    }

    static getAll() {
        return users;
    }

    borrowBook(bookId) {
        this.borrowedBooks.push(bookId);
    }

    returnBook(bookId) {
        this.borrowedBooks = this.borrowedBooks.filter(id => id !== bookId);
    }

    findBorrowedBookById(bookId) {
        return this.borrowedBooks.includes(bookId);
    }

    static getById(id) {
        return users.find(user => user.id === id);
    }
}

const users = [
    new User(1, 'user1'),
    new User(2, 'user2'),
    new User(3, 'user3'),
    new User(4, 'user4'),
    new User(5, 'user5')
];

module.exports = User;
