/*
  json data lader
*/
const initialData = {
  groups: [
    {
      group_id: 1,
      group_name: "Завдання",
    },
    {
      group_id: 2,
      group_name: "Думки",
    },
    {
      group_id: 3,
      group_name: "Ідеї",
    },
  ],
  notes: [
    {
      created_at: 1650478550507,
      group_id: 1,
      content: "Вивчити JS",
      archived: false,
      updated_at: []
    },
    {
      created_at: 1650478568418,
      group_id: 1,
      content: "Виконати тестове завдання",
      archived: false,
      updated_at: []
    },
    {
      created_at: 1650478578418,
      group_id: 1,
      content: "Годувати кішку",
      archived: false,
      updated_at: []
    },
    {
      created_at: 1650478588418,
      group_id: 2,
      content: "Позитивне мислення",
      archived: false,
      updated_at: []
    },
    {
      created_at: 1650478508418,
      group_id: 2,
      content: "Ти все зможеж",
      archived: false,
      updated_at: []
    },
    {
      created_at: 1650478608418,
      group_id: 1,
      content: "Вивчити JS",
      archived: false,
      updated_at: []
    },
    {
      created_at: 1650478618418,
      group_id: 1,
      content: "Вивчити JS",
      archived: false,
      updated_at: []
    },
    {
      created_at: 1650478628418,
      group_id: 3,
      content: "Вивчити JS",
      archived: false,
      updated_at: []
    },
    {
      created_at: 1650478638418,
      group_id: 1,
      content: "Вивчити JS",
      archived: false,
      updated_at: []
    },
    {
      created_at: 1650478648418,
      group_id: 3,
      content: "Вивчити JS",
      archived: false,
      updated_at: []
    },
  ]
};

function load() {
  let data = JSON.parse(localStorage.getItem('json_data'));
  if (!data) {
    data = initialData;
    localStorage.setItem('json_data', JSON.stringify(data));
  }
  return data;
}
function save(data) {
  localStorage.setItem('json_data', JSON.stringify(data));
}

export default {load, save};
