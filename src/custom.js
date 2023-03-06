const data = [
  ["Nome Fantasia 1", "99.999.999/0001-99", 15, "12/25/2021", 12020.841],
  ["Nome Fantasia 2", "99.949.999/0001-99", 40, "10/16/2022", 12010.841],
  ["Nome Fantasia 3", "99.959.999/0001-99", 1, "02/26/2024", 2004.841],
  ["Nome Fantasia 4", "99.979.999/0001-99", 1, "01/30/2026", 3200.841],
  ["Nome Fantasia 5", "99.939.999/0001-99", 723, "04/13/2028", 7144000.841],
  ["Nome Fantasia 6", "99.919.999/0001-99", 20, "05/04/2021", 12300.841],
  ["Nome Fantasia 7", "99.929.999/0001-99", 45, "02/14/2022", 22000.841],
];

$(document).ready(function () {
  $("#table").DataTable({
    data: data,
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
    ],
  });
});
