class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book){
    const list = document.getElementById("book-list");
    // Create tr element
    const row = document.createElement("tr");
    // Inster cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
    
    list.appendChild(row);
  }

  showAlert(msg, className){
    // Create div
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(msg));
    // Get parent
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    // Instert alert
    container.insertBefore(div, form);

    // Timeout after 3 seconds
    setTimeout(function(){
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target, ui){
    if(target.className === "delete"){
      target.parentElement.parentElement.remove();
      // Show message
      ui.showAlert("Book removed", "success");
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Event Listener for add btn
document.getElementById("book-form").addEventListener("submit", function(e){
  // Get form values
  const title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById("isbn").value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();
  
  // Validate
  if(title === "" || author === "" || isbn === ""){
    // Error alert
    ui.showAlert("Please fill in all fields.", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Clear fields
    ui.clearFields();

    // Show message
    ui.showAlert("Book added", "success");
  }

  e.preventDefault();
});

// Event listener for delete
document.getElementById("book-list").addEventListener("click", function(e){
  const ui = new UI();

  ui.deleteBook(e.target, ui);

  
  e.preventDefault();
})