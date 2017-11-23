if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    $.getJSON( "Database.JSON", function( data ) {
        console.log(data);
    });

} else {
    alert('The File APIs are not fully supported in this browser.');
}