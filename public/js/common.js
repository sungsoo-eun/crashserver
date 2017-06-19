
// Event 객체
function Event() {
	return JSON.stringify({
		"eventid":$("#eventid").val(),
		"mobileOS":$("#mobileOS").val(),
		"phone":$("#phone").val()
	});
}

// 신규 사용자 추가
function addEvent () {
	// http://api.jquery.com/jQuery.ajax/ 참고
	jQuery.ajax({
		type: "POST",
		url: "/addEvent/"+$("#eventid").val(),
		data: Event(),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (data, status, jqXHR) {
			// do something
			getEvents ();
		},
		error: function (jqXHR, status) {            
			// error handler
		}

	});
}

// 사용자 정보 변경
function updateEvent () {
	jQuery.ajax({
		type: "PUT",
		url: "/mergeEvent/"+$("#eventid").val(),
		data: Event(),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (data, status, jqXHR) {
			// do something
			if(data.success) {
				alert('수정 성공['+data.message+']');
				getEvents ();
			} else {
				alert(data.error);
			}
		},
		error: function (jqXHR, status) {
			// error handler
		}     
	});     
}

// 사용자 삭제
function deleteEvent (eventId) {
	jQuery.ajax({
		type: "DELETE",
		url: "/deleteEvent/"+eventid,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		data: "eventid="+eventId,
		dataType: "json",
		success: function (data, status, jqXHR) {
			// do something
			alert('삭제 성공!!');
			getEvents ();
		},
		error: function (jqXHR, status) {
			// error handler
		}
	});
}

// 사용자 정보 조회
function getEvent (eventId) {
	jQuery.ajax({
		type: "GET",
		url: "/getEvent/"+eventid,
		contentType: "application/json; charset=utf-8",
		data: "eventid="+eventId,
		dataType: "json",
		success: function (data, status, jqXHR) {
			//alert(["mobileOS"]);
			//alert(status+"/"+jqXHR.status+"/"+jqXHR.statusText);
			$("#eventid").val(data["eventid"]);
			$("#mobileOS").val(data["mobileOS"]);
			$("#phone").val(data["phone"]);
		},
		error: function (jqXHR, status) {
			// error handler
		}
	});
}

// 전체 사용자 정보 조회
function getEvents () {
	jQuery.ajax({
		type: "GET",
		url: "/list",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (data, status, jqXHR) {
			$("div#myOutput").html(" ");
			returnData = "<table style='font-size:10pt;'><tr><th>전체 목록</th></tr>";
			returnData += "<tr><td>ID</td><td>이름</td><td>전화번호</td><td>기능</td></tr>";
			for (var i = 0; i < data.length; i++) {
				returnData += "<tr><td><a href='#' onClick='getEvent("+data[i]["eventid"]+")' >" 
						   + data[i]["eventid"] + "</a></td><td>"
						   + data[i]["mobileOS"] + "</td><td align='right'>"
						   + data[i]["phone"] + "</td><td>"
						   + "<input type='button' value='삭제' onClick='deleteEvent("+ data[i]["eventid"] +")' />"
						   + "</td></tr>";
			}

			returnData = returnData + "</table>";
			$("div#myOutput").html(returnData);
		},
		error: function (jqXHR, status) {
		 // error handler
		}
	});
}