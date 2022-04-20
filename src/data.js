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
      created_at: 1,
      group_id: 1,
      content: "Вивчити JS",
      archived: false,
      updated_at: [],
      deleted_at: 0
    },
    {
      created_at: 2,
      group_id: 1,
      content: "Виконати тестове завдання",
      archived: false,
      updated_at: [],
      deleted_at: 0
    },
    {
      created_at: 3,
      group_id: 1,
      content: "Годувати кішку",
      archived: false,
      updated_at: [],
      deleted_at: 0
    },
    {
      created_at: 4,
      group_id: 2,
      content: "Позитивне мислення",
      archived: false,
      updated_at: [],
      deleted_at: 0
    },
    {
      created_at: 5,
      group_id: 2,
      content: "Ти все зможеж",
      archived: false,
      updated_at: [],
      deleted_at: 0
    },
    {
      created_at: 6,
      group_id: 1,
      content: "Вивчити JS",
      archived: false,
      updated_at: [],
      deleted_at: 0
    },
    {
      created_at: 7,
      group_id: 1,
      content: "Вивчити JS",
      archived: false,
      updated_at: [],
      deleted_at: 0
    },
    {
      created_at: 8,
      group_id: 1,
      content: "Вивчити JS",
      archived: false,
      updated_at: [],
      deleted_at: 0
    },
    {
      created_at: 9,
      group_id: 1,
      content: "Вивчити JS",
      archived: false,
      updated_at: [],
      deleted_at: 0
    },
    {
      created_at: 10,
      group_id: 1,
      content: "Вивчити JS",
      archived: false,
      updated_at: [],
      deleted_at: 0
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
