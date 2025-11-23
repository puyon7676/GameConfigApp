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
		const map = {
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

		return [
			{title:"名前", field:"name", editor:"input"},
			{title:"有利グループ", field:"AdvantageousAttr", editor:"list",
				editorParams:{
				  values:values
				},
				formatter:function(cell){
					const value = cell.getValue();
					return map[value] || value;
				}
			},
			{title:"不利グループ", field:"DisadvantageousAttr", editor:"list",
				editorParams:{
				  values:values
				},
				formatter:function(cell){
					const value = cell.getValue();
					return map[value] || value;
				}
			},
			{title:"攻略サイトURL", field:"siteURL", editor:"input"}
		];
	}

var table1 = createEditor("#group-editor1", getGroupColumns(), "data.json");
