$("#addModalButton").click(function () {
    $('#addCarModal').modal('show');
    $("#newBrand").val('');
    $("#newModel").val('');
    $("#newYear").val('');
})


$(".cancelButton").click(function () {
    $('#addCarModal').modal('hide');
    $('#editCarModal').modal('hide');

})

$("#addCarButton").click(function () {
    let inputBrand = $("#newBrand").val();
    let inputModel = $("#newModel").val();
    let inputYear = $("#newYear").val();
    let numberOfRow = +$(".carTableRow:last-child .number").text() + 1;
    $('#carRows').append("<tr class='carTableRow'><th class='number' scope='row'>" + numberOfRow + "</th><td class='brandName'>" + inputBrand + "</td><td class='modelName'>" + inputModel + "</td><td class='yearNumber'>" + inputYear + "</td><td><i class='fas fa-trash deleteButton'></i><i class='fas fa-edit editButton'></i></td></tr>");
    $('.modal').modal('hide');
})


$(document).on('click', '.editButton', function () {
    $('#editCarModal').modal('show');
    let number = $(this).parent().parent(".carTableRow").children(".number").text();
    $("#editBrand").val($(this).parent().parent(".carTableRow").children(".brandName").text());
    $("#editModel").val($(this).parent().parent(".carTableRow").children(".modelName").text());
    $("#editYear").val($(this).parent().parent(".carTableRow").children(".yearNumber").text());
    let carTableRow = $(this).parent().parent(".carTableRow");


    $(document).on('click', '#editCarButton', function () {
        let editedBrand = $("#editBrand").val();
        let editedModel = $("#editModel").val();
        let editedYear = $("#editYear").val();

        carTableRow.replaceWith("<tr class='carTableRow'><th class='number' scope='row'>" + number + "</th><td class='brandName'>" + editedBrand + "</td><td class='modelName'>" + editedModel + "</td><td class='yearNumber'>" + editedYear + "</td><td><i class='fas fa-trash deleteButton'></i><i class='fas fa-edit editButton'></i></td></tr>")
        $('.modal').modal('hide');

    })
})



$(document).on('click', '.deleteButton', function () {
    $(this).parent().parent().remove();
})



$('.fa-sort').click(function () {
    let table = $(this).parents('table')
    let rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
    this.asc = !this.asc;
    if (!this.asc) { rows = rows.reverse() }
    for (let i = 0; i < rows.length; i++) { table.append(rows[i]) }
})


function comparer(index) {
    return function (a, b) {
        let valA = getTdValue(a, index);
        let valB = getTdValue(b, index);
        if (valA < valB) {
            return -1
        } else if (valA > valB) {
            return 1
        } else if (valA = valB) {
            return 0
        }
    }
}


function getTdValue(row, index) {
    return $(row).children('td').eq(index).text()
}


$('#inputFilter').keyup(function () {
    let valueInput = this;
    $.each($('.modelName'),
        function (i, val) {
            if ($(val).text().indexOf($(valueInput).val()) === -1 && $(val).text().toLowerCase().indexOf($(valueInput).val()) === -1) {
                $('.modelName').parent().eq(i).hide();
            } else {
                $('.modelName').parent().eq(i).show();
            }
        });
});


