	// エディタ作成
	function createEditor(selector, columns, dataJson)
	{
		return new Tabulator(selector,
		{
//			ajaxURL:dataJson,	// ← JSONファイルを指定
			data:initValues,
			layout:"fitColumns",
			columns:columns
		});
	}
	// グループエディタ用のカラム定義
	function getGroupColumns()
	{
		return [
			{title:"名前", field:"name", editor:"input"},
			{title:"有利グループ", field:"AdvantageousAttr", editor:"list", editable:true,
				editorParams:function(){
					return { values: values };
				},
				formatter:function(cell){
					const value = cell.getValue();
					return mapA[value] || value;
				}
			},
			{title:"不利グループ", field:"DisadvantageousAttr", editor:"list",
				editorParams:function(){
					return { values: values };
				},
				formatter:function(cell){
					const value = cell.getValue();
					return mapD[value] || value;
				}
			},
			{title:"攻略サイトURL", field:"siteURL", editor:"input"}
		];
	}
	function resetSelectionLists(rows)
	{
		values = {};
		mapA = {};
		mapD = {};
		rows.forEach(row => {
			let typeKey = "Type" + String(row.id).padStart(2,"0");
			values[typeKey] = row.name;
			mapA[typeKey] = row.name;
			mapD[typeKey] = row.name;
		});
	}

jSuites.toolbar(document.getElementById('toolbar'), {
  items: [
    {
      type: 'button',
      content: '<i class="material-icons">add</i>',
      title: "新規作成",
      onclick: () => alert('新規作成')
    },
    {
      type: 'button',
      content: '<i class="material-icons">save</i>',
      title: "保存",
      onclick: () => alert('保存')
    },
    {
      type: 'button',
      content: '<i class="material-icons">folder_open</i>',
      title: "読み込み",
      onclick: () => alert('読み込み')
    },
    { type: 'divisor' },
    {
      type: 'button',
      content: '<i class="material-icons">settings</i>',
      title: "設定",
      onclick: () => alert('設定')
    }
  ]
});

initValues = [
  {"id":1, "name":"グループ01", "AdvantageousAttr":"Type01", "DisadvantageousAttr":"Type01"},
  {"id":2, "name":"グループ02", "AdvantageousAttr":"Type01", "DisadvantageousAttr":"Type01"},
  {"id":3, "name":"グループ03", "AdvantageousAttr":"Type01", "DisadvantageousAttr":"Type01"},
  {"id":4, "name":"グループ04", "AdvantageousAttr":"Type01", "DisadvantageousAttr":"Type01"},
  {"id":5, "name":"グループ05", "AdvantageousAttr":"Type01", "DisadvantageousAttr":"Type01"},
  {"id":6, "name":"グループ06", "AdvantageousAttr":"Type01", "DisadvantageousAttr":"Type01"}
]

let values = {};
let mapA = {};
let mapD = {};
resetSelectionLists(initValues);

var table = createEditor("#group-editor1", getGroupColumns(), "data.json");

table.on("cellEdited", function(cell){
	if(cell.getField() === "name"){
		let row = cell.getRow();
		let data = row.getData();
		let typeKey = "Type" + String(data.id).padStart(2,"0");

		//values[data.id - 1].label = data.name;
		values[typeKey] = data.name;
		mapA[typeKey] = data.name;
		mapD[typeKey] = data.name;

		// 内部値を更新したい場合
		row.update({group:typeKey});

		// 全行を取得
		let rows = table.getRows();
		// 1行ずつ再描画
		rows.forEach(row => {
			row.reformat();
		});
	}
});

//ファイルロード
document.getElementById('fileInput').addEventListener('change', async (event) => {
	const file = event.target.files[0];
	if (!file) return;

	const text = await file.text(); // FileReaderの代わりにPromise対応のtext()
	const data = JSON.parse(text);

	console.log('読み込んだJSON:', data);

	resetSelectionLists(data);

	table.setData(data);
});




/*
		values = [
			{label:"グループ01", value:"Type01"},
			{label:"グループ02", value:"Type02"},
			{label:"グループ03", value:"Type03"},
			{label:"グループ04", value:"Type04"},
			{label:"グループ05", value:"Type05"},
			{label:"グループ06", value:"Type06"},
			{label:"グループ07", value:"Type07"},
			{label:"グループ08", value:"Type08"},
			{label:"グループ09", value:"Type09"},
			{label:"グループ10", value:"Type10"},
		];
*/
/*
	values = {
		"Type01":"グループ01",
		"Type02":"グループ02",
		"Type03":"グループ03",
		"Type04":"グループ04",
		"Type05":"グループ05",
		"Type06":"グループ06",
		"Type07":"グループ07",
		"Type08":"グループ08",
		"Type09":"グループ09",
		"Type10":"グループ10"
	};
	const mapA = {
		"Type01":"グループ01",
		"Type02":"グループ02",
		"Type03":"グループ03",
		"Type04":"グループ04",
		"Type05":"グループ05",
		"Type06":"グループ06",
		"Type07":"グループ07",
		"Type08":"グループ08",
		"Type09":"グループ09",
		"Type10":"グループ10",
	};
	const mapD = {
		"Type01":"グループ01",
		"Type02":"グループ02",
		"Type03":"グループ03",
		"Type04":"グループ04",
		"Type05":"グループ05",
		"Type06":"グループ06",
		"Type07":"グループ07",
		"Type08":"グループ08",
		"Type09":"グループ09",
		"Type10":"グループ10",
	};
*/
/*
	values = new Map();
	initValues.forEach(row => {
		let typeKey = "Type" + String(row.id).padStart(2,"0");
		values.set(typeKey, row.name);
	});
*/
