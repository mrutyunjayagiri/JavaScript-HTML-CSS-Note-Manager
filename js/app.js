// Initializing Empty Array
const noteArray = [];

// Adding New Note
function onAddNote() {
    let id = document.getElementById("addNoteId").value;
    let title = document.getElementById("addNoteTitle").value;
    let description = document.getElementById("addNoteDescription").value;
    let errorContent = document.getElementById("add-note-error");

    // Resetting Fields
    errorContent.innerHTML = "";

    // Check Basic Validation
    if (id === '' || title === '' || description === '') {
        console.log('Filed Can Not Be Blank');
        errorContent.innerHTML = "Filed Can Not Be Blank";
        return;
    }

    // One Way: Note Object Creation => Key: Value
    let noteObject = {
        id: id.trim(),
        title: title.trim(),
        message: description
    }
    // Here Explicitly IDE Doesnt Know This is A Object
    // console.log("Note Object One", noteObject);


    // 2nd Way: Note Object Creation
    let noteObject2 = new Object();
    noteObject2.id = id.trim();
    noteObject2.title = title.trim();
    noteObject2.message = description;

    // console.log("Note Object Two: ", noteObject2);

    // Check NoteId Exist or Not
    let exist = noteArray.some(function (value, index, arra) {
        return value.id == id
    })

    // some() => return true if it satisfy the condition
    // Our case It will retun true if the id is already exist.

    if (exist) {
        errorContent.innerHTML = "The Entered Id " + id + " Exists !";
        return;
    }

    // Adding To The NoteArray
    noteArray.push(noteObject);
    displayAllNotes()

    // Count Total Notes
    getTotalNotes();
    
    onClear();

}

// Display All Notes
function displayAllNotes() {
    let groupNotes = document.getElementById("result");

    // Clear Existing
    groupNotes.innerHTML = "";

    noteArray.forEach(function (value, index, arr) {

        // Add NoteCard Into Group
        groupNotes.innerHTML += noteCard(value, index + 1);

        // Generate Unique NoteId For Each Note
        let noteId = "note" + (index + 1);


        // get Document Of Each Inserted Card By Id
        let result = document.getElementById(noteId);

        // Add Edit Btn
        result.appendChild(createEditBtn(value, index))

        // Add Delete Btn
        result.appendChild(createDeleteBtn(value, index))

       

    })
    getTotalNotes()

    // handle Edit Event Handler
    const edit = document.querySelectorAll('.edit')
    edit.forEach(function(value, index, ar) {
        edit[index].onclick = function () {
            onEditBtnClicked(index);
        }
    })

    // Delete Btn Event Handler
    const del = document.querySelectorAll('.delete')
    del.forEach(function(value, index, ar) {
        del[index].onclick = function () {
            onDeleteBtnClicked(index);
        }
    })

}

// Note Container
function noteCard(value, index) {
    return "<div id='note" + index + "' class='note'><h3>Title: " + value.title + "</h3><p> Message: " + value.message + "</p></div>";
}

// Get Note Counts
function getTotalNotes() {
    let totalNotes = document.getElementById('total-notes');
    totalNotes.innerHTML = "Total Notes: " + noteArray.length
    
}

// Creating Edit Btn Dynamically
function createEditBtn(value, index) {
    const editBtn = document.createElement("button");

    editBtn.value = value.id;
    editBtn.name = "EDIT"
    editBtn.innerHTML = "EDIT";
    editBtn.classList.add('edit');
    editBtn.setAttribute("noteId", value.id);

    return editBtn;
}


// Creating Delete Btn Dynamically
function createDeleteBtn(value, index) {
    const deleteBtn = document.createElement("button");
    deleteBtn.value = value.id;
    deleteBtn.name = "DELETE"
    deleteBtn.innerHTML = "DELETE";
    deleteBtn.classList.add('delete');
    deleteBtn.setAttribute("noteId", value.id);
    return deleteBtn;
}


// On Edit Event Fired
function onEditBtnClicked(index) {
    console.log(index);

    // retrieve Note Object Of That Index
    let noteObject = noteArray[index];
    console.log(noteObject);

    // Get Documents
    let noteHeaderDoc = document.getElementById('note-header');
    let idDoc = document.getElementById('addNoteId');
    let titleDoc = document.getElementById('addNoteTitle');
    let messageDoc = document.getElementById('addNoteDescription');
    let noteBtnDoc = document.getElementById('addNoteBtn');

    // Set Value
    noteHeaderDoc.innerHTML = "<strong>Update note of Id: " + noteObject.id +"</strong>";
    // noteHeaderDoc.style.color = "#7218da"
    idDoc.readOnly = true   // Id Should not change
    idDoc.value = noteObject.id;
    titleDoc.value = noteObject.title;
    messageDoc.value = noteObject.message;

    // On Save
    noteBtnDoc.onclick = function() {
        noteArray[index].title = titleDoc.value;
        noteArray[index].message = messageDoc.value;
        noteHeaderDoc.innerHTML = "Add new note";
        displayAllNotes();
        onClear()

        alert("Note Update Successfully !!!")
    }


    
    
}

// On Delete Button Clicked
function onDeleteBtnClicked(index) {
    console.log(index);

        // remove Item In The Give Index
        noteArray.splice(index, 1);

        //Display
        displayAllNotes();
        alert("Note Deleted Successfully !!!")
}


// Search Implemented
function onSearch() {
    let searchId = document.getElementById('searchId').value.trim();
    let error = document.getElementById('search-error-content');
    let searchResult = document.getElementById('search-result');
    // Reset To Default
    error.innerHTML = "";
    searchResult.innerHTML = "";

    // Check Validation
    if (searchId === '') {
        error.innerHTML = "Field can not be blank";
        return;
    }

    // Find The Item In Array
    let searchNote = noteArray.find(function (value, index, array) {
        return searchId == value.id || searchId == value.title;
    })

    if (!searchNote) {
        error.innerHTML = "No notes found for '" + searchId + "'";
        return;
    }

    // Add To Html 

    searchResult.innerHTML = noteCard(searchNote);


}


// Reset To Default
function onReset() {
noteArray = [];
displayAllNotes()
onClear()
getTotalNotes()

}

// Clear The Fields
function onClear() {
    document.getElementById("addNoteId").value = "";
    document.getElementById("addNoteTitle").value = "";
    document.getElementById("addNoteDescription").value = "";
    document.getElementById("add-note-error").innerHTML = "";

    document.getElementById('searchId').value = "";
    document.getElementById('search-error-content').innerHTML = "";
    document.getElementById('search-result').innerHTML = "";
    // console.log("Cleared");
    
}