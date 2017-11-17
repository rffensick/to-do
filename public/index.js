function GetUsers() {
	$.ajax({
		url: "/api/users",
		type: "GET",
		contentType: "application/json",
		success: function (users) {
			var rows = "";
			$.each(users, function (index, user) {
				// добавляем полученные элементы в таблицу
				rows += row(user);
			});
			$("table tbody").append(rows);
		}
	});
}
// Получение одного пользователя
function GetUser(id) {
	$.ajax({
		url: "/api/users/" + id,
		type: "GET",
		contentType: "application/json",
		success: function (user) {
			var form = document.forms["usersForm"];
			form.elements["name"].value = user.name;
			form.elements["rank"].value = user.rank;
			form.elements["score"].value = user.score;
		}
	});
}
// Добавление пользователя
function CreateUser(userName, userRank, userScore) {
	$.ajax({
		url: "api/users",
		contentType: "application/json",
		method: "POST",
		data: JSON.stringify({
			name: userName,
			rank: userRank,
			score: userScore
		}),
		success: function (user) {
			reset();
			$("table tbody").append(row(user));
		}
	});
}
// Изменение пользователя
function EditUser(userId, userName, userRank, userScore) {
	$.ajax({
		url: "api/users",
		contentType: "application/json",
		method: "PUT",
		data: JSON.stringify({
			id: userId,
			name: userName,
			rank: userRank,
			score: userScore
		}),
		success: function (user) {
			reset();
			console.log(user);
			var tr = $("tr[data-id='" + user._id + "']").replaceWith(row(user));
			$("button").text("+").removeClass("btn-success").attr("data-id", "0");
		}
	});
}

// Удаление пользователя
function DeleteUser(id) {
	$.ajax({
		url: "api/users/" + id,
		contentType: "application/json",
		method: "DELETE",
		success: function (user) {
			console.log(user);
			$("tr[data-id='" + user._id + "']").remove();
		}
	});
}

function reset() {
	var form = document.forms["usersForm"];
	form.reset();
}

var row = function(user) {
	return "<tr class='tr-item' data-id='"+ user._id +"'>" +
		"<td>" + user.name + "</td>" +
		"<td>" + user.rank + "</td>" +
		"<td>" + user.score + "</td>" +
		"<td> <div class='btn btn-group'> <a class='btn btn-danger delete'>Delete</a> <a class='btn btn-warning  edit'>Edit</a> </div> </td></tr>";
};

// отправка формы
$("form").submit(function (e) {
	e.preventDefault();
	var name = this.elements["name"].value;
	var rank = this.elements["rank"].value;
	var score = this.elements["score"].value;
	var editing = $(this).hasClass("editing");
	var id = $("button").attr("data-id");
	if (!editing) {
		CreateUser(name, rank, score);
		console.log("1");
	}	else {
		EditUser(id, name, rank, score);
		console.log("2");
	}
});

// нажимаем на ссылку Изменить
$("body").on("click", ".edit", function () {
	$("button").text("Save").addClass("btn-success");
	var id = $(this).parent().parent().parent().data("id");
	var form = $("form").addClass("editing");
	$("button").attr("data-id", id);
	console.log(id);
	GetUser(id);
});

// нажимаем на ссылку Удалить
$("body").on("click", ".delete", function () {
	var id = $(this).parent().parent().parent().data("id");
	DeleteUser(id);
});

// // загрузка пользователей
GetUsers();