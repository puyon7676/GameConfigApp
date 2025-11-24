	// エディタ作成
	function createEditor(selector, columns, dataJson)
	{
		return new Tabulator(selector,
		{
			ajaxURL:dataJson,	// ← JSONファイルを指定
			layout:"fitColumns",
			columns:columns
		});
	}
	// グループエディタ用のカラム定義
	function getGroupColumns()
	{
		return [
			{title:"名前", field:"name", editor:"input"},
			{title:"有利グループ", field:"AdvantageousAttr", editor:"list",
				editorParams:{
				  values:values
				},
				formatter:function(cell){
					const value = cell.getValue();
					return mapA[value] || value;
				}
			},
			{title:"不利グループ", field:"DisadvantageousAttr", editor:"list",
				editorParams:{
				  values:values
				},
				formatter:function(cell){
					const value = cell.getValue();
					return mapD[value] || value;
				}
			},
			{title:"攻略サイトURL", field:"siteURL", editor:"input"}
		];
	}

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

var table = createEditor("#group-editor1", getGroupColumns(), "data.json");

table.on("cellEdited", function(cell){
	if(cell.getField() === "name"){
		let row = cell.getRow();
		let data = row.getData();
		let typeKey = "Type" + String(data.id).padStart(2,"0");

		mapA[typeKey] = data.name;
		values[data.id - 1].label = data.name;

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
