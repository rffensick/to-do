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
function EditUser(userName, userRank, userScore) {
	$.ajax({
		url: "api/users",
		contentType: "application/json",
		method: "PUT",
		data: JSON.stringify({
			name: userName,
			rank: userRank,
			score: userScore
		}),
		success: function (user) {
			reset();
			console.log(user);
			$("tr[data-rowid='" + user._id + "']").replaceWith(row(user));
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
			$("tr[data-rowid='" + user._id + "']").remove();
		}
	});
}
// создание строки для таблицы
// var row = function (user) {
// 	return "<tr data-rowid='" + user._id + "'><td>" + user._id + "</td>" +
// 		"<td>" + user.name + "</td> <td>" + user.age + "</td>" +
// 		"<td><a class='editLink' data-id='" + user._id + "'>Изменить</a> | " +
// 		"<a class='removeLink' data-id='" + user._id + "'>Удалить</a></td></tr>";
// };

var row = function(user) {
	return "<tr class='tr-item' data-id='"+ user._id +"'>" +
		"<td>" + user.name + " <input class='form-control' type='text'> </td>" +
		"<td>" + user.rank + "<input class='form-control' type='text'> </td" +
		"<td>" + user.score + "<input class='form-control' type='text'> </td" +
		"<td> <div class='btn btn-group'> <a class='btn btn- danger delete'>Delete</a> <a class='btn btn- warning  edit'>Edit</a> </div> </td></tr>";
};

// отправка формы
$("form").submit(function (e) {
	e.preventDefault();
	var name = this.elements["name"].value;
	var rank = this.elements["rank"].value;
	var score = this.elements["score"].value;
	if (this.getAttribute("data-id") == 0)
		CreateUser(name, rank, score);
	else
		EditUser(name, rank, score);
});

// нажимаем на ссылку Изменить
$("body").on("click", ".edit", function () {
	var id = $(this).data("id");
	GetUser(id);
});
// нажимаем на ссылку Удалить
$("body").on("click", ".delete", function () {
	var id = $(this).data("id");
	DeleteUser(id);
});

// загрузка пользователей
GetUsers();