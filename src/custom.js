const data = [
  ["Nome Fantasia 1", "99.999.999/0001-99", 15, "12/25/2021", 12020.841],
  ["Nome Fantasia 2", "99.949.999/0001-99", 40, "10/16/2022", 12010.841],
  ["Nome Fantasia 3", "99.959.999/0001-99", 1, "02/26/2024", 2004.841],
  ["Nome Fantasia 4", "99.979.999/0001-99", 1, "01/30/2026", 3200.841],
  ["Nome Fantasia 5", "99.939.999/0001-99", 723, "04/13/2028", 7144000.841],
  ["Nome Fantasia 6", "99.919.999/0001-99", 20, "05/04/2021", 12300.841],
  ["Nome Fantasia 7", "99.929.999/0001-99", 45, "02/14/2022", 22000.841],
];

const validateRowData = (rowData) =>
  rowData.find((el) => el === "") === undefined;

var dataWithDelete = data.map((dataRow) => [
  ...dataRow,
  "<button class='deleteButton' >Deletar</button>",
]);

$(document).ready(function () {
  $("#table").DataTable({
    responsive: true,
    data: dataWithDelete,
    columns: [
      { title: "Nome da empresa" },
      { title: "CNPJ" },
      { title: "Número de funcionários" },
      {
        title: "Data de abertura.",
        render: (data) => new Date(data).toLocaleDateString("pt-BR"),
      },
      {
        title: "Valor da ação",
        render: (data) =>
          data.toLocaleString(undefined, { minimumFractionDigits: 2 }),
      },
      {
        title: "Delete",
      },
    ],
  });

  $("#table").on("click", ".deleteButton", function () {
    var table = $("#table").DataTable();
    table.row($(this).parents("tr")).remove().draw();
  });

  $("#clear").on("click", function () {
    var table = $("#table").DataTable();
    table.clear().draw();
  });

  $("#export").on("click", function () {
    var table = $("#table").DataTable();
    var data = table.rows().data().toArray();
    var jsonData = JSON.stringify(data);
    $.ajax({
      type: "POST",
      url: "https://httpbin.org/post",
      contentType: "application/json; charset=utf-8",
      data: jsonData,
      dataType: "json",
      success: function (response) {
        alert("Enviado com sucesso!");
      },
      failure: function (failure) {
        console.log("Houve uma falha.");
      },
      error: function (error) {
        alert("Houve um erro.");
      },
    });
  });

  $("#addRow").on("click", function () {
    var table = $("#table").DataTable();
    const newRowData = $("form")
      .serializeArray()
      .map((field) => field.value);

    if (validateRowData(newRowData)) {
      table.row
        .add([...newRowData, "<button class='deleteButton' >Deletar</button>"])
        .draw(false);
    } else {
      alert("Informação inválida");
    }
  });
});
